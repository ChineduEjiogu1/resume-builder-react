import type { BulletedEntry } from "../../types/resume";
import type { BulletedEntryFieldName } from "./BulletedEntryEditor";
import { BulletedEntryEditor } from "./BulletedEntryEditor";

type BulletedSectionFormProps = {
  title: string;
  entries: BulletedEntry[];

  onUpdateEntry: (
    entryIndex: number,
    field: BulletedEntryFieldName,
    value: string
  ) => void;

  onAddEntry: () => void;

  onDeleteEntry: (entryIndex: number) => void;

  onUpdateBullet: (
    entryIndex: number,
    bulletIndex: number,
    value: string
  ) => void;

  onAddBullet: (entryIndex: number) => void;

  onDeleteBullet: (
    entryIndex: number,
    bulletIndex: number
  ) => void;
};


export function BulletedSectionForm({
  title,
  entries,
  onUpdateEntry,
  onAddEntry,
  onDeleteEntry,
  onUpdateBullet,
  onAddBullet,
  onDeleteBullet,
}: BulletedSectionFormProps) {
  return (
    <div>
      <h3>{title}</h3>

      {entries.map((entry, entryIndex) => (
        <div key={entryIndex}>
          <BulletedEntryEditor
            entry={entry}
            onUpdate={(field, value) =>
              onUpdateEntry(entryIndex, field, value)
            }
            onUpdateBullet={(bulletIndex, value) =>
              onUpdateBullet(entryIndex, bulletIndex, value)
            }
            onAddBullet={() => onAddBullet(entryIndex)}
            onDeleteBullet={(bulletIndex) =>
              onDeleteBullet(entryIndex, bulletIndex)
            }
          />

          <button
            type="button"
            disabled={entries.length <= 1}
            onClick={() => onDeleteEntry(entryIndex)}
          >
            Delete {title}
          </button>
        </div>
      ))}

      <button type="button" onClick={onAddEntry}>
        Add {title}
      </button>
    </div>
  );
}