import { useState, useEffect } from "react";
import "./App.css";
import Editor from "./components/global/studio-editor";
import Dashboard from "./components/global/dashboard";
import { loadSelectedProjectId } from "./lib/storage";

function App() {
	const [page, setPage] = useState(() => {
		return localStorage.getItem("selectedPage") || "editor";
	});
	const [initialPrompt, setInitialPrompt] = useState("");
	const [projectId, setProjectId] = useState("");

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
		if (projectId) {
			handlePageChange("editor");
		}
	}, [projectId]);

	return (
		<div className="min-h-screen flex flex-col">
			{/* Navigation Bar */}
			<nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
				<div className="text-lg font-bold">Website Builder</div>
				<div className="space-x-4">
					<button
						className={`px-3 py-1 rounded ${
							page === "dashboard"
								? "bg-blue-500"
								: "bg-gray-600 hover:bg-gray-500"
						}`}
						onClick={() => handlePageChange("dashboard")}
					>
						Dashboard
					</button>
					<button
						className={`px-3 py-1 rounded ${
							page === "editor"
								? "bg-blue-500"
								: "bg-gray-600 hover:bg-gray-500"
						}`}
						onClick={() => handlePageChange("editor")}
					>
						Editor
					</button>
				</div>
			</nav>

			{/* Main Content */}
			{page === "editor" ? (
				<div className="flex-1">
					<Editor
						initialPrompt={initialPrompt}
						projectId={projectId || loadSelectedProjectId()}
					/>
				</div>
			) : (
				<Dashboard
					setInitialPrompt={setInitialPrompt}
					setProjectId={setProjectId}
				/>
			)}
		</div>
	);
}

export default App;
