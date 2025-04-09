import { useState, useEffect } from "react";
import "./App.css";
import Editor from "./components/global/studio-editor";
import Dashboard, { SubmitData } from "./components/global/dashboard";
import { loadSelectedProjectId, saveSelectedProjectId } from "./lib/storage";
import { Toaster } from "./components/ui/sonner";

function App() {
	const [page, setPage] = useState(() => {
		return localStorage.getItem("selectedPage") || "editor";
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
		console.log("submitted: ", data);
		if (data.projectId) setData(data);
	};

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<nav className="bg-white text-gray-900 p-4 flex justify-between items-center border-b border-gray-200 shadow-sm">
				<div className="text-lg font-semibold">Website Builder</div>
				<div className="space-x-4">
					<button
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							page === "dashboard"
								? "bg-[hsl(238,87%,67%)] text-white"
								: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
						}`}
						onClick={() => {
							saveSelectedProjectId("");
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
