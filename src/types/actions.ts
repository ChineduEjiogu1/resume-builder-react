import type { ContactInfo } from "./resume";
import type { EducationEntry } from "./resume";

export type ContactAction = {
  [K in keyof ContactInfo]: {
    type: "update_contact_info";
    field: K;
    value: ContactInfo[K];
  };
}[keyof ContactInfo];

export type UpdateEducation = {
  type: "update_education";
  index: number;
  field: keyof EducationEntry;
  value: string;
};

export type AddEducationAction = {
  type: "add_education";
};

export type DeleteEducationAction = {
  type: "delete_education";
  index: number;
};

export type UpdateExperience = {
  type: "update_experience";
  index: number;
  field: ExperienceFieldName;
  value: string;
};

export type AddExperienceAction = {
  type: "add_experience";
};

export type DeleteExperienceAction = {
  type: "delete_experience";
  index: number;
};

export type ExperienceFieldName =
  | "organization"
  | "role"
  | "location"
  | "dateRange";


export type ResumeAction =
  | ContactAction
  | UpdateEducation
  | AddEducationAction
  | DeleteEducationAction
  | UpdateExperience
  | AddExperienceAction
  | DeleteExperienceAction;