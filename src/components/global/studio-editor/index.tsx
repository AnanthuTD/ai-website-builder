import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import AiChatBox from "../ai-tools";
import { useState } from "react";
import {
	loadProjectBlocksData,
	saveProjectBlocksData,
	loadProjectData,
	saveProjectData,
} from "@/lib/storage";
import { toast } from "sonner";

interface Content {
	html: string;
	css: string;
}

export interface Block {
	id: string;
	label: string;
	content: string;
}

export default function Editor({
	initialPrompt,
	projectId = "",
}: {
	initialPrompt: string;
	projectId: string;
}) {
	const [editor, setEditor] = useState<any>(null);

	const updatePage = (content: Content) => {
		if (editor) {
			try {
				editor.setComponents(content.html);

				const css = editor.Css;
				css.clear();
				css.addRules(content.css);
			} catch (error) {
				console.error("Error in use effect: ", error);
			}
		}
	};

	const getPageContent = (editorInstance: any) => {
		return {
			html: editorInstance?.getHtml() || "",
			css: editorInstance?.getCss() || "",
		};
	};

	const updateAiGeneratedBlock = (editor: any, blocks: Block[]) => {
		if (!editor) {
			toast.error("No editor instance defined!");
			return;
		}
		const { Blocks } = editor;

		const blockMedia =
			'<svg viewBox="0 0 24 24"><path d="M19,5H22V7H19V10H17V7H14V5H17V2H19V5M17,19V13H19V21H3V5H11V7H5V19H17Z" /></svg>';
		const newCategory = {
			id: "ai-generated",
			label: "Ai Generated",
			icon: '<svg viewBox="0 0 24 24"><path d="M7 11H1v2h6v-2m2.2-3.2L7 5.6 5.5 7.1l2.2 2 1.4-1.3M13 1h-2v6h2V1m5.4 6L17 5.7l-2.2 2.2 1.4 1.4L18.4 7M17 11v2h6v-2h-6m-5-2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m2.8 7.2 2.1 2.2 1.5-1.4-2.2-2.2-1.4 1.4m-9.2.8 1.5 1.4 2-2.2-1.3-1.4L5.6 17m5.4 6h2v-6h-2v6Z"/></svg>',
		};

		blocks.forEach((block) => {
			Blocks.add(block.id, {
				label: block.label,
				content: block.content,
				category: newCategory,
				media: blockMedia,
			});
		});

		saveProjectBlocksData(projectId, blocks);
	};

	return (
		<StudioEditor
			className="h-screen"
			options={{
				licenseKey: "",
				storage: {
					type: "self",
					autosaveChanges: 5,

					onSave: async ({ project }) => {
						saveProjectData(projectId, project);
						console.log("Project saved", { project });
					},

					onLoad: async () => {
						const project = loadProjectData(projectId);
						console.log("Project loaded", { project });

						return {
							project: project || {
								pages: [{ name: "Home", component: "<h1>New project</h1>" }],
							},
						};
					},
				},
				plugins: [
					(editorInstance) => {
						editorInstance.onReady(() => {
							setEditor(editorInstance);

							const blocks = loadProjectBlocksData(projectId);
							updateAiGeneratedBlock(editorInstance, blocks);
						});
					},
				],
				layout: {
					default: {
						type: "row",
						style: { height: "100%" },
						children: [
							{
								type: "sidebarLeft",
								children: {
									type: "tabs",
									value: "blocks",
									tabs: [
										{
											id: "pages",
											label: "Pages",
											children: {
												type: "panelPages",
												style: { height: "100%" },
											},
										},
										{
											id: "blocks",
											label: "Blocks",
											children: {
												type: "panelBlocks",
												style: { height: "100%" },
											},
										},
										{
											id: "layers",
											label: "Layers",
											children: {
												type: "panelLayers",
												style: { height: "100%" },
											},
										},
									],
								},
							},
							{
								type: "canvasSidebarTop",
								sidebarTop: { leftContainer: { buttons: [] } },
							},
							{
								type: "sidebarRight",
								className: "h-full",
								children: {
									type: "tabs",
									value: "ai",
									tabs: [
										{
											id: "ai",
											label: "AI",
											children: [
												{
													type: "custom",
													component: ({ editor }) => {
														return (
															<AiChatBox
																initialPrompt={initialPrompt}
																onUpdateContent={updatePage}
																initialContent={getPageContent(editor)}
																updateAiGeneratedBlock={(blocks) =>
																	updateAiGeneratedBlock(editor, blocks)
																}
															/>
														);
													},
													style: { height: "100%", display: "flex" },
												},
											],
										},
										{
											id: "styles",
											label: "Styles",
											children: {
												type: "column",
												style: { height: "100%" },
												children: [
													{ type: "panelSelectors", style: { padding: 5 } },
													{ type: "panelStyles" },
												],
											},
										},
										{
											id: "props",
											label: "Properties",
											children: {
												type: "panelProperties",
												style: { padding: 5, height: "100%" },
											},
										},
									],
								},
							},
						],
					},
				},
			}}
		/>
	);
}
