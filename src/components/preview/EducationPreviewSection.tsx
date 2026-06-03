import type { EducationEntry } from "../../types/resume";

type EducationPreviewSectionProps = {
  education: EducationEntry[];
};

export function EducationPreviewSection({
  education,
}: EducationPreviewSectionProps) {
  return (
    <section>
      <h2>Education</h2>

      {education.map((educationEntry, educationIndex) => (
        <div key={educationIndex}>
          <strong>{educationEntry.school || "School Name"}</strong>
          <p>{educationEntry.degree || "Degree"}</p>
          <p>{educationEntry.location || "Location"}</p>
          <p>{educationEntry.dateRange || "Date Range"}</p>
        </div>
      ))}
    </section>
  );
}