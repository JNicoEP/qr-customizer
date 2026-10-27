interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="color-picker-group">
        <div className="color-picker__swatch" style={{ backgroundColor: color }}>
          <input
            type="color"
            className="color-picker__input"
            value={color}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="color-picker__hex"
          value={color}
          onChange={(e) => {
            const val = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
              onChange(val);
            }
          }}
          maxLength={7}
        />
      </div>
    </div>
  );
}
