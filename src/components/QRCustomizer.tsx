import { useState, useRef } from 'react';
import type {
  QROptions,
  DotType,
  CornerSquareType,
  CornerDotType,
  GradientType,
  FrameType,
  ErrorCorrectionLevel,
} from '../types';
import ColorPicker from './ColorPicker';
import { BRUTALIST_PRESETS } from '../utils/presets';
import { POPULAR_LOGOS } from '../utils/popularLogos';

interface QRCustomizerProps {
  options: QROptions;
  onChange: (options: QROptions) => void;
  onNext: () => void;
  onBack: () => void;
}

type TabType = 'presets' | 'shapes' | 'colors' | 'frames' | 'logo' | 'settings';

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

const frameTypes: { value: FrameType; label: string; icon: string }[] = [
  { value: 'none', label: 'Sin Marco', icon: '🚫' },
  { value: 'top-banner', label: 'Banner Superior', icon: '⬆️' },
  { value: 'bottom-bar', label: 'Barra Inferior', icon: '⬇️' },
  { value: 'polaroid', label: 'Polaroid', icon: '📷' },
  { value: 'brutalist-badge', label: 'Sticker Brutal', icon: '🏷️' },
];

const errorCorrectionLevels: { value: ErrorCorrectionLevel; label: string; desc: string }[] = [
  { value: 'L', label: 'Bajo (L)', desc: '7% corrección — Más simple y rápido' },
  { value: 'M', label: 'Medio (M)', desc: '15% corrección — Estándar recomendado' },
  { value: 'Q', label: 'Alto (Q)', desc: '25% corrección — Para impresión o exteriores' },
  { value: 'H', label: 'Máximo (H)', desc: '30% corrección — Ideal al usar logos grandes' },
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
  const [activeTab, setActiveTab] = useState<TabType>('presets');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyPreset = (presetOptions: Partial<QROptions>) => {
    onChange({
      ...options,
      ...presetOptions,
      corners: {
        ...options.corners,
        ...(presetOptions.corners || {}),
      },
      gradient: {
        ...options.gradient,
        ...(presetOptions.gradient || {}),
      },
      frame: {
        ...options.frame,
        ...(presetOptions.frame || {}),
      },
      logo: {
        ...options.logo,
        ...(presetOptions.logo || {}),
      },
    });
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        ...options,
        logo: { ...options.logo, src: reader.result as string, presetId: undefined },
      });
    };
    reader.readAsDataURL(file);
  };

  const selectPresetLogo = (logoUri: string, id: string) => {
    onChange({
      ...options,
      logo: {
        ...options.logo,
        src: logoUri,
        presetId: id,
        size: 0.35,
      },
      // Si agrega logo, aumentamos la corrección de error a H automáticamente
      errorCorrectionLevel: 'H',
    });
  };

  const removeLogo = () => {
    onChange({
      ...options,
      logo: { ...options.logo, src: '', presetId: undefined },
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="animate-in">
      {/* Sub-Tabs de navegación horizontal táctil */}
      <div className="customizer-tabs">
        <button
          className={`customizer-tab-btn ${activeTab === 'presets' ? 'customizer-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('presets')}
        >
          ✨ Plantillas
        </button>
        <button
          className={`customizer-tab-btn ${activeTab === 'shapes' ? 'customizer-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('shapes')}
        >
          ⬛ Formas
        </button>
        <button
          className={`customizer-tab-btn ${activeTab === 'colors' ? 'customizer-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          🎨 Colores
        </button>
        <button
          className={`customizer-tab-btn ${activeTab === 'frames' ? 'customizer-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('frames')}
        >
          🖼️ Marcos
        </button>
        <button
          className={`customizer-tab-btn ${activeTab === 'logo' ? 'customizer-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('logo')}
        >
          🏷️ Logo
        </button>
        <button
          className={`customizer-tab-btn ${activeTab === 'settings' ? 'customizer-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Ajustes
        </button>
      </div>

      {/* TAB 1: PRESETS */}
      {activeTab === 'presets' && (
        <div className="card card--yellow animate-in">
          <h2 className="card__title">
            <span className="card__title-icon">✨</span>
            Plantillas Brutalistas Rápidas
          </h2>
          <p className="card__subtitle mb-16">
            Aplica un estilo completo en un clic o combínalo con tus propios ajustes.
          </p>
          <div className="presets-grid">
            {BRUTALIST_PRESETS.map((preset) => (
              <div
                key={preset.id}
                className="preset-card"
                onClick={() => applyPreset(preset.options)}
              >
                <div className="preset-card__header">
                  <span className="preset-card__badge">{preset.badge}</span>
                  <span className="preset-card__name">{preset.name}</span>
                </div>
                <p className="preset-card__desc">{preset.description}</p>
                <button type="button" className="preset-card__apply-btn">
                  Aplicar estilo ➔
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FORMAS Y ESQUINAS */}
      {activeTab === 'shapes' && (
        <div className="animate-in">
          <div className="card">
            <h2 className="card__title">
              <span className="card__title-icon">⬛</span>
              Forma de los puntos interiores
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

          <div className="card">
            <h2 className="card__title">
              <span className="card__title-icon">🔲</span>
              Forma de las esquinas detectoras
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
            <label className="form-label mb-8">Punto central interior</label>
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
        </div>
      )}

      {/* TAB 3: COLORES Y DEGRADADOS */}
      {activeTab === 'colors' && (
        <div className="card card--lavender animate-in">
          <h2 className="card__title">
            <span className="card__title-icon">🎨</span>
            Colores y Degradados
          </h2>

          {/* Fondo transparente toggle */}
          <div className="toggle-group mb-12">
            <button
              className={`toggle ${options.transparentBackground ? 'toggle--active' : ''}`}
              onClick={() =>
                onChange({
                  ...options,
                  transparentBackground: !options.transparentBackground,
                })
              }
            >
              <div className="toggle__knob" />
            </button>
            <span className="toggle-label">Fondo transparente (sin color de fondo)</span>
          </div>

          {!options.transparentBackground && (
            <ColorPicker
              label="Color de fondo"
              color={options.backgroundColor}
              onChange={(color) => onChange({ ...options, backgroundColor: color })}
            />
          )}

          <div className="section-divider" />

          {/* Degradado toggle */}
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
            <span className="toggle-label">Usar degradado en los puntos</span>
          </div>

          {!options.gradient.enabled ? (
            <ColorPicker
              label="Color de los puntos"
              color={options.dotColor}
              onChange={(color) => onChange({ ...options, dotColor: color })}
            />
          ) : (
            <>
              <div className="color-duo-grid">
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
              </div>

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
                    <span className="slider-label">Ángulo de rotación</span>
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

          <div className="section-divider" />

          {/* Colores individuales de esquinas */}
          <div className="toggle-group mb-12">
            <button
              className={`toggle ${options.corners.customColors ? 'toggle--active' : ''}`}
              onClick={() =>
                onChange({
                  ...options,
                  corners: { ...options.corners, customColors: !options.corners.customColors },
                })
              }
            >
              <div className="toggle__knob" />
            </button>
            <span className="toggle-label">Personalizar colores de las esquinas por separado</span>
          </div>

          {options.corners.customColors && (
            <div className="color-duo-grid animate-in">
              <ColorPicker
                label="Marco exterior esquinas"
                color={options.corners.squareColor}
                onChange={(color) =>
                  onChange({
                    ...options,
                    corners: { ...options.corners, squareColor: color },
                  })
                }
              />
              <ColorPicker
                label="Punto interior esquinas"
                color={options.corners.dotColor}
                onChange={(color) =>
                  onChange({
                    ...options,
                    corners: { ...options.corners, dotColor: color },
                  })
                }
              />
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MARCOS Y STICKERS */}
      {activeTab === 'frames' && (
        <div className="card card--pink animate-in">
          <h2 className="card__title">
            <span className="card__title-icon">🖼️</span>
            Marcos y Llamadas a la Acción (CTA)
          </h2>
          <p className="card__subtitle mb-16">
            Agrega marcos con texto llamativo como "ESCANÉAME" para atraer más escaneos.
          </p>

          <div className="frames-grid mb-16">
            {frameTypes.map((ft) => (
              <button
                key={ft.value}
                className={`frame-btn ${options.frame.type === ft.value ? 'frame-btn--active' : ''}`}
                onClick={() =>
                  onChange({
                    ...options,
                    frame: { ...options.frame, type: ft.value },
                  })
                }
              >
                <span className="frame-btn__icon">{ft.icon}</span>
                <span className="frame-btn__label">{ft.label}</span>
              </button>
            ))}
          </div>

          {options.frame.type !== 'none' && (
            <div className="frame-custom-panel animate-in">
              <div className="form-group">
                <label className="form-label">Texto del marco</label>
                <input
                  type="text"
                  className="form-input"
                  maxLength={35}
                  value={options.frame.text}
                  placeholder="¡ESCANÉAME!"
                  onChange={(e) =>
                    onChange({
                      ...options,
                      frame: { ...options.frame, text: e.target.value },
                    })
                  }
                />
              </div>

              {options.frame.type !== 'polaroid' && (
                <div className="color-duo-grid">
                  <ColorPicker
                    label="Color del marco"
                    color={options.frame.bgColor}
                    onChange={(color) =>
                      onChange({
                        ...options,
                        frame: { ...options.frame, bgColor: color },
                      })
                    }
                  />
                  <ColorPicker
                    label="Color del texto"
                    color={options.frame.textColor}
                    onChange={(color) =>
                      onChange({
                        ...options,
                        frame: { ...options.frame, textColor: color },
                      })
                    }
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: LOGO Y MARCA */}
      {activeTab === 'logo' && (
        <div className="card animate-in">
          <h2 className="card__title">
            <span className="card__title-icon">🏷️</span>
            Logos e Iconos Populares
          </h2>
          <p className="card__subtitle mb-16">
            Selecciona una red o sube el logo de tu empresa o proyecto.
          </p>

          {/* Quick Popular Icons */}
          <label className="form-label mb-8">Iconos rápidos:</label>
          <div className="preset-logos-grid mb-16">
            {POPULAR_LOGOS.map((logo) => (
              <button
                key={logo.id}
                type="button"
                className={`preset-logo-btn ${
                  options.logo.presetId === logo.id ? 'preset-logo-btn--active' : ''
                }`}
                onClick={() => selectPresetLogo(logo.svgDataUri, logo.id)}
              >
                <img src={logo.svgDataUri} alt={logo.name} className="preset-logo-btn__img" />
                <span className="preset-logo-btn__name">{logo.name}</span>
              </button>
            ))}
          </div>

          <div className="section-divider" />

          {/* Custom File Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleCustomImageUpload}
          />

          {!options.logo.src ? (
            <div className="logo-upload" onClick={() => fileInputRef.current?.click()}>
              <div className="logo-upload__icon">📤</div>
              <div className="logo-upload__text">O sube tu propio logo / imagen personalizada</div>
              <div className="logo-upload__hint">PNG, JPG o SVG transparente recomendado</div>
            </div>
          ) : (
            <div className="animate-in">
              <div className="logo-preview mb-16">
                <img src={options.logo.src} alt="Logo" className="logo-preview__img" />
                <div className="logo-preview__info">
                  <div className="logo-preview__name">
                    {options.logo.presetId ? 'Icono prediseñado activo' : 'Imagen personalizada activa'}
                  </div>
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
                  max="45"
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
                  <span className="slider-label">Margen alrededor del logo</span>
                  <span className="slider-value">{options.logo.margin}px</span>
                </div>
                <input
                  type="range"
                  className="slider-input"
                  min="0"
                  max="25"
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
                      logo: {
                        ...options.logo,
                        hideBackgroundDots: !options.logo.hideBackgroundDots,
                      },
                    })
                  }
                >
                  <div className="toggle__knob" />
                </button>
                <span className="toggle-label">Ocultar puntos QR detrás del logo</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: AJUSTES Y CALIDAD */}
      {activeTab === 'settings' && (
        <div className="card card--mint animate-in">
          <h2 className="card__title" style={{ color: '#FFFFFF' }}>
            <span className="card__title-icon">⚙️</span>
            Calidad, Tolerancia y Dimensiones
          </h2>

          <div className="form-group">
            <label className="form-label" style={{ color: '#FFFFFF' }}>
              Nivel de corrección de errores (Lectura dañada / con logo):
            </label>
            <div className="ecl-grid">
              {errorCorrectionLevels.map((ecl) => (
                <button
                  key={ecl.value}
                  type="button"
                  className={`ecl-card ${
                    options.errorCorrectionLevel === ecl.value ? 'ecl-card--active' : ''
                  }`}
                  onClick={() => onChange({ ...options, errorCorrectionLevel: ecl.value })}
                >
                  <div className="ecl-card__badge">{ecl.label}</div>
                  <div className="ecl-card__desc">{ecl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="section-divider" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} />

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label" style={{ color: '#FFFFFF' }}>
                Resolución de exportación
              </span>
              <span className="slider-value">{options.width} × {options.width} px</span>
            </div>
            <input
              type="range"
              className="slider-input"
              min="300"
              max="1200"
              step="50"
              value={options.width}
              onChange={(e) => onChange({ ...options, width: Number(e.target.value) })}
            />
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label" style={{ color: '#FFFFFF' }}>
                Zona de silencio (Margen exterior)
              </span>
              <span className="slider-value">{options.margin} px</span>
            </div>
            <input
              type="range"
              className="slider-input"
              min="0"
              max="40"
              value={options.margin}
              onChange={(e) => onChange({ ...options, margin: Number(e.target.value) })}
            />
          </div>
        </div>
      )}

      {/* Botones de navegación inferiores */}
      <div className="nav-buttons">
        <button className="btn btn--dark" onClick={onBack}>
          ← Atrás
        </button>
        <button className="btn btn--primary" onClick={onNext}>
          Continuar a Descargar →
        </button>
      </div>
    </div>
  );
}
