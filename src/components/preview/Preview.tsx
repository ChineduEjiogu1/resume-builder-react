// Preview.tsx — right pane (your render.js). Reads resume from context, renders the document.

import { useResume } from "../../state/useResume";
import { ResumeHeader } from "./ResumeHeader";
import { EducationPreviewSection } from "./EducationPreviewSection";
import { ExperiencePreviewSection } from "./ExperiencePreviewSection"; 

export function Preview() {
  const { resume } = useResume();

  return (
    <>
      <ResumeHeader contactInfo={resume.contactInfo} />
      <EducationPreviewSection education={resume.education} />
      <ExperiencePreviewSection experience={resume.experience} />
    </>
  );
}