export type ContentType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard';

export type DotType = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';
export type GradientType = 'linear' | 'radial';
export type DownloadExtension = 'png' | 'svg' | 'jpeg';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type FrameType = 'none' | 'top-banner' | 'bottom-bar' | 'polaroid' | 'brutalist-badge';

export interface ContentTypeOption {
  type: ContentType;
  label: string;
  icon: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface WiFiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  title: string;
  website: string;
}

export interface GradientConfig {
  enabled: boolean;
  type: GradientType;
  rotation: number;
  colorFrom: string;
  colorTo: string;
}

export interface CornersConfig {
  customColors: boolean;
  squareColor: string;
  dotColor: string;
}

export interface FrameConfig {
  type: FrameType;
  text: string;
  bgColor: string;
  textColor: string;
}

export interface LogoConfig {
  src: string;
  presetId?: string;
  size: number;
  margin: number;
  hideBackgroundDots: boolean;
}

export interface QROptions {
  width: number;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  dotType: DotType;
  dotColor: string;
  backgroundColor: string;
  transparentBackground: boolean;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  corners: CornersConfig;
  gradient: GradientConfig;
  logo: LogoConfig;
  frame: FrameConfig;
}

export interface AppState {
  currentStep: number;
  contentType: ContentType;
  contentData: string;
  emailData: EmailData;
  wifiData: WiFiData;
  vcardData: VCardData;
  phoneData: string;
  qrOptions: QROptions;
}

export interface BrutalistPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  options: Partial<QROptions>;
}
