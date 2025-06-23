import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import './index.css'; // Required for Tailwind to apply styles
import './App.css'; // If you have additional component styles


const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error(
    'Root element not found. Ensure there is a <div id="root"> in your HTML file.'
  );
}
