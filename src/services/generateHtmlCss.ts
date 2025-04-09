import { Colors } from "@/components/global/ai-modal";
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
	prompt: string,
	content?: {
		html: string;
		css: string;
	},
	language: string = "English", // Default language
	colors: Colors = {
		primary: "#6B4E31", // Coffee brown
		secondary: "#D4A373", // Light coffee
		background: "#F5F1ED", // Cream
		text: "#3C2F2F", // Dark coffee
		neutral: "#EDE4E0", // Light neutral
		accent: "#A67B5B", // Medium coffee accent
	}
): Promise<GenerateHtmlCssResponse | null> {
	if (!prompt?.trim()) {
		console.error("🔴 Prompt is empty");
		return null;
	}

	try {
		const hasExistingContent = content?.html;

		const existingContent = hasExistingContent
			? `**Existing Code:**\nHTML:\n${content.html}\nCSS:\n${content.css}`
			: "No existing content - generate from scratch";

		const systemInstruction = `
You are a web developer creating a small, beautiful webpage. ${
			hasExistingContent
				? "Modify the existing code minimally per the prompt. Return the full modified HTML and CSS."
				: "Generate a small, elegant webpage for: " + prompt
		}

**Requirements:**
1. ${
			hasExistingContent
				? "Modify per: " + prompt + ". Keep unchanged parts intact."
				: "Create per: " + prompt
		}
2. Output ONLY valid JSON with \`html\` and \`css\` keys
3. Use semantic HTML5 and modern CSS
4. Keep it small: header, hero, one content section, footer with newsletter
5. Ensure mobile responsiveness
6. Design: simple, elegant, beautiful, no complex animations

**Guidelines:**
- Use Poppins font (Google Fonts)
- Language: All text content should be in ${language}
- Colors (use these, falling back to defaults if empty):
  - Primary: ${colors.primary || "#6B4E31"} (e.g., buttons, headers)
  - Secondary: ${
		colors.secondary || "#D4A373"
	} (e.g., highlights, secondary buttons)
  - Background: ${colors.background || "#F5F1ED"} (e.g., page background)
  - Text: ${colors.text || "#3C2F2F"} (e.g., body text)
  - Neutral: ${colors.neutral || "#EDE4E0"} (e.g., borders, subtle backgrounds)
  - Accent: ${colors.accent || "#A67B5B"} (e.g., small highlights)
- Minimal transitions
- Keep code concise

**Input:**
${existingContent}

**Output:**
{"html": "...", "css": "..."}
**Note:** Return only the raw JSON, no extra text.
`;

		const result = await model.generateContent(systemInstruction);
		const response = result.response;

		if (!response?.text()) {
			console.error("🔴 Empty API response");
			return null;
		}

		const responseText = response.text();

		// Improved JSON cleaning
		const cleanResponse = responseText
			.replace(/```json/g, "")
			.replace(/```/g, "")
			.replace(/\s+/g, " ")
			.trim();

		try {
			const jsonResult: GenerateHtmlCssResponse = JSON.parse(cleanResponse);

			// Basic validation
			if (!jsonResult.html || !jsonResult.css) {
				throw new Error("Missing html/css in response");
			}

			return {
				html: jsonResult.html,
				css: jsonResult.css,
			};
		} catch (parseError) {
			console.error("🔴 JSON Parse Error:", parseError);
			console.error("Original Response:", responseText);
			return null;
		}
	} catch (error) {
		console.error("🔴 API Error:", error);
		return null;
	}
}
