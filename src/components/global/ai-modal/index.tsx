import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusSquareIcon, WandSparklesIcon } from "lucide-react";
import { TemplateSelector } from "../template-selector";
import { useState } from "react";
import { AiPromptInputArea } from "../prompt-text-box";
import { LanguageSelector } from "../language-selector";
import { generateRefinePrompt } from "@/services/generateRefinePrompt";

interface AiModalProps {
	onSubmitPrompt: (prompt: string) => void;
}
const AiModal = ({ onSubmitPrompt }: AiModalProps) => {
	const [selectedTemplate, setSelectedTemplate] = useState("");
	const [userPrompt, setUserPrompt] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [open, setOpen] = useState(false);

	const handleSelectedTemplate = (template: string) => {
		setSelectedTemplate(template);
		console.log(template);
	};

	const updateUserPrompt = (message: string) => {
		setUserPrompt(message);
	};

	const handleGenerate = async () => {
		if (!userPrompt) {
			return;
		}

		// const refinedPrompt = await generateRefinePrompt(userPrompt);

		// console.log("refined prompt: ", refinedPrompt);

		if (userPrompt.trim()) {
			onSubmitPrompt(userPrompt.trim());
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className={""} asChild>
				<Button variant={"default"}>
					New Page
					<PlusSquareIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Describe what you want the page to look like.
					</DialogTitle>
					<DialogDescription>
						Don't worry about the grammar. Ai will refine it an ask you for
						modification later.
					</DialogDescription>
				</DialogHeader>
				<TemplateSelector onSelect={handleSelectedTemplate} />
				<AiPromptInputArea prompt={userPrompt} setPrompt={updateUserPrompt} />
				<LanguageSelector onSelect={setSelectedLanguage} />
				{/* 	<Button onClick={handleGenerate}>
					<WandSparklesIcon color="#b10abd" />
					Refine
				</Button> */}

				<Button onClick={handleGenerate}>Submit</Button>
			</DialogContent>
		</Dialog>
	);
};

export default AiModal;
