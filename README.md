# AI Facebook Ads Analysis System

A premium, high-density dashboard for analyzing Facebook Ads data using AI. The front-end is built with React, TypeScript, and Vite, designed with a sleek black-and-white aesthetic and smooth micro-animations.

## Features
- **Upload Zone**: Drag and drop Facebook Ads data.
- **Metric Overview**: Visualize key performance indicators at a glance.
- **AI Insights**: Get detailed AI-generated insights and recommendations for individual ads.
- **n8n Integration**: Seamless connection with an n8n workflow to process data and generate context-aware insights.

## n8n Workflow Configuration
This repository includes the n8n workflow used to power the AI backend for the dashboard.
To use it:
1. Make sure you have [n8n](https://n8n.io/) installed and running.
2. In your n8n workspace, click on Settings/Workflows -> **Import from File**.
3. Select the `Ads-Analysis-Workflow.json` file located in the root of this repository.
4. Configure any missing credentials (like your OpenAI API Key) inside the workflow nodes.
5. **Activate** the workflow so it can receive webhook requests from the frontend dashboard.

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- n8n installed (locally or cloud) for backend operations.

### Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/7KM-69/AI-Facebook-ads-analysis-system.git
   ```
2. Navigate into the directory:
   ```bash
   cd AI-Facebook-ads-analysis-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used
- React 18
- TypeScript
- Vite
- n8n (AI Agent / Workflow engine)
