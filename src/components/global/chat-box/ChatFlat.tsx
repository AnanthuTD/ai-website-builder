import { Button } from "@/components/ui/button";
import AvatarPlaceHolder from "../avatar-placeholder";
import { IChatFlat } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { WandSparklesIcon } from "lucide-react";
import { generateHtmlCss } from "@/services/generateHtmlCss";

const ChatFlat = ({
	chat,
	own = false,
}: {
	chat: IChatFlat;
	own?: boolean;
}) => {
	const handleGenerateCode = async (prompt: string) => {
		if (!prompt || !prompt.trim()) return;

		console.log(prompt);

		const response = await generateHtmlCss(prompt);
		console.log(response);
	};

	return (
		<div className="flex gap-2 w-full">
			<div className={`p-1 rounded-lg w-full`}>
				<div className="flex flex-col gap-1">
					<p
						className={`text-xs flex gap-2 items-center text-orange-800 ${
							own ? "place-self-end flex-row-reverse" : ""
						}`}
					>
						<AvatarPlaceHolder value={chat.userId[0]} width={30} />
						{chat.userId}
					</p>

					<div
						className={`flex ${
							own ? "flex-row-reverse" : ""
						} items-center gap-4 w-full`}
					>
						<div className="w-full">
							<div className={`${own ? "place-self-end" : ""}`}>
								{chat.userId === "ai" ? (
									// ai
									<div className="p-1 rounded-md outline-1 prose prose-sm max-w-full">
										<ReactMarkdown remarkPlugins={[remarkGfm]}>
											{chat.message as string}
										</ReactMarkdown>
										<Button onClick={() => handleGenerateCode(chat.message)}>
											<WandSparklesIcon color="#b10abd" />
											Refine
										</Button>
									</div>
								) : (
									// user
									<div className="p-2 rounded-md outline-1">{chat.message}</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatFlat;
