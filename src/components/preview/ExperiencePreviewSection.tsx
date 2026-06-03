import type { BulletedEntry } from "../../types/resume";

type ExperiencePreviewSectionProps = {
  experience: BulletedEntry[];
};

export function ExperiencePreviewSection({
  experience,
}: ExperiencePreviewSectionProps) {
  return (
    <section>
      <h2>Experience</h2>

      {experience.map((entry, entryIndex) => (
        <div key={entryIndex}>
          <strong>{entry.organization || "Organization"}</strong>
          <p>{entry.role || "Role"}</p>
          <p>{entry.location || "Location"}</p>
          <p>{entry.dateRange || "Date Range"}</p>
        </div>
      ))}
    </section>
  );
}