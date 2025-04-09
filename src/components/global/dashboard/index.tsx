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
		const newProject = { id: crypto.randomUUID(), name: "Untitled Project" };
		const newProjects = [newProject, ...projects];

		saveProjectsList(newProjects);
		setProjects(newProjects);
		onSubmit(data);
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
		<section className="flex flex-1">
			<section id="side-bar" className="h-screen w-1/4 bg-gray-100 p-4">
				Sidebar
			</section>
			<div className="flex flex-col w-full p-5">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-2xl">Website Builder Dashboard</h2>
						<h4>Here you can create new pages.</h4>
					</div>
					<div className="space-x-2">
						<AiModal onSubmit={handleSubmit} />
						<Dialog open={openDeleteAll} onOpenChange={setOpenDeleteAll}>
							<DialogTrigger asChild>
								<Button variant="destructive">Delete All</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you sure?</DialogTitle>
									<DialogDescription>
										This will delete all projects permanently. This action
										cannot be undone.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setOpenDeleteAll(false)}
									>
										Cancel
									</Button>
									<Button variant="destructive" onClick={handleDeleteAll}>
										Delete All
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{projects && projects.length ? (
					<ProjectTable
						onSelect={handleProjectSelect}
						projects={projects}
						onDelete={handleDelete}
						onRename={handleRename}
					/>
				) : (
					"No Projects"
				)}
			</div>
		</section>
	);
}

export default Dashboard;
