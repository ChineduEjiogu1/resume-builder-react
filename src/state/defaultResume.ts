// defaultResume.ts — the starting Resume object (your old state.js data), typed as Resume.
// import type { Resume } from "./resumeTypes";
// export const defaultResume: Resume = { basics: {...}, education: [...], ... };

import type { ResumeData } from "../types/resume";

export const defaultResume: ResumeData = {
  contactInfo: {name:"", address:"", cityState:"", email:"", phone:"", zipCode: ""},
  education: [
  {
    school: "",
    degree: "",
    location: "",
    dateRange: ""
  }
],
  experience: [
  {
    organization: "",
    role: "",
    location: "",
    dateRange: "",
    bullets: [""]
  }
],

  leadership: [],
  skills: []
};
