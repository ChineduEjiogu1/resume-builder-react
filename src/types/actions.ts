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

export type ResumeAction =
  | ContactAction
  | UpdateEducation
  | AddEducationAction
  | DeleteEducationAction;