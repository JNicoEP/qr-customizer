import { useState, useRef, useMemo } from 'react';
import QRCodeStyling from 'qr-code-styling';
import Header from './components/Header';
import StepSelector from './components/StepSelector';
import ContentTypeSelector from './components/ContentTypeSelector';
import ContentForm from './components/ContentForm';
import QRCustomizer from './components/QRCustomizer';
import QRPreview from './components/QRPreview';
import DownloadPanel from './components/DownloadPanel';
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
    width: 300,
    margin: 10,
    dotType: 'square',
    dotColor: '#000000',
    backgroundColor: '#ffffff',
    cornerSquareType: 'square',
    cornerDotType: 'square',
    gradient: {
      enabled: false,
      type: 'linear',
      rotation: 0,
      colorFrom: '#000000',
      colorTo: '#FF90E8',
    },
    logo: {
      src: '',
      size: 0.4,
      margin: 10,
      hideBackgroundDots: true,
    },
  },
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

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
    [state.contentType, state.contentData, state.emailData, state.phoneData, state.wifiData, state.vcardData]
  );

  const setStep = (step: number) => setState((s) => ({ ...s, currentStep: step }));

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="hero">
        <h1 className="hero__title">Crea tu QR personalizado</h1>
        <p className="hero__subtitle">
          Diseña códigos QR únicos con colores, formas y tu propio logo. Gratis y sin registro.
        </p>
      </section>

      <div className="app-layout">
        {/* Left: Controls */}
        <div className="controls-panel">
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
            <DownloadPanel qrCodeRef={qrCodeRef} onBack={() => setStep(3)} />
          )}
        </div>

        {/* Right: Preview */}
        <div className="preview-panel">
          <QRPreview data={qrData} options={state.qrOptions} qrCodeRef={qrCodeRef} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
