import { useState } from "react";
import "./App.css";
import AiModal from "./components/global/ai-modal";
import Editor from "./components/global/studio-editor";

const samplePrompt = `**1. Overall Goal/Purpose:**\n\nTo attract new users and drive sign-ups for
 a food delivery service.\n\n**2. Header:**\n\nNeeds further definition.  Should likely include the
  company logo and potentially a concise tagline.\n\n**3. Navigation:**\n\nNeeds further definition.
	  Based on the context,  likely navigation links should include: Home, Menu/Browse Restaurants,
		 Sign Up/Login, About Us, Contact Us.\n\n**4. Hero Section:**\n\nNeeds further definition.
		   Should likely include a compelling headline (e.g., "Get Your Food Delivered Fast!"),
			  a sub-headline highlighting a key benefit (e.g., "Delicious meals delivered right to your
				 door"), and a prominent call-to-action button (e.g., "Order Now").  A background image
				  or video showcasing food could also be used.\n\n**5. Main Content Sections:**\n\nNo specific main content sections were described.  Based on the context of a food delivery website, potential sections could include:  A section highlighting popular restaurants or
 cuisines, a section showcasing customer testimonials, or a section explaining the ordering process.  Further definition is needed.\n\n**6. Call(s) to Action (CTA):**\n\nBesides the primary CTA in the hero section (needs further definition), other CTAs could be incorporated within the main content sections (if defined) to encourage users to explore the website or sign up.  Needs further definition.\n\n**7. Footer:**\n\nNeeds further definition.  Should likely include copyright information, contact information (email, phone number), links to privacy policy and terms of service, and potentially social media icons.\n`;

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
