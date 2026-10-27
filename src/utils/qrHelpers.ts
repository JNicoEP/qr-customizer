import type { EmailData, WiFiData, VCardData } from '../types';

export function encodeEmailData(data: EmailData): string {
  const params: string[] = [];
  if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
  if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${data.to}${query}`;
}

export function encodePhoneData(phone: string): string {
  return `tel:${phone}`;
}

export function encodeWiFiData(data: WiFiData): string {
  const encryption = data.encryption === 'nopass' ? 'nopass' : data.encryption;
  const password = data.encryption === 'nopass' ? '' : data.password;
  return `WIFI:T:${encryption};S:${escapeWiFi(data.ssid)};P:${escapeWiFi(password)};;`;
}

function escapeWiFi(str: string): string {
  return str.replace(/([\\;,:"'])/g, '\\$1');
}

export function encodeVCardData(data: VCardData): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.firstName} ${data.lastName}`,
  ];
  if (data.phone) lines.push(`TEL;TYPE=CELL:${data.phone}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.company) lines.push(`ORG:${data.company}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.website) lines.push(`URL:${data.website}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

export function getQRData(
  contentType: string,
  contentData: string,
  emailData: EmailData,
  phoneData: string,
  wifiData: WiFiData,
  vcardData: VCardData
): string {
  switch (contentType) {
    case 'email':
      return encodeEmailData(emailData);
    case 'phone':
      return encodePhoneData(phoneData);
    case 'wifi':
      return encodeWiFiData(wifiData);
    case 'vcard':
      return encodeVCardData(vcardData);
    case 'url':
    case 'text':
    default:
      return contentData || 'https://example.com';
  }
}
