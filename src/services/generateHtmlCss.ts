import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash-latest",
	generationConfig: {
		responseMimeType: "application/json",
	},
});

interface GenerateHtmlCssResponse {
	html: string;
	css: string;
}

export async function generateHtmlCss(
	refinedPrompt: string
): Promise<GenerateHtmlCssResponse | null> {
	if (!refinedPrompt || refinedPrompt.trim() === "") {
		console.error("🔴 Refined prompt is empty.");
		return null;
	}

	if (!genAI || !model) {
		console.error("🔴 Gemini client not initialized properly (check API key).");
		return null;
	}

	try {
		const systemInstruction = `
      You are an expert web developer assistant specializing in generating initial HTML and CSS for web editors like GrapesJS.

      **Task:** Convert the provided structured webpage description into a basic HTML structure and corresponding CSS stylesheet.

      **Input:** A structured description of a webpage, broken down into components (like Header, Navigation, Hero Section, Main Content Sections, Footer).

      **Output Requirements:**
      1.  **Format:** Generate ONLY a valid JSON object. Do NOT include any text outside the JSON structure (like "Here is the JSON:" or markdown backticks).
      2.  **JSON Structure:** The JSON object must have exactly two keys:
          *   \`html\`: A string containing the complete HTML structure for the page.
          *   \`css\`: A string containing CSS rules to style the HTML.
      3.  **HTML Content:**
          *   Use semantic HTML tags (\`header\`, \`nav\`, \`main\`, \`section\`, \`footer\`, \`h1-h6\`, \`p\`, \`ul\`, \`li\`, \`a\`, \`button\`, \`img\`).
          *   Create distinct HTML elements/sections corresponding to the components mentioned in the input description (Header, Hero, Footer, etc.).
          *   Use placeholder text (e.g., "[Company Name]", "[Hero Headline Here]", "[Paragraph about service]", "[Button Text]") for actual content. Do NOT invent specific wording unless it's standard like "Home", "About", "Contact".
          *   Use placeholder image sources (e.g., \`<img src="https://via.placeholder.com/150" alt="[Placeholder Image Description]">)\`).
          *   Assign meaningful CSS classes to elements (e.g., \`class="page-header"\`, \`class="hero-section"\`, \`class="nav-link"\`, \`class="cta-button"\`) for styling.
      4.  **CSS Content:**
          *   Provide basic CSS for layout (e.g., using Flexbox or Grid for major sections like header, footer, content columns), spacing (margin, padding), and minimal visual styling (e.g., basic link appearance, button style).
          *   The CSS rules must target the classes defined in the HTML.
          *   Keep the CSS relatively simple and clean, suitable as a starting point for GrapesJS. Avoid overly complex animations or vendor prefixes unless necessary for basic layout.

      **Input Webpage Description:**
      ---
      ${refinedPrompt}
      ---

      Generate the JSON output now based on these instructions and the provided description.`;

		const result = await model.generateContent(systemInstruction);

		if (!result || !result.response || !result.response.text()) {
			console.error("🔴 Unexpected API response:", result);
			return null;
		}

		const response = result.response;
		const responseText = response.text();

		console.log("--- Gemini Raw Response Text ---");
		console.log(responseText);
		console.log("--------------------------------");

		if (!responseText) {
			console.error("🔴 Gemini response text is empty.");
			if (response?.promptFeedback?.blockReason) {
				console.error("Prompt was blocked by Gemini safety filters.");
				console.error("Reason:", response.promptFeedback.blockReason);
				return null;
			}
			return null;
		}

		try {
			const cleanResponse = responseText
				.replace(/(\s*\\n\s*)/g, "")
				.replace(/(\n)/g, "")
				.replace("```json", "")
				.replace("```", "");
			console.info("cleaned up: ", cleanResponse);
			const jsonResult: GenerateHtmlCssResponse = JSON.parse(cleanResponse);
			return jsonResult;
		} catch (cleanUpError) {
			console.error("🔴 Could not cleanup response", cleanUpError);
			return null;
		}
	} catch (error) {
		console.error("🔴 Error generating refined prompt:", error);
		return null;
	}
}
