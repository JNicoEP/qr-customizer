import type { ContentType, ContentTypeOption } from '../types';

interface ContentTypeSelectorProps {
  selected: ContentType;
  onChange: (type: ContentType) => void;
  onNext: () => void;
}

const contentTypes: ContentTypeOption[] = [
  { type: 'url', label: 'URL / Enlace', icon: '🔗' },
  { type: 'text', label: 'Texto', icon: '📝' },
  { type: 'email', label: 'Email', icon: '✉️' },
  { type: 'phone', label: 'Teléfono', icon: '📱' },
  { type: 'wifi', label: 'WiFi', icon: '📶' },
  { type: 'vcard', label: 'Contacto', icon: '👤' },
];

export default function ContentTypeSelector({ selected, onChange, onNext }: ContentTypeSelectorProps) {
  return (
    <div className="animate-in">
      <div className="card">
        <h2 className="card__title">
          <span className="card__title-icon">📋</span>
          ¿Qué tipo de QR quieres crear?
        </h2>
        <div className="content-types">
          {contentTypes.map((ct) => (
            <button
              key={ct.type}
              className={`content-type-btn ${selected === ct.type ? 'content-type-btn--active' : ''}`}
              onClick={() => onChange(ct.type)}
            >
              <span className="content-type-btn__icon">{ct.icon}</span>
              {ct.label}
            </button>
          ))}
        </div>
      </div>
      <div className="nav-buttons">
        <button className="btn btn--primary btn--full" onClick={onNext}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
