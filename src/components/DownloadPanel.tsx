import QRCodeStyling from 'qr-code-styling';
import type { DownloadExtension, QROptions } from '../types';
import { downloadQR } from '../utils/exportWithFrame';
import { useState } from 'react';

interface DownloadPanelProps {
  qrCodeRef: React.MutableRefObject<QRCodeStyling | null>;
  previewContainerRef: React.RefObject<HTMLDivElement>;
  options: QROptions;
  onBack: () => void;
}

const formats: { ext: DownloadExtension; label: string; desc: string; cssClass: string; icon: string }[] = [
  {
    ext: 'png',
    label: 'PNG',
    desc: 'Alta resolución, compatible con marcos e imágenes',
    cssClass: 'download-card--png',
    icon: '🖼️',
  },
  {
    ext: 'svg',
    label: 'SVG',
    desc: 'Vectorial infinito, perfecto para imprenta y diseño',
    cssClass: 'download-card--svg',
    icon: '✏️',
  },
  {
    ext: 'jpeg',
    label: 'JPEG',
    desc: 'Archivo ligero, ideal para web, mailing y redes',
    cssClass: 'download-card--jpeg',
    icon: '📷',
  },
];

export default function DownloadPanel({
  qrCodeRef,
  previewContainerRef,
  options,
  onBack,
}: DownloadPanelProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (ext: DownloadExtension) => {
    try {
      setDownloading(ext);
      await downloadQR(qrCodeRef.current, previewContainerRef.current, options, ext);
    } finally {
      setTimeout(() => setDownloading(null), 800);
    }
  };

  return (
    <div className="animate-in">
      <div className="card">
        <h2 className="card__title">
          <span className="card__title-icon">📥</span>
          Descarga tu Código QR
        </h2>
        <p className="mb-16" style={{ fontSize: '15px' }}>
          Tu código QR está listo. Selecciona el formato de exportación preferido:
        </p>

        {options.frame.type !== 'none' && (
          <div className="badge-notification mb-16">
            🎉 Marco brutalista <strong>"{options.frame.text || options.frame.type}"</strong> activo e incluido en tu descarga PNG/JPEG.
          </div>
        )}

        <div className="download-grid">
          {formats.map((f) => (
            <button
              key={f.ext}
              className={`download-card ${f.cssClass} ${downloading === f.ext ? 'download-card--loading' : ''}`}
              onClick={() => handleDownload(f.ext)}
              disabled={downloading !== null}
            >
              <div className="download-card__icon">{downloading === f.ext ? '⏳' : f.icon}</div>
              <div className="download-card__format">{f.label}</div>
              <div className="download-card__desc">{f.desc}</div>
              <div className="download-card__action">
                {downloading === f.ext ? 'Generando...' : 'Descargar ➔'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="card card--mint">
        <h2 className="card__title" style={{ color: '#fff' }}>
          <span className="card__title-icon">💡</span>
          Recomendaciones de uso
        </h2>
        <ul className="download-tips-list">
          <li>
            <strong>Para Impresión física</strong>: Utiliza <strong>SVG</strong> para mantener bordes nítidos sin importar el tamaño (carteles, banners, folletos).
          </li>
          <li>
            <strong>Para Redes y Web</strong>: Utiliza <strong>PNG</strong> que preserva transparencias y alta nitidez.
          </li>
          <li>
            <strong>Comprobación antes de imprimir</strong>: Escanea el código con tu móvil desde la pantalla para verificar que la URL o datos sean los correctos.
          </li>
        </ul>
      </div>

      <div className="nav-buttons">
        <button className="btn btn--dark" onClick={onBack}>
          ← Modificar diseño
        </button>
      </div>
    </div>
  );
}
