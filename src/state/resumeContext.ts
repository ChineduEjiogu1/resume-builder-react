import { createContext, type Dispatch } from "react";
import type { ResumeData } from "../types/resume";
import type { ResumeAction } from "../types/actions";

export type ResumeContextValue = {
  resume: ResumeData;
  dispatch: Dispatch<ResumeAction>;
};

export const ResumeContext = createContext<ResumeContextValue | null>(null);