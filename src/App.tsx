import { useState, useRef, useMemo } from 'react';
import QRCodeStyling from 'qr-code-styling';
import Header from './components/Header';
import StepSelector from './components/StepSelector';
import ContentTypeSelector from './components/ContentTypeSelector';
import ContentForm from './components/ContentForm';
import QRCustomizer from './components/QRCustomizer';
import QRPreview from './components/QRPreview';
import DownloadPanel from './components/DownloadPanel';
import SeoFaq from './components/SeoFaq';
import Footer from './components/Footer';
import { getQRData } from './utils/qrHelpers';
import type { AppState } from './types';

const initialState: AppState = {
  currentStep: 1,
  contentType: 'url',
  contentData: 'https://example.com',
  emailData: { to: '', subject: '', body: '' },
  wifiData: { ssid: '', password: '', encryption: 'WPA' },
  vcardData: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    title: '',
    website: '',
  },
  phoneData: '',
  qrOptions: {
    width: 400,
    margin: 10,
    errorCorrectionLevel: 'Q',
    dotType: 'square',
    dotColor: '#000000',
    backgroundColor: '#FFFFFF',
    transparentBackground: false,
    cornerSquareType: 'square',
    cornerDotType: 'square',
    corners: {
      customColors: false,
      squareColor: '#000000',
      dotColor: '#000000',
    },
    gradient: {
      enabled: false,
      type: 'linear',
      rotation: 0,
      colorFrom: '#000000',
      colorTo: '#FF90E8',
    },
    logo: {
      src: '',
      presetId: undefined,
      size: 0.35,
      margin: 8,
      hideBackgroundDots: true,
    },
    frame: {
      type: 'none',
      text: '¡ESCANÉAME!',
      bgColor: '#FF90E8',
      textColor: '#000000',
    },
  },
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const previewMountRef = useRef<HTMLDivElement>(null);

  const qrData = useMemo(
    () =>
      getQRData(
        state.contentType,
        state.contentData,
        state.emailData,
        state.phoneData,
        state.wifiData,
        state.vcardData
      ),
    [
      state.contentType,
      state.contentData,
      state.emailData,
      state.phoneData,
      state.wifiData,
      state.vcardData,
    ]
  );

  const setStep = (step: number) => {
    setState((s) => ({ ...s, currentStep: step }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__tag">DISEÑO NEO-BRUTALISTA • 100% GRATUITO</div>
        <h1 className="hero__title">CREA TU QR PERSONALIZADO</h1>
        <p className="hero__subtitle">
          Cambia la forma de los puntos, añade tu logo o redes, degradados únicos y marcos "Escanéame" de alto impacto. Descarga en PNG, SVG y JPEG sin registro.
        </p>
      </section>

      {/* App Main Area */}
      <div className="app-layout">
        {/* Left: Controls */}
        <main className="controls-panel">
          <StepSelector currentStep={state.currentStep} onStepChange={setStep} />

          {state.currentStep === 1 && (
            <ContentTypeSelector
              selected={state.contentType}
              onChange={(type) => setState((s) => ({ ...s, contentType: type }))}
              onNext={() => setStep(2)}
            />
          )}

          {state.currentStep === 2 && (
            <ContentForm
              contentType={state.contentType}
              contentData={state.contentData}
              emailData={state.emailData}
              phoneData={state.phoneData}
              wifiData={state.wifiData}
              vcardData={state.vcardData}
              onContentDataChange={(val) => setState((s) => ({ ...s, contentData: val }))}
              onEmailDataChange={(data) => setState((s) => ({ ...s, emailData: data }))}
              onPhoneDataChange={(val) => setState((s) => ({ ...s, phoneData: val }))}
              onWifiDataChange={(data) => setState((s) => ({ ...s, wifiData: data }))}
              onVcardDataChange={(data) => setState((s) => ({ ...s, vcardData: data }))}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {state.currentStep === 3 && (
            <QRCustomizer
              options={state.qrOptions}
              onChange={(opts) => setState((s) => ({ ...s, qrOptions: opts }))}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {state.currentStep === 4 && (
            <DownloadPanel
              qrCodeRef={qrCodeRef}
              previewContainerRef={previewMountRef}
              options={state.qrOptions}
              onBack={() => setStep(3)}
            />
          )}
        </main>

        {/* Right: Sticky Live Preview Panel */}
        <aside
          className={`preview-panel ${
            isMobilePreviewOpen ? 'preview-panel--mobile-open' : ''
          }`}
          id="qr-preview-section"
        >
          {isMobilePreviewOpen && (
            <div className="mobile-preview-header">
              <span className="mobile-preview-title">Vista previa de tu QR</span>
              <button
                type="button"
                className="mobile-preview-close-btn"
                onClick={() => setIsMobilePreviewOpen(false)}
              >
                ✕ Cerrar
              </button>
            </div>
          )}

          <QRPreview
            data={qrData}
            options={state.qrOptions}
            qrCodeRef={qrCodeRef}
            containerRef={previewMountRef}
          />
        </aside>

        {/* Mobile Floating Button */}
        <button
          type="button"
          className="mobile-floating-preview-trigger"
          onClick={() => setIsMobilePreviewOpen(!isMobilePreviewOpen)}
          aria-label="Ver vista previa del código QR en vivo"
        >
          {isMobilePreviewOpen ? '✕ Ocultar QR' : '👁️ Ver QR en vivo'}
        </button>
      </div>

      {/* SEO FAQ & Guide Section */}
      <SeoFaq />

      {/* Full-Width Redesigned Footer */}
      <Footer />
    </div>
  );
}
