// resumeReducer.ts — pure, typed reducer. The ResumeAction union below IS your handleClick
// cases. Every update is immutable (spread/map/filter); TS verifies each branch returns a Resume.
//
// type ResumeAction =
//   | { type: "UPDATE_BASIC_FIELD"; field: keyof Basics; value: string }
//   | { type: "UPDATE_ENTRY_FIELD"; section: EntrySection; index: number; field: string; value: string }
//   | { type: "UPDATE_BULLET"; section: BulletedSection; entryIndex: number; bulletIndex: number; value: string }
//   | { type: "ADD_ENTRY"; section: EntrySection }
//   | { type: "REMOVE_ENTRY"; section: EntrySection; index: number }
//   | { type: "ADD_BULLET"; section: BulletedSection; entryIndex: number }
//   | { type: "REMOVE_BULLET"; section: BulletedSection; entryIndex: number; bulletIndex: number }
//   | { type: "LOAD_RESUME"; resume: Resume }
//   | { type: "RESET_RESUME" };

import type { ResumeData } from "../types/resume";
import type { ResumeAction } from "../types/actions";

export function resumeReducer(
  state: ResumeData,
  action: ResumeAction,
): ResumeData {
  switch (action.type) {
    case "update_contact_info":
      return {
        ...state,
        contactInfo: {
          ...state.contactInfo,
          [action.field]: action.value,
        },
      };

    case "update_education":
      return {
        ...state,
        education: state.education.map((entry, index) =>
          index === action.index
            ? { ...entry, [action.field]: action.value }
            : entry,
        ),
      };

    case "add_education": {
      const blankEducationEntry = {
        school: "",
        degree: "",
        location: "",
        dateRange: "",
      };

      return {
        ...state,
        education: [...state.education, blankEducationEntry],
      };
    }

    case "delete_education":
      if (state.education.length <= 1) {
        return state;
      }

      return {
        ...state,
        education: state.education.filter((_, index) => index !== action.index),
      };

    case "update_experience":
      return {
        ...state,
        experience: state.experience.map((entry, index) =>
          index === action.index
            ? { ...entry, [action.field]: action.value }
            : entry,
        ),
      };

    case "add_experience": {
      const blankExperienceEntry = {
        organization: "",
        role: "",
        location: "",
        dateRange: "",
        bullets: [],
      };

      return {
        ...state,
        experience: [...state.experience, blankExperienceEntry],
      };
    }

    case "delete_experience":
      if (state.experience.length <= 1) {
        return state;
      }

      return {
        ...state,
        experience: state.experience.filter(
          (_, index) => index !== action.index,
        ),
      };


    case "update_experience_bullet":
      return {
        ...state,
         experience : state.experience.map((entry,entryIndex) => 
          entryIndex === action.entryIndex ? {
            ...entry,
            bullets: entry.bullets.map((bullet, bulletsIndex) => 
              bulletsIndex == action.bulletIndex ? action.value : bullet
            ),
          }
          : entry
        ),
      };

    case "add_experience_bullet":
      return {
        ...state,
        experience: state.experience.map((entry, entryIndex) =>
          entryIndex === action.entryIndex ? {
            ...entry,
            bullets: [...entry.bullets, ""],
          }
          : entry
        ),
      };

    case "delete_experience_bullet":
      return {
        ...state,
        experience: state.experience.map((entry, entryIndex) => {
          
          if (entryIndex !== action.entryIndex) {
            return entry
          }

          if (entry.bullets.length <= 1) {
              return entry;
          }

          return {
            ...entry,
            bullets: entry.bullets.filter(
              (_, bulletIndex) => bulletIndex !== action.bulletIndex
            ),
          };
      }),
    };

    default:
      return state;
  }
};