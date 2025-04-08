"use client";

import React, { useState, useRef, useEffect } from "react";
import { IChatFlat } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import ChatFlat from "../chat-box/ChatFlat";
import { generateRefinePrompt } from "@/services/generateRefinePrompt";
import { toast } from "sonner";

interface Props {
	initialPrompt: string;
}

const AiChatBox = ({ initialPrompt = "" }: Props) => {
	const userId = "userId";
	const [chats, setChats] = useState<IChatFlat[]>([]);
	const [message, setMessage] = useState("");
	const [replyTo, setReplyTo] = useState<IChatFlat | null>(null);

	const chatContainerRef = useRef<HTMLDivElement>(null);

	const handleSendMessage = async () => {
		if (!message.trim()) return;

		setChats((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				message,
				userId: userId,
			},
		]);

		try {
			const aiResponse = await generateRefinePrompt(message);

			if (!aiResponse) {
				toast.error("No ai response received!");
				return;
			}

			setChats((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					message: aiResponse,
					userId: "ai",
				},
			]);
		} catch (error) {
			console.error("Failed to send message to AI:", error);
		}

		setMessage("");
		setReplyTo(null);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	useEffect(() => {
		if (initialPrompt.trim()) {
			const prompt = {
				id: crypto.randomUUID(),
				message: initialPrompt,
				userId: userId,
			};
			const sampleAi = {
				id: crypto.randomUUID(),
				message: initialPrompt,
				userId: 'ai',
			};

			setChats([{ ...prompt }, {...sampleAi}]);

			/* generateRefinePrompt(initialPrompt)
				.then((refinedPrompt) => {
					if (refinedPrompt)
						setChats((prev) => [
							...prev,
							{
								id: crypto.randomUUID(),
								message: refinedPrompt,
								userId: "ai",
							},
						]);
				})
				.catch(() => toast.error("Failed to refine message!")); */
		}
	}, []);

	return (
		<div className="rounded-xl grow flex flex-col gap-y-2 p-3 min-h-full justify-between">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Chat</h3>
			</div>
			<div
				ref={chatContainerRef}
				className="flex flex-col gap-y-2 px-1 scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 overflow-y-scroll"
			>
				{chats.map((chat) => (
					<ChatFlat
						chat={chat}
						key={chat.id}
						own={chat.userId === userId}
					/>
				))}
			</div>
			<div className="flex gap-1">
				<div className="w-full">
					<Textarea
						value={message}
						rows={1}
						className={`bg-white focus-visible:ring-indigo-300 ${
							replyTo ? "rounded-t-none" : ""
						}`}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Type your message (Enter to send, Shift+Enter for new line)"
					/>
				</div>
				<Button
					onClick={handleSendMessage}
					variant="default"
					size="icon"
					className="bg-indigo-400 place-self-end"
				>
					<SendHorizontal />
				</Button>
			</div>
		</div>
	);
};

export default AiChatBox;
