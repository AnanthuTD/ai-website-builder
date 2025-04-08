import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import AiChatBox from "../ai-tools";
import { useState, useEffect } from "react";
import { loadProjectData, saveProjectData } from "@/lib/storage";

export default function Editor({
	initialPrompt,
	projectId = "",
}: {
	initialPrompt: string;
	projectId: string;
}) {
	const [code, setCode] = useState({ html: "", css: "" });
	const [editor, setEditor] = useState<any>(null);

	const updateContent = ({ css, html }: { html: string; css: string }) => {
		setCode({ html, css });
	};

	useEffect(() => {
		if (editor && code.html) {
			try {
				editor.setComponents(code.html);

				const css = editor.Css;
				css.clear();
				css.addRules(code.css);
			} catch (error) {
				console.error("Error in use effect: ", error);
			}
		}
	}, [code, editor]);


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
													component: () => {
														return (
															<AiChatBox
																initialPrompt={initialPrompt}
																onUpdateContent={updateContent}
																initialContent={code}
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
