import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QROptions } from '../types';

interface QRPreviewProps {
  data: string;
  options: QROptions;
  qrCodeRef: React.MutableRefObject<QRCodeStyling | null>;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function QRPreview({ data, options, qrCodeRef, containerRef: externalContainerRef }: QRPreviewProps) {
  const localContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = externalContainerRef || localContainerRef;
  const initialized = useRef(false);

  // Initialize and update QR code
  useEffect(() => {
    if (!containerRef.current) return;

    const dotsOptions: Record<string, unknown> = {
      type: options.dotType,
    };

    if (options.gradient.enabled) {
      dotsOptions.gradient = {
        type: options.gradient.type,
        rotation: (options.gradient.rotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: options.gradient.colorFrom },
          { offset: 1, color: options.gradient.colorTo },
        ],
      };
    } else {
      dotsOptions.color = options.dotColor;
    }

    const cornersSquareOptions: Record<string, unknown> = {
      type: options.cornerSquareType,
    };
    if (options.corners.customColors) {
      cornersSquareOptions.color = options.corners.squareColor;
    } else if (!options.gradient.enabled) {
      cornersSquareOptions.color = options.dotColor;
    }

    const cornersDotOptions: Record<string, unknown> = {
      type: options.cornerDotType,
    };
    if (options.corners.customColors) {
      cornersDotOptions.color = options.corners.dotColor;
    } else if (!options.gradient.enabled) {
      cornersDotOptions.color = options.dotColor;
    }

    const qrConfig: Record<string, unknown> = {
      width: 270,
      height: 270,
      data: data || 'https://example.com',
      margin: options.margin,
      qrOptions: {
        errorCorrectionLevel: options.errorCorrectionLevel,
      },
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      backgroundOptions: {
        color: options.transparentBackground ? 'transparent' : options.backgroundColor,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: options.logo.margin,
        imageSize: options.logo.size,
        hideBackgroundDots: options.logo.hideBackgroundDots,
      },
    };

    if (options.logo.src) {
      qrConfig.image = options.logo.src;
    }

    if (!initialized.current) {
      const qr = new QRCodeStyling(qrConfig as ConstructorParameters<typeof QRCodeStyling>[0]);
      qrCodeRef.current = qr;
      containerRef.current.innerHTML = '';
      qr.append(containerRef.current);
      initialized.current = true;
    } else if (qrCodeRef.current) {
      qrCodeRef.current.update(qrConfig as Parameters<QRCodeStyling['update']>[0]);
    }
  }, [data, options, qrCodeRef, containerRef]);

  const frame = options.frame;

  return (
    <div className="preview-container">
      <div className="preview-title">
        <span>VISTA PREVIA EN VIVO</span>
        <span className="preview-badge-live">● EN VIVO</span>
      </div>

      <div className={`qr-display-card qr-frame-mode--${frame.type}`}>
        {/* Frame Top Banner */}
        {frame.type === 'top-banner' && (
          <div
            className="qr-frame-banner qr-frame-banner--top"
            style={{ backgroundColor: frame.bgColor, color: frame.textColor }}
          >
            {frame.text || '¡ESCANÉAME!'}
          </div>
        )}

        {/* Frame Brutalist Badge (Sticker) */}
        {frame.type === 'brutalist-badge' && (
          <div
            className="qr-frame-sticker"
            style={{ backgroundColor: frame.bgColor, color: frame.textColor }}
          >
            {frame.text || 'SCAN ME'}
          </div>
        )}

        {/* QR canvas target */}
        <div
          className={`qr-canvas-wrapper ${options.transparentBackground ? 'qr-canvas-wrapper--transparent' : ''}`}
          style={{
            backgroundColor: options.transparentBackground
              ? undefined
              : frame.type === 'polaroid'
              ? '#FFFFFF'
              : options.backgroundColor,
          }}
        >
          <div ref={containerRef} className="qr-mount-point" />
        </div>

        {/* Frame Bottom Bar */}
        {frame.type === 'bottom-bar' && (
          <div
            className="qr-frame-banner qr-frame-banner--bottom"
            style={{ backgroundColor: frame.bgColor, color: frame.textColor }}
          >
            {frame.text || '¡ESCANÉAME!'}
          </div>
        )}

        {/* Frame Polaroid */}
        {frame.type === 'polaroid' && (
          <div className="qr-frame-polaroid-caption" style={{ color: frame.textColor }}>
            {frame.text || 'ESCANEA EL CÓDIGO'}
          </div>
        )}
      </div>

      <div className="preview-quick-specs">
        <span className="spec-tag">
          {options.dotType.toUpperCase()}
        </span>
        <span className="spec-tag">
          CORR: {options.errorCorrectionLevel}
        </span>
        {options.logo.src && <span className="spec-tag spec-tag--pink">CON LOGO</span>}
        {frame.type !== 'none' && <span className="spec-tag spec-tag--yellow">MARCO ACTIVO</span>}
      </div>
    </div>
  );
}
