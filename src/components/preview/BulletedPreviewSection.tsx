import type { BulletedEntry } from "../../types/resume";

type BulletedPreviewSectionProps = {
  title: string;
  entries: BulletedEntry[];
};

export function BulletedPreviewSection({
  title,
  entries,
}: BulletedPreviewSectionProps) {
  return (
    <section>
      <h2>{title}</h2>

      {entries.map((entry, index) => (
        <div key={index}>
          <strong>{entry.organization || "organization"}</strong>
          <p>{entry.role || "Role"}</p>
          <p>{entry.location || "Location"}</p>
          <p>{entry.dateRange || "Date Range"}</p>

          <ul>
            {entry.bullets.map((bullet, bulletIndex) => (
              <li key={bulletIndex}>{bullet || "bullet point"}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
