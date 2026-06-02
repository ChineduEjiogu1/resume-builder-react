// TextField.tsx — reusable labeled <input> (your renderArrayTextInput, as a typed component).

type TextFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function TextField({
    label,
    value,
    placeholder,
    onChange
}: TextFieldProps) {
    return (
        <label>
            <span>{label}</span>
            <input type="text" 
            value = {value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            />
        </label>
    );
}