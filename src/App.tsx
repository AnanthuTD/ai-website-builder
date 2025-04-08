import { useState } from "react";
import "./App.css";
import AiModal from "./components/global/ai-modal";
import Editor from "./components/global/studio-editor";

const samplePrompt = `
**Overall Goal/Purpose:** Create an informative and inviting website for "The Daily Grind" coffee shop to attract customers, showcase the menu and story, and provide contact/location details.
**Header:** Contains the shop's logo (The Daily Grind) and the main navigation.
**Navigation:** Links for Home, Menu, About, Contact.
**Hero Section:** Features a large background image (latte art), a primary headline (e.g., "Welcome to The Daily Grind"), and possibly a sub-headline about the shop's vibe (modern and cozy).
**Main Content Sections:**
*   **Coffee Beans Origin Section:** Text explaining the source and quality of the coffee beans.
*   **Menu Section:** Lists menu items, categorized into Espresso, Brewed Coffee, and Pastries.
*   **Shop Story Section:** A brief text section detailing the history or mission of the coffee shop.
*   **Location Section:** Information on finding the shop, ideally including an embedded map placeholder.
**Call(s) to Action (CTA):** No specific CTAs mentioned beyond navigating the site. Could potentially add a "View Menu" or "Visit Us" button.
**Footer:** Includes contact information (address, phone number), copyright notice, and links to Instagram and Facebook social media profiles.
    `;
function App() {
	const [page, setPage] = useState("editor");
	const [initialPrompt, setInitialPrompt] = useState(samplePrompt);

	return page === "editor" ? (
		<div className="h-screen">
			<Editor initialPrompt={initialPrompt} />
		</div>
	) : (
		<section className="flex">
			<section id="side-bar" className="h-screen w-1/4">
				sidebar
			</section>

			<div className="flex flex-col w-full p-5">
				<div className="flex justify-between">
					<div>
						<h2 className="text-2xl">Website builder</h2>
						<h4>Here you can create new pages.</h4>
					</div>
					<AiModal onSubmitPrompt={setInitialPrompt} />
				</div>
			</div>
		</section>
	);
}

export default App;
