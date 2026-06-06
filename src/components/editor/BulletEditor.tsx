// BulletEditor.tsx — edits one entry's bullets[]: a row per bullet, add/remove. Uses TextareaField.
import { TextField } from "../shared/TextField";

type BulletEditorProps = {
  bullets: string[];
  onUpdateBullet: (bulletIndex: number, value: string) => void;
  onAddBullet: () => void;
  onDeleteBullet: (bulletIndex: number) => void;
};

export function BulletEditor({
  bullets,
  onUpdateBullet,
  onAddBullet,
  onDeleteBullet,
}: BulletEditorProps) {
  return (
    <div>
      {bullets.map((bullet, bulletIndex) => (
        <div key={bulletIndex}>
          <TextField
            label={`Bullet ${bulletIndex + 1}`}
            value={bullet}
            placeholder="Describe an achievement or responsibility"
            onChange={(value) => onUpdateBullet(bulletIndex, value)}
          />

          <button
            type="button"
            disabled={bullets.length <= 1}
            onClick={() => onDeleteBullet(bulletIndex)}
          >
            Delete Bullet
          </button>
        </div>
      ))}

      <button type="button" onClick={onAddBullet}>
        Add Bullet
      </button>
    </div>
  );
}