import type { ContentType, EmailData, WiFiData, VCardData } from '../types';

interface ContentFormProps {
  contentType: ContentType;
  contentData: string;
  emailData: EmailData;
  phoneData: string;
  wifiData: WiFiData;
  vcardData: VCardData;
  onContentDataChange: (val: string) => void;
  onEmailDataChange: (data: EmailData) => void;
  onPhoneDataChange: (val: string) => void;
  onWifiDataChange: (data: WiFiData) => void;
  onVcardDataChange: (data: VCardData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ContentForm({
  contentType,
  contentData,
  emailData,
  phoneData,
  wifiData,
  vcardData,
  onContentDataChange,
  onEmailDataChange,
  onPhoneDataChange,
  onWifiDataChange,
  onVcardDataChange,
  onNext,
  onBack,
}: ContentFormProps) {
  return (
    <div className="animate-in">
      <div className="card">
        <h2 className="card__title">
          <span className="card__title-icon">✏️</span>
          Ingresa el contenido
        </h2>

        {contentType === 'url' && (
          <div className="form-group">
            <label className="form-label">URL del enlace</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://tu-sitio-web.com"
              value={contentData}
              onChange={(e) => onContentDataChange(e.target.value)}
            />
          </div>
        )}

        {contentType === 'text' && (
          <div className="form-group">
            <label className="form-label">Texto</label>
            <textarea
              className="form-textarea"
              placeholder="Escribe tu texto aquí..."
              value={contentData}
              onChange={(e) => onContentDataChange(e.target.value)}
            />
          </div>
        )}

        {contentType === 'email' && (
          <>
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-input"
                placeholder="correo@ejemplo.com"
                value={emailData.to}
                onChange={(e) => onEmailDataChange({ ...emailData, to: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Asunto</label>
              <input
                type="text"
                className="form-input"
                placeholder="Asunto del correo"
                value={emailData.subject}
                onChange={(e) => onEmailDataChange({ ...emailData, subject: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cuerpo del mensaje</label>
              <textarea
                className="form-textarea"
                placeholder="Escribe el mensaje..."
                value={emailData.body}
                onChange={(e) => onEmailDataChange({ ...emailData, body: e.target.value })}
              />
            </div>
          </>
        )}

        {contentType === 'phone' && (
          <div className="form-group">
            <label className="form-label">Número de teléfono</label>
            <input
              type="tel"
              className="form-input"
              placeholder="+34 600 000 000"
              value={phoneData}
              onChange={(e) => onPhoneDataChange(e.target.value)}
            />
          </div>
        )}

        {contentType === 'wifi' && (
          <>
            <div className="form-group">
              <label className="form-label">Nombre de la red (SSID)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Mi Red WiFi"
                value={wifiData.ssid}
                onChange={(e) => onWifiDataChange({ ...wifiData, ssid: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                type="text"
                className="form-input"
                placeholder="contraseña123"
                value={wifiData.password}
                onChange={(e) => onWifiDataChange({ ...wifiData, password: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tipo de encriptación</label>
              <select
                className="form-select"
                value={wifiData.encryption}
                onChange={(e) =>
                  onWifiDataChange({ ...wifiData, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })
                }
              >
                <option value="WPA">WPA / WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Sin contraseña</option>
              </select>
            </div>
          </>
        )}

        {contentType === 'vcard' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Juan"
                  value={vcardData.firstName}
                  onChange={(e) => onVcardDataChange({ ...vcardData, firstName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Pérez"
                  value={vcardData.lastName}
                  onChange={(e) => onVcardDataChange({ ...vcardData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+34 600 000 000"
                value={vcardData.phone}
                onChange={(e) => onVcardDataChange({ ...vcardData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="correo@ejemplo.com"
                value={vcardData.email}
                onChange={(e) => onVcardDataChange({ ...vcardData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Empresa</label>
              <input
                type="text"
                className="form-input"
                placeholder="Mi Empresa S.L."
                value={vcardData.company}
                onChange={(e) => onVcardDataChange({ ...vcardData, company: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cargo</label>
              <input
                type="text"
                className="form-input"
                placeholder="Director de Marketing"
                value={vcardData.title}
                onChange={(e) => onVcardDataChange({ ...vcardData, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Sitio web</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://mi-sitio.com"
                value={vcardData.website}
                onChange={(e) => onVcardDataChange({ ...vcardData, website: e.target.value })}
              />
            </div>
          </>
        )}
      </div>
      <div className="nav-buttons">
        <button className="btn btn--dark" onClick={onBack}>
          ← Atrás
        </button>
        <button className="btn btn--primary" onClick={onNext}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
