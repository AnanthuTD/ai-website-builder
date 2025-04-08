import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ProjectListData } from "../dashboard";
import { MoreHorizontal } from "lucide-react";

interface ProjectTableProps {
	projects: ProjectListData[];
	onSelect: (projectId: string) => void;
	onDelete: (projectId: string) => void;
	onRename: (projectId: string, newName: string) => void;
}

export function ProjectTable({
	projects,
	onSelect,
	onDelete,
	onRename,
}: ProjectTableProps) {
	const handleDoubleClick = (projectId: string) => {
		onSelect(projectId);
	};

	return (
		<Table>
			<TableCaption>Page List.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Project ID</TableHead>
					<TableHead>Project Name</TableHead>
					<TableHead className="w-[50px]"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{projects.map((project) => (
					<TableRow
						key={project.id}
						onDoubleClick={() => handleDoubleClick(project.id)}
						className="cursor-pointer hover:bg-gray-100"
					>
						<TableCell className="font-medium">{project.id}</TableCell>
						<TableCell>{project.name}</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="h-8 w-8 p-0">
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										onClick={() => {
											const newName = prompt("Enter new name:", project.name);
											if (newName) onRename(project.id, newName);
										}}
									>
										Rename
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => onDelete(project.id)}>
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total Projects: {projects.length}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
