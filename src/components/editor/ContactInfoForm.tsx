// BasicsForm.tsx — controlled inputs for name/address/cityState/email/phone. Dispatches UPDATE_BASIC_FIELD.
import { useResume } from "../../state/ResumeContext";
import type { ContactInfo } from "../../types/resume";

type ContactInfoField = {
  label: string;
  field: keyof ContactInfo;
  placeholder: string;
};

const contactInfoFields: ContactInfoField[] = [
  {
    label: "Full Name",
    field: "name",
    placeholder: "John Doe"
  },
  {
    label: "Address",
    field: "address",
    placeholder: "123 Main St, New York, NY 10001"
  },
  {
    label: "City & State",
    field: "cityState",
    placeholder: "New York, NY"
  },
  {
    label: "Zip Code",
    field: "zipCode",
    placeholder: "10001"
  },
  {
    label: "Phone Number",
    field: "phone",
    placeholder: "(555) 123-4567"
  },
  {
    label: "Email Address",
    field: "email",
    placeholder: "johndoe@example.com"
  } 
];

export function ContactInfoForm() {
  const { resume, dispatch } = useResume();

  return (
    <div>
      <h3>Contact Information</h3>
      {contactInfoFields.map((contactField) => (
        <label key={contactField.label}>
          <input
            type="text"
            placeholder={contactField.placeholder}
            value={resume.contactInfo[contactField.field]}
            onChange={(event) =>
              dispatch({
                type: "update_contact_info",
                field: contactField.field,
                value: event.target.value,
              })
            }
          />
        </label>
      ))}
    </div>
  );
}

export function Preview() {
  const { resume } = useResume();

    // address, city/state zip, email, phone
    const contactLineParts = [
    resume.contactInfo.address || "123 Street Name",
    `${resume.contactInfo.cityState || "City, State"} ${resume.contactInfo.zipCode || "12345"}`,
    resume.contactInfo.email || "email@example.com",
    resume.contactInfo.phone || "(555) 555-5555",
];


  const contactLine = contactLineParts.join(" • ");

  return (
    <>
      <h1>{resume.contactInfo.name || "Full Name"}</h1>
      <p>{contactLine}</p>
    </>
  );
}