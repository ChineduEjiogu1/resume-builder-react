// Preview.tsx — right pane (your render.js). Reads resume from context, renders the document.

import { useResume } from "../../state/ResumeContext";

export function Preview() {
  const { resume } = useResume();
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
      <section>
        <h2>Education</h2>

        {resume.education.map((educationEntry, educationIndex) => (
          <div key={educationIndex}>
            <strong>{educationEntry.school || "School Name"}</strong>
            <p>{educationEntry.degree || "Degree"}</p>
            <p>{educationEntry.location || "Location"}</p>
            <p>{educationEntry.dateRange || "Date Range"}</p>
          </div>
        ))}
      </section>
    </>
  );
}