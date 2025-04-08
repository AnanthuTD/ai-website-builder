import { Button } from "@/components/ui/button";
import AvatarPlaceHolder from "../avatar-placeholder";
import { IChatFlat } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, WandSparklesIcon } from "lucide-react";

const ChatFlat = ({
	chat,
	own = false,
	onGenerateCode = () => {},
	isGenerating,
}: {
	chat: IChatFlat;
	own?: boolean;
	onGenerateCode: (prompt: string) => void;
	isGenerating: boolean;
}) => {
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
										{chat.refinedPrompt && <Button
											onClick={() => onGenerateCode(chat.message)}
											disabled={isGenerating}
										>
											<WandSparklesIcon color="#b10abd" />
											Generate
											{isGenerating && <Loader2 className="animate-spin" />}
										</Button>}
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
