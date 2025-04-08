import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
	role: string;
	content: string;
}

interface WebContent {
	html: string;
	css: string;
}

export async function generateRefinePrompt(
	userPrompt: string,
	chatHistory: ChatMessage[] = [],
	content?: WebContent
): Promise<string | null> {
	if (!userPrompt?.trim()) {
		console.error("🔴 Prompt is empty");
		return null;
	}

	try {
		const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
		const model = genAI.getGenerativeModel({
			model: "gemini-1.5-flash-latest",
		});

		// Format chat history for context
		const historyContext =
			chatHistory.length > 0
				? `**Conversation Context:**\n${chatHistory
						.map(
							(msg) =>
								`${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
						)
						.join("\n")}\n\n`
				: "";

		// Format existing content for analysis
		const existingContent = content?.html
			? `**Existing HTML/CSS Content:**\n\n` +
			  `HTML Structure:\n${content.html.substring(0, 1000)}${
					content.html.length > 1000 ? "... [truncated]" : ""
			  }\n\n` +
			  `CSS Styles:\n${content.css.substring(0, 500)}${
					content.css.length > 500 ? "... [truncated]" : ""
			  }\n\n` +
			  `Note: Analyze but DO NOT repeat the existing code in your response. Focus on improvements and refinements.`
			: "No existing content provided";

		const systemInstruction = `
You are an expert web design assistant helping to refine and improve webpage designs. 
Consider both the conversation context and any existing content below.

${historyContext}

${existingContent}

**Current User Request:**
---
${userPrompt}
---

**Your Task:**
1. Analyze the existing content (if provided)
2. Refine the webpage description based on the user's request
3. Provide specific, actionable suggestions for improvement

**Focus Areas:**
1. **Overall Goal/Purpose** - Does the current implementation match the intended purpose?
2. **Structure Analysis** - Is the HTML structure logical and semantic?
3. **Style Evaluation** - Does the CSS properly support the design goals?
4. **Improvement Suggestions** - Specific recommendations for each section

**Output Format:**

Current Implementation Analysis:
[Brief evaluation of existing content]

Suggested Refinements:

Overall Goal/Purpose:
[Concise statement of refined purpose]

Header:
[Current evaluation] → [Suggested improvements]

Navigation:
[Current evaluation] → [Suggested refinements]

Hero Section:
[Current evaluation] → [Suggested enhancements]

Main Content Sections:
- [Section 1]: [Current state] → [Recommended changes]
- [Section 2]: [Current state] → [Recommended changes]
...

Call-to-Action:
[Current CTAs evaluation] → [Optimization suggestions]

Footer:
[Current evaluation] → [Improvement ideas]

Additional Recommendations:
[Any other suggestions for accessibility, performance, or maintainability]

**Guidelines:**
- Be specific and actionable
- Reference but don't repeat existing code
- Prioritize suggestions based on impact
- Consider mobile responsiveness
- Note any accessibility concerns
- Still NO code generation - focus on conceptual improvements`;

		const generationConfig = {
			temperature: 0.5, // More focused responses when analyzing existing code
			topP: 0.85,
			maxOutputTokens: 2500,
		};

		const result = await model.generateContent({
			contents: [
				{
					role: "user",
					parts: [{ text: systemInstruction }],
				},
			],
			generationConfig,
		});

		const response = result.response;
		if (!response?.text()) {
			console.error("🔴 Empty API response");
			return null;
		}

		return response.text();
	} catch (error) {
		console.error("🔴 API Error:", error);
		throw error;
	}
}
