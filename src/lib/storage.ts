import { ProjectListData } from "@/components/global/dashboard";
import { Block } from "@/components/global/studio-editor";
import { ProjectData } from "@grapesjs/studio-sdk/dist/utils/types.js";

export const saveProjectData = (projectId: string, project: ProjectData) => {
	localStorage.setItem(projectId, JSON.stringify(project));
};

export const loadProjectData = (projectId: string): ProjectData | null => {
	const projectString = localStorage.getItem(projectId);
	return projectString ? JSON.parse(projectString) : null;
};

export const saveProjectBlocksData = (projectId: string, blocks: Block[]) => {
	localStorage.setItem(`blocks_${projectId}`, JSON.stringify(blocks));
};

export const loadProjectBlocksData = (projectId: string): Block[] => {
	const projectString = localStorage.getItem(`blocks_${projectId}`);
	return projectString ? JSON.parse(projectString) : [];
};

export const loadSelectedProjectId = (): string => {
	const projectString = localStorage.getItem("selectedProjectId");
	return projectString ? JSON.parse(projectString) : "";
};

export const saveSelectedProjectId = (projectId: string) => {
	localStorage.setItem("selectedProjectId", JSON.stringify(projectId));
};

export const loadProjectsList = (): ProjectListData[] => {
	const projectString = localStorage.getItem("projects");
	return projectString ? JSON.parse(projectString) : [];
};

export const saveProjectsList = (data: ProjectListData[]) => {
	localStorage.setItem("projects", JSON.stringify(data));
};
