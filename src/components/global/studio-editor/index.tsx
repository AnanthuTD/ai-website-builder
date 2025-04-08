import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import AiChatBox from "../ai-tools";

export default function Editor({ initialPrompt }: { initialPrompt: string }) {
	return (
		<StudioEditor
			className="h-screen"
			options={{
				licenseKey: "",
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
														return <AiChatBox initialPrompt={initialPrompt} />;
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
				project: {
					default: {
						pages: [{ name: "Home", component: "<h1>Home page</h1>" }],
					},
				},
			}}
		/>
	);
}
