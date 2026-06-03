import { useResume } from "../../state/useResume";
import { EntryEditor } from "./EntryEditor";

export function ExperienceForm() {
  const { resume, dispatch } = useResume();

  return (
    <div>
      <h3>Experience</h3>

      {resume.experience.map((entry, entryIndex) => (
        <div key={entryIndex}>
          <EntryEditor
            entry={entry}
            onUpdate={(field, value) =>
              dispatch({
                type: "update_experience",
                index: entryIndex,
                field,
                value,
              })
            }
          />

          <button
            type="button"
            disabled={resume.experience.length <= 1}
            onClick={() =>
              dispatch({
                type: "delete_experience",
                index: entryIndex,
              })
            }
          >
            Delete Experience
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          dispatch({
            type: "add_experience",
          })
        }
      >
        Add Experience
      </button>
    </div>
  );
}
