import type { QROptions, DotType, CornerSquareType, CornerDotType, GradientType } from '../types';
import ColorPicker from './ColorPicker';
import { useRef } from 'react';

interface QRCustomizerProps {
  options: QROptions;
  onChange: (options: QROptions) => void;
  onNext: () => void;
  onBack: () => void;
}

const dotTypes: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Cuadrado' },
  { value: 'rounded', label: 'Redondeado' },
  { value: 'dots', label: 'Puntos' },
  { value: 'classy', label: 'Clásico' },
  { value: 'classy-rounded', label: 'Clásico R.' },
  { value: 'extra-rounded', label: 'Extra R.' },
];

const cornerSquareTypes: { value: CornerSquareType; label: string }[] = [
  { value: 'square', label: 'Cuadrado' },
  { value: 'dot', label: 'Punto' },
  { value: 'extra-rounded', label: 'Redondeado' },
];

const cornerDotTypes: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: 'Cuadrado' },
  { value: 'dot', label: 'Punto' },
];

function DotPreview({ type }: { type: DotType }) {
  const shapes: Record<DotType, React.ReactNode> = {
    square: (
      <svg viewBox="0 0 36 36">
        <rect x="2" y="2" width="10" height="10" fill="#000" />
        <rect x="14" y="2" width="10" height="10" fill="#000" />
        <rect x="2" y="14" width="10" height="10" fill="#000" />
        <rect x="24" y="14" width="10" height="10" fill="#000" />
        <rect x="14" y="24" width="10" height="10" fill="#000" />
      </svg>
    ),
    rounded: (
      <svg viewBox="0 0 36 36">
        <rect x="2" y="2" width="10" height="10" rx="2" fill="#000" />
        <rect x="14" y="2" width="10" height="10" rx="2" fill="#000" />
        <rect x="2" y="14" width="10" height="10" rx="2" fill="#000" />
        <rect x="24" y="14" width="10" height="10" rx="2" fill="#000" />
        <rect x="14" y="24" width="10" height="10" rx="2" fill="#000" />
      </svg>
    ),
    dots: (
      <svg viewBox="0 0 36 36">
        <circle cx="7" cy="7" r="5" fill="#000" />
        <circle cx="19" cy="7" r="5" fill="#000" />
        <circle cx="7" cy="19" r="5" fill="#000" />
        <circle cx="29" cy="19" r="5" fill="#000" />
        <circle cx="19" cy="29" r="5" fill="#000" />
      </svg>
    ),
    classy: (
      <svg viewBox="0 0 36 36">
        <rect x="2" y="2" width="10" height="10" fill="#000" />
        <rect x="14" y="6" width="10" height="6" fill="#000" />
        <rect x="6" y="14" width="6" height="10" fill="#000" />
        <rect x="24" y="14" width="10" height="10" fill="#000" />
        <rect x="14" y="24" width="10" height="10" fill="#000" />
      </svg>
    ),
    'classy-rounded': (
      <svg viewBox="0 0 36 36">
        <rect x="2" y="2" width="10" height="10" rx="3" fill="#000" />
        <rect x="14" y="6" width="10" height="6" rx="3" fill="#000" />
        <rect x="6" y="14" width="6" height="10" rx="3" fill="#000" />
        <rect x="24" y="14" width="10" height="10" rx="3" fill="#000" />
        <rect x="14" y="24" width="10" height="10" rx="3" fill="#000" />
      </svg>
    ),
    'extra-rounded': (
      <svg viewBox="0 0 36 36">
        <rect x="2" y="2" width="10" height="10" rx="5" fill="#000" />
        <rect x="14" y="2" width="10" height="10" rx="5" fill="#000" />
        <rect x="2" y="14" width="10" height="10" rx="5" fill="#000" />
        <rect x="24" y="14" width="10" height="10" rx="5" fill="#000" />
        <rect x="14" y="24" width="10" height="10" rx="5" fill="#000" />
      </svg>
    ),
  };
  return <div className="option-btn__preview">{shapes[type]}</div>;
}

