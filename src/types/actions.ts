import type { ContactInfo } from "./resume";

export type ContactAction = {

    [K in keyof ContactInfo]: {
        type:  "update_contact_info",
        field: K,
        value: ContactInfo[K]
    }
}[keyof ContactInfo];