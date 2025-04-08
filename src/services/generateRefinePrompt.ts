import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateRefinePrompt(
	userPrompt: string
): Promise<string | null> {
	if (!userPrompt || userPrompt.trim() === "") {
		console.error("🔴 Prompt is empty.");
		return null;
	}

	try {
		const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
		const model = genAI.getGenerativeModel({
			model: "gemini-1.5-flash-latest",
		});

		const systemInstruction = `You are an expert web design assistant. Your task is to analyze the user's description of a webpage and refine it into a clear, structured format broken down into standard webpage components.

    **Input:** A user's raw description of a webpage.

    **Output Goal:** A refined description structured by the following components:
    1.  **Overall Goal/Purpose:** Briefly state the main objective of the webpage.
    2.  **Header:** Describe content and elements (e.g., logo, main navigation links, call-to-action button).
    3.  **Navigation:** List the primary navigation links identified or implied. If none mentioned, suggest standard ones based on the context or state none were specified.
    4.  **Hero Section:** Describe the main banner/top section (e.g., headline, sub-headline, background image/video, primary call-to-action). If not explicitly mentioned, infer based on the overall goal or state it needs definition.
    5.  **Main Content Sections:** Break down the core content into logical sections. Describe the purpose and key elements of each section (e.g., "About Us Section", "Services Section", "Testimonials", "Features"). Use information *only* from the user's prompt.
    6.  **Call(s) to Action (CTA):** Identify any specific CTAs mentioned throughout the prompt, besides the potential main one in the Hero section.
    7.  **Footer:** Describe expected footer content (e.g., copyright, secondary links, contact info, social media icons). If none mentioned, suggest standard elements or state none were specified.

    **Instructions:**
    *   Analyze the user's prompt carefully.
    *   Extract relevant information for each component listed above.
    *   Use the exact component names (Header, Navigation, etc.) as headings in your output.
    *   Be concise and clear for each component's description.
    *   If the user's prompt lacks detail for a specific component, state that it needs further definition or make reasonable assumptions based *only* on the provided text and the overall goal. Do *not* invent completely new features.
    *   Focus on *what* should be on the page, not *how* it looks visually (no specific colors, fonts unless mentioned by user).
    *   Do **NOT** generate HTML, CSS, or any code.
    *   The final output should be easily readable for the user to review and correct.

    **User's Webpage Description:**
    ---
    ${userPrompt}
    ---

    Now, provide the structured refinement based on the user's description.`;

		const result = await model.generateContent(systemInstruction);

		if (!result || !result.response || !result.response.text()) {
			console.error("🔴 Unexpected API response:", result);
			return null;
		}

		const responseText = result.response.text();
		return responseText;
	} catch (error) {
		console.error("🔴 Error generating refined prompt:", error);
		return null;
	}
}
