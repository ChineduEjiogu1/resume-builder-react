import type {
  ContactInfo,
  EducationEntry,
  BulletedEntryFieldName,
} from "./resume";

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

export type UpdateExperienceBulletAction = {
  type: "update_experience_bullet";
  entryIndex: number;
  bulletIndex: number;
  value: string;
};

export type AddExperienceBulletAction = {
  type: "add_experience_bullet";
  entryIndex: number;
};

export type DeleteExperienceBulletAction = {
  type: "delete_experience_bullet";
  entryIndex: number;
  bulletIndex: number;
};

export type UpdateLeadership = {
  type: "update_leadership";
  index: number;
  field: BulletedEntryFieldName;
  value: string;
};

export type AddLeadershipAction = {
  type: "add_leadership";
};

export type DeleteLeadershipAction = {
  type: "delete_leadership";
  index: number;
};

export type UpdateLeadershipBulletAction = {
  type: "update_leadership_bullet";
  entryIndex: number;
  bulletIndex: number;
  value: string;
};

export type AddLeadershipBulletAction = {
  type: "add_leadership_bullet";
  entryIndex: number;
};

export type DeleteLeadershipBulletAction = {
  type: "delete_leadership_bullet";
  entryIndex: number;
  bulletIndex: number;
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
  | DeleteExperienceAction
  | UpdateExperienceBulletAction
  | AddExperienceBulletAction
  | DeleteExperienceBulletAction
  | UpdateLeadership
  | UpdateLeadershipBulletAction
  | AddLeadershipAction
  | DeleteLeadershipAction
  | AddLeadershipBulletAction
  | DeleteLeadershipBulletAction;