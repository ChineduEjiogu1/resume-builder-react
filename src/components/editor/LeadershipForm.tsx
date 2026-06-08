import { useResume } from "../../state/useResume";
import { BulletedSectionForm } from "./BulletedSectionForm";

export function LeadershipForm() {
  const { resume, dispatch } = useResume();

  return (
    <BulletedSectionForm
      title="Leadership"
      entries={resume.leadership}
      onUpdateEntry={(entryIndex, field, value) =>
        dispatch({
          type: "update_leadership",
          index: entryIndex,
          field,
          value,
        })
      }
      onAddEntry={() =>
        dispatch({
          type: "add_leadership",
        })
      }
      onDeleteEntry={(entryIndex) =>
        dispatch({
          type: "delete_leadership",
          index: entryIndex,
        })
      }
      onUpdateBullet={(entryIndex, bulletIndex, value) =>
        dispatch({
          type: "update_leadership_bullet",
          entryIndex,
          bulletIndex,
          value,
        })
      }
      onAddBullet={(entryIndex) =>
        dispatch({
          type: "add_leadership_bullet",
          entryIndex,
        })
      }
      onDeleteBullet={(entryIndex, bulletIndex) =>
        dispatch({
          type: "delete_leadership_bullet",
          entryIndex,
          bulletIndex,
        })
      }
    />
  );
}
