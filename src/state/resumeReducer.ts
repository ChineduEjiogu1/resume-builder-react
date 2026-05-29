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
import type { ContactAction } from "../types/actions";

export function resumeReducer (
    state: ResumeData,
    action: ContactAction
): ResumeData{
    switch (action.type) {
        case "update_contact_info":
            return {
                ...state,
                contactInfo: {
                    ...state.contactInfo,
                    [action.field] : action.value
                }
            };
    };
}