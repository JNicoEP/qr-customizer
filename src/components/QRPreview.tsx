import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QROptions } from '../types';

interface QRPreviewProps {
  data: string;
  options: QROptions;
  qrCodeRef: React.MutableRefObject<QRCodeStyling | null>;
}

export default function QRPreview({ data, options, qrCodeRef }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Initialize QR code
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

    const qrConfig: Record<string, unknown> = {
      width: 280,
      height: 280,
      data: data || 'https://example.com',
      margin: options.margin,
      dotsOptions,
      cornersSquareOptions: {
        type: options.cornerSquareType,
      },
      cornersDotOptions: {
        type: options.cornerDotType,
      },
      backgroundOptions: {
        color: options.backgroundColor,
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
  }, [data, options, qrCodeRef]);

  return (
    <div className="preview-container">
      <div className="preview-title">Vista previa</div>
      <div className="qr-canvas-wrapper">
        <div ref={containerRef} />
      </div>
    </div>
  );
}
