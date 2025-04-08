import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
	model: "gemini-1.5-pro-latest",
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
	}
): Promise<GenerateHtmlCssResponse | null> {
	if (!prompt?.trim()) {
		console.error("🔴 Prompt is empty");
		return null;
	}

	try {
		const hasExistingContent = content?.html;

		const existingContent = hasExistingContent
			? `**Existing Code to Modify:**\n\n` +
			  `HTML (truncated):\n${content.html.substring(0, 1000)}${
					content.html.length > 1000 ? "..." : ""
			  }\n\n` +
			  `CSS (truncated):\n${content.css.substring(0, 500)}${
					content.css.length > 500 ? "..." : ""
			  }\n\n` +
			  `Modification Guidelines:\n` +
			  `- Preserve existing class names and structure where possible\n` +
			  `- Make minimal changes to achieve the requested modifications\n` +
			  `- Maintain consistency with existing styles\n`
			: "No existing content - generate from scratch";

		const systemInstruction = `
You are an expert web developer assistant. ${
			hasExistingContent
				? "Modify the existing code according to the request while preserving its structure."
				: `Generate cutting-edge, visually impressive HTML/CSS that rivals top modern websites of similar kind.`
		}

**Task Requirements:**
1. ${
			hasExistingContent ? "Modify existing code" : "Create new code"
		} according to: ${prompt}
2. Output ONLY valid JSON with \`html\` and \`css\` keys
3. Use semantic HTML5 and modern CSS
4. ${
			hasExistingContent
				? "Keep existing class names where appropriate"
				: "Add meaningful class names"
		}
5. Include placeholder content where needed
6. Ensure mobile responsiveness

${
	hasExistingContent
		? "**Modification Strategy:**\n- Identify relevant sections to modify\n- Make targeted changes\n- Preserve unrelated code"
		: "**New Code Guidelines:**\n- Logical section structure\n- Clear class naming\n- Basic responsive layout"
}

**Design Requirements:**
1. ${
			hasExistingContent ? "Modify existing code" : "Create new code"
		} according to: ${prompt}
2. When creating from scratch, include these modern features:
   - Hero section with gradient/animated background
   - Interactive hover effects and smooth transitions
   - Modern card-based layouts
   - Clean typography with Google Fonts
   - Responsive hamburger menu for mobile
   - Social proof section (testimonials/client logos)
   - Call-to-action animations
   - Subtle shadows and depth effects
3. Use these trending elements where appropriate:
   - Glassmorphism effects
   - Gradient accents
   - Micro-interactions
   - Responsive image grids
   - Floating animations
   - Neumorphic buttons
4. Output ONLY valid JSON with \`html\` and \`css\` keys
5. Include Font Awesome icons where appropriate
6. Use CSS variables for colors
7. Add subtle animations using CSS keyframes

**Examples of Modern Components:**
${
	hasExistingContent
		? ""
		: `- Sticky navigation with logo and animated underline effects
- Full-screen hero with parallax background
- Feature cards with 3D hover effects
- Testimonial carousel with fade animations
- Gradient accent borders
- Contact form with floating labels
- Social media hover effects`
}

**Color Palette (when creating new):**
- Primary: Modern blues/purples/gradients
- Secondary: Clean whites/light grays
- Accent: Vibrant but professional colors

**Input Details:**
${existingContent}

**Required JSON Output Format:**
{
  "html": "...",
  "css": "..."
}`;

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
