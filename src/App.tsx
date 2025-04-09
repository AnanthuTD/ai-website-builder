import { useState, useEffect } from "react";
import "./App.css";
import Editor from "./components/global/studio-editor";
import Dashboard, { SubmitData } from "./components/global/dashboard";
import { loadSelectedProjectId, saveSelectedProjectId } from "./lib/storage";
import { Toaster } from "./components/ui/sonner";

function App() {
	const [page, setPage] = useState(() => {
		return localStorage.getItem("selectedPage") || "dashboard";
	});
	const [data, setData] = useState<SubmitData | null>({
		projectId: loadSelectedProjectId(),
	});

	const handlePageChange = (newPage: string) => {
		setPage(newPage);
		localStorage.setItem("selectedPage", newPage);
	};

	useEffect(() => {
		const storedPage = localStorage.getItem("selectedPage");
		if (storedPage && storedPage !== page) {
			setPage(storedPage);
		}
	}, []);

	useEffect(() => {
		if (data && data.projectId) {
			handlePageChange("editor");
		}
	}, [data]);

	const handleSubmit = (data: SubmitData) => {
		if (data.projectId) setData(data);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
				<div className="text-lg font-bold">Website Builder</div>
				<div className="space-x-4">
					<button
						className={`px-3 py-1 rounded ${
							page === "dashboard"
								? "bg-blue-500"
								: "bg-gray-600 hover:bg-gray-500"
						}`}
						onClick={() => {
							saveSelectedProjectId('')
							handlePageChange("dashboard");
						}}
					>
						Dashboard
					</button>
				</div>
			</nav>

			<main className="flex-1 relative z-0">
				{page === "editor" ? (
					<Editor data={data} />
				) : (
					<Dashboard onSubmit={handleSubmit} />
				)}
			</main>

			<Toaster />
		</div>
	);
}

export default App;
