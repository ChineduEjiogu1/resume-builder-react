import { useReducer, type ReactNode } from "react";
import { defaultResume } from "./defaultResume";
import { resumeReducer } from "./resumeReducer";
import { ResumeContext } from "./resumeContext";

type ResumeProviderProps = {
  children: ReactNode;
};

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [resume, dispatch] = useReducer(resumeReducer, defaultResume);

  return (
    <ResumeContext.Provider value={{ resume, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}