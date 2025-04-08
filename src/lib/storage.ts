import { ProjectListData } from "@/components/global/dashboard";
import { ProjectData } from "@grapesjs/studio-sdk/dist/utils/types.js";

export const saveProjectData = (projectId: string, project: ProjectData) => {
	localStorage.setItem(projectId, JSON.stringify(project));
};

export const loadProjectData = (projectId: string): ProjectData | null => {
	const projectString = localStorage.getItem(projectId);
	return projectString ? JSON.parse(projectString) : null;
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
