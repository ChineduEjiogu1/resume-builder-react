// main.tsx — create-vite generates this. Keep its ReactDOM.createRoot call;
// just import your styles and render <App />.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../src/App";
import { ResumeProvider } from "../src/state/ResumeContext"; // Adjust path if your provider is elsewhere
import "./index.css"; // Your global CSS file

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </StrictMode>
);