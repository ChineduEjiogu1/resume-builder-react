// App.tsx — wraps everything in ResumeProvider; renders Toolbar + Editor + Preview.
// This REPLACES the App.tsx that create-vite generates.

import { ContactInfoForm } from "./components/editor/ContactInfoForm";
import { Preview } from "./components/preview/Preview";
import { EducationForm } from "./components/editor/EducationForm";
import { ExperienceForm } from "./components/editor/ExperienceForm";

export default function App() {
  return (
    <main>
      <ContactInfoForm />
      <EducationForm />
      <ExperienceForm />
      <Preview />
    </main>
  );
}