export default function QRCustomizer({ options, onChange, onNext, onBack }: QRCustomizerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        ...options,
        logo: { ...options.logo, src: reader.result as string },
      });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onChange({
      ...options,
      logo: { ...options.logo, src: '' },
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="animate-in">
      {/* DOT STYLE */}
      <div className="card">
        <h2 className="card__title">
          <span className="card__title-icon">⬛</span>
          Estilo de los puntos
        </h2>
        <div className="option-grid">
          {dotTypes.map((dt) => (
            <button
              key={dt.value}
              className={`option-btn ${options.dotType === dt.value ? 'option-btn--active' : ''}`}
              onClick={() => onChange({ ...options, dotType: dt.value })}
            >
              <DotPreview type={dt.value} />
              {dt.label}
            </button>
          ))}
        </div>
      </div>

      {/* CORNER STYLES */}
      <div className="card">
        <h2 className="card__title">
          <span className="card__title-icon">🔲</span>
          Estilo de las esquinas
        </h2>
        <label className="form-label mb-8">Cuadrado exterior</label>
        <div className="option-grid mb-16">
          {cornerSquareTypes.map((cs) => (
            <button
              key={cs.value}
              className={`option-btn ${options.cornerSquareType === cs.value ? 'option-btn--active' : ''}`}
              onClick={() => onChange({ ...options, cornerSquareType: cs.value })}
            >
              {cs.label}
            </button>
          ))}
        </div>
        <label className="form-label mb-8">Punto interior</label>
        <div className="option-grid option-grid--2">
          {cornerDotTypes.map((cd) => (
            <button
              key={cd.value}
              className={`option-btn ${options.cornerDotType === cd.value ? 'option-btn--active' : ''}`}
              onClick={() => onChange({ ...options, cornerDotType: cd.value })}
            >
              {cd.label}
            </button>
          ))}
        </div>
      </div>

      {/* COLORS */}
      <div className="card card--lavender">
        <h2 className="card__title">
          <span className="card__title-icon">🎨</span>
          Colores
        </h2>

        {/* Gradient toggle */}
        <div className="toggle-group mb-16">
          <button
            className={`toggle ${options.gradient.enabled ? 'toggle--active' : ''}`}
            onClick={() =>
              onChange({
                ...options,
                gradient: { ...options.gradient, enabled: !options.gradient.enabled },
              })
            }
          >
            <div className="toggle__knob" />
          </button>
          <span className="toggle-label">Usar degradado</span>
        </div>

        {!options.gradient.enabled ? (
          <ColorPicker
            label="Color de los puntos"
            color={options.dotColor}
            onChange={(color) => onChange({ ...options, dotColor: color })}
          />
        ) : (
          <>
            <ColorPicker
              label="Color inicial"
              color={options.gradient.colorFrom}
              onChange={(color) =>
                onChange({
                  ...options,
                  gradient: { ...options.gradient, colorFrom: color },
                })
              }
            />
            <ColorPicker
              label="Color final"
              color={options.gradient.colorTo}
              onChange={(color) =>
                onChange({
                  ...options,
                  gradient: { ...options.gradient, colorTo: color },
                })
              }
            />

            <div className="form-group">
              <label className="form-label">Tipo de degradado</label>
              <div className="option-grid option-grid--2">
                {(['linear', 'radial'] as GradientType[]).map((gt) => (
                  <button
                    key={gt}
                    className={`option-btn ${options.gradient.type === gt ? 'option-btn--active' : ''}`}
                    onClick={() =>
                      onChange({
                        ...options,
                        gradient: { ...options.gradient, type: gt },
                      })
                    }
                  >
                    {gt === 'linear' ? 'Lineal' : 'Radial'}
                  </button>
                ))}
              </div>
            </div>

            {options.gradient.type === 'linear' && (
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Rotación</span>
                  <span className="slider-value">{options.gradient.rotation}°</span>
                </div>
                <input
                  type="range"
                  className="slider-input"
                  min="0"
                  max="360"
                  value={options.gradient.rotation}
                  onChange={(e) =>
                    onChange({
                      ...options,
                      gradient: { ...options.gradient, rotation: Number(e.target.value) },
                    })
                  }
                />
              </div>
            )}

            <div
              className="gradient-preview"
              style={{
                background:
                  options.gradient.type === 'linear'
                    ? `linear-gradient(${options.gradient.rotation}deg, ${options.gradient.colorFrom}, ${options.gradient.colorTo})`
                    : `radial-gradient(circle, ${options.gradient.colorFrom}, ${options.gradient.colorTo})`,
              }}
            />
          </>
        )}

        <ColorPicker
          label="Color de fondo"
          color={options.backgroundColor}
          onChange={(color) => onChange({ ...options, backgroundColor: color })}
        />
      </div>

      {/* LOGO */}
      <div className="card">
        <h2 className="card__title">
          <span className="card__title-icon">🖼️</span>
          Logo / Imagen
        </h2>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />

        {!options.logo.src ? (
          <div className="logo-upload" onClick={() => fileInputRef.current?.click()}>
            <div className="logo-upload__icon">📤</div>
            <div className="logo-upload__text">Haz clic para subir una imagen</div>
            <div className="logo-upload__hint">PNG, JPG o SVG — Max 2MB</div>
          </div>
        ) : (
          <>
            <div className="logo-preview mb-16">
              <img src={options.logo.src} alt="Logo" className="logo-preview__img" />
              <div className="logo-preview__info">
                <div className="logo-preview__name">Imagen cargada</div>
              </div>
              <button className="logo-preview__remove" onClick={removeLogo}>
                ✕ Quitar
              </button>
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Tamaño del logo</span>
                <span className="slider-value">{Math.round(options.logo.size * 100)}%</span>
              </div>
              <input
                type="range"
                className="slider-input"
                min="15"
                max="50"
                value={options.logo.size * 100}
                onChange={(e) =>
                  onChange({
                    ...options,
                    logo: { ...options.logo, size: Number(e.target.value) / 100 },
                  })
                }
              />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Margen del logo</span>
                <span className="slider-value">{options.logo.margin}px</span>
              </div>
              <input
                type="range"
                className="slider-input"
                min="0"
                max="30"
                value={options.logo.margin}
                onChange={(e) =>
                  onChange({
                    ...options,
                    logo: { ...options.logo, margin: Number(e.target.value) },
                  })
                }
              />
            </div>

            <div className="toggle-group">
              <button
                className={`toggle ${options.logo.hideBackgroundDots ? 'toggle--active' : ''}`}
                onClick={() =>
                  onChange({
                    ...options,
                    logo: { ...options.logo, hideBackgroundDots: !options.logo.hideBackgroundDots },
                  })
                }
              >
                <div className="toggle__knob" />
              </button>
              <span className="toggle-label">Ocultar puntos detrás del logo</span>
            </div>
          </>
        )}
      </div>

      {/* SIZE */}
      <div className="card card--yellow">
        <h2 className="card__title">
          <span className="card__title-icon">📐</span>
          Tamaño
        </h2>

        <div className="slider-group">
          <div className="slider-header">
            <span className="slider-label">Ancho</span>
            <span className="slider-value">{options.width}px</span>
          </div>
          <input
            type="range"
            className="slider-input"
            min="200"
            max="1000"
            step="50"
            value={options.width}
            onChange={(e) => onChange({ ...options, width: Number(e.target.value) })}
          />
        </div>

        <div className="slider-group">
          <div className="slider-header">
            <span className="slider-label">Margen</span>
            <span className="slider-value">{options.margin}px</span>
          </div>
          <input
            type="range"
            className="slider-input"
            min="0"
            max="50"
            value={options.margin}
            onChange={(e) => onChange({ ...options, margin: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn--dark" onClick={onBack}>
          ← Atrás
        </button>
        <button className="btn btn--primary" onClick={onNext}>
          Descargar →
        </button>
      </div>
    </div>
  );
}
