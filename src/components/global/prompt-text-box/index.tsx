import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
	prompt: string;
	setPrompt: (prompt: string) => void;
}

export function AiPromptInputArea({ prompt, setPrompt }: Props) {
	return (
		<div className="grid w-full gap-1.5">
			<Label htmlFor="prompt">Your prompt</Label>
			<Textarea
				placeholder="Type your prompt here."
				id="prompt"
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			/>
		</div>
	);
}
