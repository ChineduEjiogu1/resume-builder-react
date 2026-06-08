// resumeTypes.ts — the single source of shape truth. Everything else is typed off this.

export interface ContactInfo {
  name: string;
  address: string;
  cityState: string;
  email: string;
  phone: string;
  zipCode: string
}

export interface EducationEntry {
  school: string;
  degree: string;
  location: string;
  dateRange: string;
  thesis?: string;     // optional — the ? is the typed version of your ternaries
  coursework?: string;
}

// experience AND leadership share this shape — your renderBulletedEntries insight, as a type
export interface BulletedEntry {
  organization: string;
  role: string;
  location: string;
  dateRange: string;
  bullets: string[];
}

export interface SkillItem {
  label: string;
  text: string;
}

export interface ResumeData {
  contactInfo: ContactInfo;
  education: EducationEntry[];
  experience: BulletedEntry[];
  leadership: BulletedEntry[];
  skills: SkillItem[];
}

// Handy unions for the reducer (which section is being acted on)
export interface BulletedEntry {
  organization: string;
  role: string;
  location: string;
  dateRange: string;
  bullets: string[];
}

export type BulletedEntryFieldName =
  | "organization"
  | "role"
  | "location"
  | "dateRange";
export type EntrySection = "education" | "experience" | "leadership" | "skills";
export type BulletedSection = "experience" | "leadership"; // only these have bullets