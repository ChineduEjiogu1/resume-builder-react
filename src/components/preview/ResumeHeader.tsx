// ResumeHeader.tsx — name + contact line, centered (your renderHeader).
import type { ContactInfo } from "../../types/resume";

type ResumeHeaderProps = {
  contactInfo: ContactInfo;
};

export function ResumeHeader({ contactInfo }: ResumeHeaderProps) {
  // header logic goes here
  const contactLineParts = [
    contactInfo.address || "123 Street Name",
    `${contactInfo.cityState || "City, State"} ${contactInfo.zipCode || "12345"}`,
    contactInfo.email || "email@example.com",
    contactInfo.phone || "(555) 555-5555",
  ];

  const contactLine = contactLineParts.join(" • ");

  return (
    <>
      <h1>{contactInfo.name || "Full Name"}</h1>
      <p>{contactLine}</p>
    </>
  );
}
