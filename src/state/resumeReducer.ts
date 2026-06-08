import type { ResumeAction } from "../types/actions";
import type { ResumeData, BulletedEntry } from "../types/resume";

function createBlankBulletedEntry() {
  return {
    organization: "",
    role: "",
    location: "",
    dateRange: "",
    bullets: [""],
  };
}

function addBulletToEntry(
  entries: BulletedEntry[],
  entryIndexToUpdate: number,
) {
  return entries.map((entry, entryIndex) =>
    entryIndex === entryIndexToUpdate
      ? {
          ...entry,
          bullets: [...entry.bullets, ""],
        }
      : entry,
  );
}

function updateBulletInEntry(
  entries: BulletedEntry[],
  entryIndexToUpdate: number,
  bulletIndexToUpdate: number,
  value: string,
) {
  return entries.map((entry, entryIndex) =>
    entryIndex === entryIndexToUpdate
      ? {
          ...entry,
          bullets: entry.bullets.map((bullet, bulletIndex) =>
            bulletIndex === bulletIndexToUpdate ? value : bullet,
          ),
        }
      : entry,
  );
}

function deleteBulletFromEntry(
  entries: BulletedEntry[],
  entryIndexToUpdate: number,
  bulletIndexToDelete: number,
) {
  return entries.map((entry, entryIndex) => {
    if (entryIndex !== entryIndexToUpdate) {
      return entry;
    }

    if (entry.bullets.length <= 1) {
      return entry;
    }

    return {
      ...entry,
      bullets: entry.bullets.filter(
        (_, bulletIndex) => bulletIndex !== bulletIndexToDelete,
      ),
    };
  });
}

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
      const blankExperienceEntry = createBlankBulletedEntry();

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
        experience: updateBulletInEntry(
          state.experience,
          action.entryIndex,
          action.bulletIndex,
          action.value,
        ),
      };

    case "add_experience_bullet":
      return {
        ...state,
        experience: addBulletToEntry(state.experience, action.entryIndex),
      };

    case "delete_experience_bullet":
      return {
        ...state,
        experience: deleteBulletFromEntry(
          state.experience,
          action.entryIndex,
          action.bulletIndex,
        ),
      };

    case "update_leadership":
      return {
        ...state,
        leadership: state.leadership.map((entry, index) =>
          index === action.index
            ? { ...entry, [action.field]: action.value }
            : entry,
        ),
      };

    case "add_leadership": {
      const blankLeadershipEntry = createBlankBulletedEntry();

      return {
        ...state,
        leadership: [...state.leadership, blankLeadershipEntry],
      };
    }

    case "delete_leadership":
      if (state.leadership.length <= 1) {
        return state;
      }

      return {
        ...state,
        leadership: state.leadership.filter(
          (_, index) => index !== action.index,
        ),
      };

    case "update_leadership_bullet":
      return {
        ...state,
        leadership: updateBulletInEntry(
          state.leadership,
          action.entryIndex,
          action.bulletIndex,
          action.value,
        ),
      };

    case "add_leadership_bullet":
      return {
        ...state,
        leadership: addBulletToEntry(state.leadership, action.entryIndex),
      };

    case "delete_leadership_bullet":
      return {
        ...state,
        leadership: deleteBulletFromEntry(
          state.leadership,
          action.entryIndex,
          action.bulletIndex,
        ),
      };

    default:
      return state;
  }
}