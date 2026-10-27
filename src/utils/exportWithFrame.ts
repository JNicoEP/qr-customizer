import type { QROptions, DownloadExtension } from '../types';
import QRCodeStyling from 'qr-code-styling';

export async function downloadQR(
  qrCode: QRCodeStyling | null,
  containerEl: HTMLElement | null,
  options: QROptions,
  extension: DownloadExtension
): Promise<void> {
  if (!qrCode) return;

  // Si no tiene marco o es SVG, usamos la descarga estándar de la librería
  if (options.frame.type === 'none' || extension === 'svg') {
    qrCode.download({ name: 'qr-code', extension });
    return;
  }

  // Si tiene marco y es PNG o JPEG, generamos la composición completa en Canvas
  const qrCanvas = containerEl?.querySelector('canvas') as HTMLCanvasElement | null;
  if (!qrCanvas) {
    qrCode.download({ name: 'qr-code', extension });
    return;
  }

  const exportCanvas = document.createElement('canvas');
  const ctx = exportCanvas.getContext('2d');
  if (!ctx) {
    qrCode.download({ name: 'qr-code', extension });
    return;
  }

  const qrWidth = qrCanvas.width;
  const qrHeight = qrCanvas.height;
  const borderWidth = 6;
  const shadowOffset = 10;

  let totalWidth = qrWidth + 60;
  let totalHeight = qrHeight + 60;
  let qrOffsetY = 30;
  const qrOffsetX = 30;

  const frameType = options.frame.type;

  if (frameType === 'top-banner') {
    const bannerHeight = 70;
    totalHeight += bannerHeight;
    qrOffsetY += bannerHeight;
  } else if (frameType === 'bottom-bar') {
    const barHeight = 70;
    totalHeight += barHeight;
  } else if (frameType === 'polaroid') {
    const bottomHeight = 90;
    totalHeight += bottomHeight + 20;
    qrOffsetY += 20;
  } else if (frameType === 'brutalist-badge') {
    totalHeight += 20;
    qrOffsetY += 20;
  }

  exportCanvas.width = totalWidth + shadowOffset;
  exportCanvas.height = totalHeight + shadowOffset;

  // Fondo transparente o blanco por defecto para la exportación general
  if (options.transparentBackground && extension === 'png') {
    ctx.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  }

  // 1. Sombra sólida brutalista
  ctx.fillStyle = '#000000';
  ctx.fillRect(shadowOffset, shadowOffset, totalWidth, totalHeight);

  // 2. Fondo del marco de la tarjeta
  ctx.fillStyle = frameType === 'polaroid' ? '#FFFFFF' : options.backgroundColor || '#FFFFFF';
  ctx.fillRect(0, 0, totalWidth, totalHeight);

  // 3. Borde exterior negro grueso
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(borderWidth / 2, borderWidth / 2, totalWidth - borderWidth, totalHeight - borderWidth);

  // 4. Elementos específicos de cada marco
  ctx.font = 'bold 24px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (frameType === 'top-banner') {
    const bannerHeight = 70;
    // Barra superior
    ctx.fillStyle = options.frame.bgColor || '#FF90E8';
    ctx.fillRect(0, 0, totalWidth, bannerHeight);
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, totalWidth - borderWidth, bannerHeight);

    // Texto superior
    ctx.fillStyle = options.frame.textColor || '#000000';
    ctx.fillText(options.frame.text || '¡ESCANÉAME!', totalWidth / 2, bannerHeight / 2);
  } else if (frameType === 'bottom-bar') {
    const barHeight = 70;
    const barY = totalHeight - barHeight;
    // Barra inferior
    ctx.fillStyle = options.frame.bgColor || '#FF90E8';
    ctx.fillRect(0, barY, totalWidth, barHeight);
    ctx.beginPath();
    ctx.moveTo(0, barY);
    ctx.lineTo(totalWidth, barY);
    ctx.stroke();

    // Texto inferior
    ctx.fillStyle = options.frame.textColor || '#000000';
    ctx.fillText(options.frame.text || '¡ESCANÉAME!', totalWidth / 2, barY + barHeight / 2);
  } else if (frameType === 'polaroid') {
    // Texto estilo polaroid abajo
    ctx.fillStyle = options.frame.textColor || '#000000';
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    const textY = qrOffsetY + qrHeight + 45;
    ctx.fillText(options.frame.text || 'ESCANEA AQUÍ', totalWidth / 2, textY);
  }

  // 5. Dibujar el código QR
  ctx.drawImage(qrCanvas, qrOffsetX, qrOffsetY, qrWidth, qrHeight);

  // 6. Si es brutalist-badge, dibujar el sticker rotado arriba a la derecha
  if (frameType === 'brutalist-badge') {
    ctx.save();
    ctx.translate(totalWidth - 90, 30);
    ctx.rotate((8 * Math.PI) / 180);

    const badgeWidth = 140;
    const badgeHeight = 38;

    // Sombra del sticker
    ctx.fillStyle = '#000000';
    ctx.fillRect(-badgeWidth / 2 + 3, -badgeHeight / 2 + 3, badgeWidth, badgeHeight);

    // Fondo del sticker
    ctx.fillStyle = options.frame.bgColor || '#FFC900';
    ctx.fillRect(-badgeWidth / 2, -badgeHeight / 2, badgeWidth, badgeHeight);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeRect(-badgeWidth / 2, -badgeHeight / 2, badgeWidth, badgeHeight);

    // Texto del sticker
    ctx.fillStyle = options.frame.textColor || '#000000';
    ctx.font = 'bold 15px "Space Grotesk", sans-serif';
    ctx.fillText(options.frame.text || 'SCAN ME', 0, 1);
    ctx.restore();
  }

  // Descarga del canvas
  const mimeType = extension === 'jpeg' ? 'image/jpeg' : 'image/png';
  const dataUrl = exportCanvas.toDataURL(mimeType, 0.95);
  const link = document.createElement('a');
  link.download = `qr-code-brutal.${extension}`;
  link.href = dataUrl;
  link.click();
}
