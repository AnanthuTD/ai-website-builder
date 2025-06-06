import { Colors } from "@/components/global/ai-modal";
import { HfInference } from "@huggingface/inference";

interface GenerateHtmlCssResponse {
    html: string;
    css: string;
}

export async function generateHtmlCssWithHuggingFace(
    prompt: string,
    content?: {
        html: string;
        css: string;
    },
    language: string = "English",
    colors: Colors = {
        primary: "",
        secondary: "",
        background: "",
        text: "",
        neutral: "",
        accent: "",
    }
): Promise<GenerateHtmlCssResponse | null> {
    if (!prompt?.trim()) {
        console.error("🔴 Prompt is empty");
        return null;
    }

    const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_TOKEN);

    try {
        const hasExistingContent = content?.html;

        const existingContent = hasExistingContent
            ? `**Existing Code:**\nHTML:\n${content.html}\nCSS:\n${content.css}`
            : "No existing content - generate from scratch";

        const systemInstruction = `
You are a web developer tasked with creating or modifying a webpage based on a detailed design specification provided in the prompt. The prompt contains specific requirements for the structure, style, and functionality of the page.

**Input:**
${existingContent}

**Design Specification:**
${prompt}

**Your Task:**
${
    hasExistingContent
        ? "Modify the existing HTML and CSS to fully incorporate the requirements specified in the design specification. Preserve the existing structure and style where not explicitly changed."
        : "Generate a new webpage from scratch that accurately implements every aspect of the design specification."
}

**Requirements:**
1. Implement all details provided in the specification (e.g., backgrounds, fonts, layouts).
2. Use semantic HTML5 and modern CSS.
3. Ensure the webpage is responsive and accessible.
4. Fill in any gaps with appropriate design choices that complement the specification.
5. Output ONLY valid JSON with \`html\` and \`css\` keys.

**Guidelines:**
- Language: All text content should be in ${language}.
- Colors: Use specified colors if provided; otherwise, choose complementary colors:
  - Primary: ${colors?.primary || "choose"}
  - Secondary: ${colors?.secondary || "choose"}
  - Background: ${colors?.background || "choose"}
  - Text: ${colors?.text || "choose"}
  - Neutral: ${colors?.neutral || "choose"}
  - Accent: ${colors?.accent || "choose"}
- Use Poppins font (Google Fonts) unless otherwise specified.
- Include minimal transitions unless animations are specified.
- Keep code clean and concise.

**Output:**
{"html": "...", "css": "..."}
**Note:** Return only the raw JSON, no extra text.
`;

        const response = await hf.chatCompletion({
            provider: "sambanova",
            model: "deepseek-ai/DeepSeek-V3-0324",
            messages: [
                {
                    role: "user",
                    content: systemInstruction,
                },
            ],
        });

        const responseText = response.choices[0]?.message?.content;

        console.log("Raw response:", responseText);

        if (!responseText) {
            console.error("🔴 Empty API response");
            return null;
        }

        const cleanResponse = responseText
            .replace(/^.*?(?={)/, "")
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/\s+/g, " ")
            .trim();

        console.log("Cleaned response:", cleanResponse);

        try {
            const jsonResult: GenerateHtmlCssResponse = JSON.parse(cleanResponse);

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