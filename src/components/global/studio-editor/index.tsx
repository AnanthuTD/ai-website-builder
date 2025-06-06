import StudioEditor from "@grapesjs/studio-sdk/react";
import AiChatBox from "../ai-tools";
import { useEffect, useState } from "react";
import {
	loadProjectBlocksData,
	saveProjectBlocksData,
	loadProjectData,
	saveProjectData,
} from "@/lib/storage";
import { toast } from "sonner";
import { SubmitData } from "../dashboard";
import { sampleTemplates } from "@/lib/templates";

interface Content {
	html: string;
	css: string;
}

export interface Block {
	id: string;
	label: string;
	content: string;
}

export default function Editor({ data }: { data: SubmitData }) {
	const { projectId = "" } = data;
	const [editor, setEditor] = useState<any>(null);

	useEffect(() => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "/styles/style.css";
		document.head.appendChild(link);

		return () => {
			document.head.removeChild(link);
		};
	}, []);

	const updatePage = (editor: any, content: Content) => {
		console.log("Content update: ", content);
		if (editor) {
			console.log("editor instance found");
			try {
				editor.setComponents(content.html);

				const css = editor.Css;
				css.clear();
				css.addRules(content.css);
			} catch (error) {
				console.error("Error in use effect: ", error);
			}
		} else {
			toast.error("Editor instance not found!");
			console.error("Editor instance not found!");
		}
	};

	const getPageContent = (editorInstance: any) => {
		if (!loadProjectData(projectId)) {
			if (data.template) {
				const tem = sampleTemplates[data.template];
				return {
					html: tem.html || "",
					css: tem.css || "",
				};
			} else {
				return {
					html: "",
					css: "",
				};
			}
		}
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
				licenseKey: import.meta.env.VITE_GRAPESJS_PUBLIC_KEY,
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
							console.log("editor instance loaded");
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
																initialPrompt={data?.prompt ?? ""}
																language={data.language ?? ""}
																colors={data.colors ?? null}
																onUpdateContent={(content) =>
																	updatePage(editor, content)
																}
																initialContent={getPageContent(editor)}
																updateAiGeneratedBlock={(blocks) =>
																	updateAiGeneratedBlock(editor, blocks)
																}
																firstTime={!loadProjectData(projectId)}
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
