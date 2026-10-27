import QRCodeStyling from 'qr-code-styling';
import type { DownloadExtension } from '../types';

interface DownloadPanelProps {
  qrCodeRef: React.MutableRefObject<QRCodeStyling | null>;
  onBack: () => void;
}

const formats: { ext: DownloadExtension; label: string; desc: string; cssClass: string; icon: string }[] = [
  { ext: 'png', label: 'PNG', desc: 'Alta calidad, fondo transparente', cssClass: 'download-card--png', icon: '🖼️' },
  { ext: 'svg', label: 'SVG', desc: 'Vectorial, escalable sin perder calidad', cssClass: 'download-card--svg', icon: '✏️' },
  { ext: 'jpeg', label: 'JPEG', desc: 'Comprimido, ideal para web', cssClass: 'download-card--jpeg', icon: '📷' },
];

export default function DownloadPanel({ qrCodeRef, onBack }: DownloadPanelProps) {
  const handleDownload = (ext: DownloadExtension) => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({ name: 'qr-code', extension: ext });
    }
  };

  return (
    <div className="animate-in">
      <div className="card">
        <h2 className="card__title">
          <span className="card__title-icon">📥</span>
          Descarga tu QR
        </h2>
        <p style={{ marginBottom: '20px', fontSize: '15px' }}>
          Elige el formato que prefieras para descargar tu código QR personalizado.
        </p>
        <div className="download-grid">
          {formats.map((f) => (
            <button
              key={f.ext}
              className={`download-card ${f.cssClass}`}
              onClick={() => handleDownload(f.ext)}
            >
              <div className="download-card__icon">{f.icon}</div>
              <div className="download-card__format">{f.label}</div>
              <div className="download-card__desc">{f.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card card--mint">
        <h2 className="card__title" style={{ color: '#fff' }}>
          <span className="card__title-icon">💡</span>
          Consejos
        </h2>
        <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
          <li><strong>PNG</strong> — Perfecto para redes sociales y presentaciones.</li>
          <li><strong>SVG</strong> — Ideal para impresión en cualquier tamaño.</li>
          <li><strong>JPEG</strong> — Más ligero, bueno para emails y documentos.</li>
        </ul>
      </div>

      <div className="nav-buttons">
        <button className="btn btn--dark" onClick={onBack}>
          ← Volver a editar
        </button>
      </div>
    </div>
  );
}
