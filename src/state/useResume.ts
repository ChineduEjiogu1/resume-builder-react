import { useContext } from "react";
import { ResumeContext } from "./resumeContext";

export function useResume() {
  const context = useContext(ResumeContext);

  if (context === null) {
    throw new Error("useResume must be used inside a ResumeProvider");
  }

  return context;
}