# AI Website Builder

A modern, AI-powered website builder that allows users to create custom web pages effortlessly. Built with [Vite](https://vitejs.dev/) for a fast development experience and [GrapesJS](https://grapesjs.com/) for a powerful drag-and-drop editor, this tool leverages AI to generate websites based on user prompts, templates, and customizable options.

## Features

- **Prompt-Based Generation**: Users can input a prompt (e.g., "Create a blog page with a dark theme") to generate a website.
- **Template Selection**: Choose from predefined templates (e.g., Blog, Portfolio, E-commerce) to kickstart the design.
- **Language & Colors**: Customize the language and color scheme (primary, secondary, accent, etc.) for the generated page.
- **AI Prompt Refinement**: If no template is selected, the AI refines the user's prompt before generating the page.
- **Page Refinement**: Modify existing pages by providing additional prompts to the AI (e.g., "Add a sidebar with categories").
- **Dual AI Models**: Supports code generation using two models:
  - **Gemini**: A custom AI model for HTML/CSS generation.
  - **Deepseek (Hugging Face)**: An alternative model hosted on Hugging Face for diverse outputs.
- **GrapesJS Integration**: Convert AI-generated content into editable GrapesJS blocks for further customization.

## Tech Stack

- **Frontend**: Vite (React + TypeScript)
- **Editor**: GrapesJS
- **AI**: Custom Gemini model + Deepseek (via Hugging Face API)
- **UI Components**: Shadcn/ui (Tailwind CSS-based)
- **Storage**: LocalStorage for project persistence

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Hugging Face API key (for Deepseek model integration)
- Gemini API key