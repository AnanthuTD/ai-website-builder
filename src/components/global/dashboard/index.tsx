import { useState } from "react";
import AiModal, { Colors } from "../ai-modal";
import { ProjectTable } from "../list-pages";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	loadProjectsList,
	saveProjectsList,
	saveSelectedProjectId,
} from "@/lib/storage";

export type SubmitData = {
	prompt?: string;
	language?: string;
	colors?: Colors;
	template?: string;
	projectId?: string;
	projectName?: string;
};

interface DashboardProps {
	onSubmit: (data: SubmitData) => void;
}

export interface ProjectListData {
	id: string;
	name: string;
}

function Dashboard({ onSubmit }: DashboardProps) {
	const [projects, setProjects] = useState<ProjectListData[]>(
		loadProjectsList()
	);
	const [openDeleteAll, setOpenDeleteAll] = useState(false);

	const handleSubmit = (data: SubmitData) => {
		const newProject = {
			id: crypto.randomUUID(),
			name: data.projectName || "Untitled Project",
		};
		const newProjects = [newProject, ...projects];

		saveProjectsList(newProjects);
		setProjects(newProjects);
		onSubmit({ ...data, projectId: newProject.id });
	};

	const handleDelete = (projectId: string) => {
		const newProjects = projects.filter((project) => project.id !== projectId);
		saveProjectsList(newProjects);
		setProjects(newProjects);
	};

	const handleRename = (projectId: string, newName: string) => {
		const newProjects = projects.map((project) =>
			project.id === projectId ? { ...project, name: newName } : project
		);
		saveProjectsList(newProjects);
		setProjects(newProjects);
	};

	const handleDeleteAll = () => {
		saveProjectsList([]);
		setProjects([]);
		setOpenDeleteAll(false);
	};

	const handleProjectSelect = (projectId: string) => {
		saveSelectedProjectId(projectId);
		onSubmit({
			projectId,
		});
	};

	return (
		<section className="flex flex-1 bg-white min-h-screen">
			<div className="flex flex-col w-full p-8">
				{/* Header Section */}
				<div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-4">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900">
							Website Builder
						</h2>
						<h4 className="text-gray-500 text-sm mt-1">Project Dashboard</h4>
					</div>
					<div className="space-x-4">
						{/* Create New Project */}
						<AiModal onSubmit={handleSubmit} />

						{/* Delete All Projects */}
						<Dialog open={openDeleteAll} onOpenChange={setOpenDeleteAll}>
							<DialogTrigger asChild>
								<Button
									variant="ghost"
									className="text-red-500 hover:text-red-600 hover:bg-gray-100 transition-colors"
								>
									Delete All
								</Button>
							</DialogTrigger>
							<DialogContent className="bg-white border border-gray-200 text-gray-900">
								<DialogHeader>
									<DialogTitle className="text-gray-900">
										Delete All Projects?
									</DialogTitle>
									<DialogDescription className="text-gray-500">
										This action will permanently remove all projects and cannot
										be undone.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button
										variant="ghost"
										onClick={() => setOpenDeleteAll(false)}
										className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
									>
										Cancel
									</Button>
									<Button
										variant="ghost"
										onClick={handleDeleteAll}
										className="text-red-500 hover:text-red-600 hover:bg-gray-100 transition-colors"
									>
										Delete All
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{/* Projects Section */}
				<div className="bg-white">
					{projects && projects.length ? (
						<ProjectTable
							onSelect={handleProjectSelect}
							projects={projects}
							onDelete={handleDelete}
							onRename={handleRename}
						/>
					) : (
						<div className="text-center py-16">
							<p className="text-gray-600 text-base">No projects yet</p>
							<p className="text-gray-400 text-sm mt-1">
								Start by creating a new project
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default Dashboard;
