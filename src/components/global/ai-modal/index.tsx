import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusSquareIcon } from "lucide-react";
import { TemplateSelector } from "../template-selector";
import { useState } from "react";
import { AiPromptInputArea } from "../prompt-text-box";
import { LanguageSelector } from "../language-selector";
import ColorSelector from "../color-selector";

export interface Colors {
	primary: string;
	secondary: string;
	background: string;
	text: string;
	neutral: string;
	accent: string;
}

interface AiModalProps {
	onSubmit: (data: {
		prompt: string;
		language: string;
		template: string;
		colors: Colors;
	}) => void;
}

const AiModal = ({ onSubmit }: AiModalProps) => {
	const [selectedTemplate, setSelectedTemplate] = useState("");
	const [userPrompt, setUserPrompt] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [open, setOpen] = useState(false);
	const [colors, setColors] = useState<Colors>({
		accent: "",
		background: "",
		neutral: "",
		primary: "",
		secondary: "",
		text: "",
	});

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

		if (userPrompt.trim()) {
			onSubmit({
				prompt: userPrompt.trim(),
				colors,
				language: selectedLanguage,
				template: selectedTemplate,
			});
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
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

				{/* template selector */}
				<TemplateSelector onSelect={handleSelectedTemplate} />

				{/* user prompt area */}
				<AiPromptInputArea prompt={userPrompt} setPrompt={updateUserPrompt} />

				{/* language selector */}
				<LanguageSelector onSelect={setSelectedLanguage} />

				{/* color selector */}
				<ColorSelector onSelect={setColors} />

				<Button onClick={handleGenerate}>Submit</Button>
			</DialogContent>
		</Dialog>
	);
};

export default AiModal;
