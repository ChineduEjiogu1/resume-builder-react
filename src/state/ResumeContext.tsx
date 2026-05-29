// ResumeContext.tsx — provides { resume, dispatch } app-wide so you don't prop-drill.
// Export a ResumeProvider plus useResume() / useResumeDispatch() hooks.

import type { ResumeData } from "../types/resume";
import type { ResumeAction } from "../types/actions";
import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode
} from "react";
import { defaultResume } from "./defaultResume";
import { resumeReducer } from "./resumeReducer";

type ResumeProviderProps = {
  children: ReactNode;
};

type ResumeContextValue = {
  resume: ResumeData;
  dispatch: Dispatch<ResumeAction>; 
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [resume, dispatch] = useReducer(resumeReducer, defaultResume);

  return (
    // provider goes here
    <ResumeContext.Provider value={{ resume, dispatch }}>
        {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);

  if (context === null) {
    throw new Error("useResume must be used inside a ResumeProvider");
  }

  return context;
}