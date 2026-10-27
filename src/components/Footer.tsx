export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      {/* Brutalist Ticker Bar */}
      <div className="footer-ticker">
        <div className="footer-ticker__content">
          <span>⚡ 100% GRATIS</span>
          <span className="ticker-bullet">★</span>
          <span>SIN REGISTRO NI COOKIES</span>
          <span className="ticker-bullet">★</span>
          <span>PROCESADO 100% LOCAL EN TU NAVEGADOR</span>
          <span className="ticker-bullet">★</span>
          <span>EXPORTA EN SVG, PNG Y JPEG</span>
          <span className="ticker-bullet">★</span>
          <span>ESTÉTICA BRUTALISTA GUMROAD</span>
          <span className="ticker-bullet">★</span>
          <span>OPEN SOURCE</span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Columna 1: Marca y Propósito */}
          <div className="footer-col footer-col--brand">
            <div className="footer-logo">
              <span className="footer-logo__icon">QR</span>
              <span className="footer-logo__title">QR Customizer</span>
            </div>
            <p className="footer-description">
              El generador de códigos QR con actitud. Diseñado con el auténtico sistema de diseño
              neo-brutalista inspirado en Gumroad: bordes gruesos de alto contraste, sombras duras y máxima libertad de personalización.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">🔒 Cero Rastreo</span>
              <span className="footer-badge">⚡ Client-Side Only</span>
              <span className="footer-badge">🛡️ Privacidad Total</span>
            </div>
          </div>

          {/* Columna 2: Tipos de QR */}
          <div className="footer-col">
            <h3 className="footer-col__title">Contenidos</h3>
            <ul className="footer-links">
              <li>🔗 Sitios Web y Landing Pages</li>
              <li>💬 Enlaces a WhatsApp y Redes</li>
              <li>📶 Conexión Directa a Wi-Fi</li>
              <li>👤 Tarjetas de Contacto vCard</li>
              <li>✉️ Correo Electrónico y Teléfono</li>
              <li>📝 Textos y Mensajes Libres</li>
            </ul>
          </div>

          {/* Columna 3: Características de Diseño */}
          <div className="footer-col">
            <h3 className="footer-col__title">Personalización</h3>
            <ul className="footer-links">
              <li>✨ 7 Plantillas Brutalistas listas</li>
              <li>🖼️ Marcos con CTA ("¡ESCANÉAME!")</li>
              <li>🏷️ 10 Logos populares integrados</li>
              <li>🌈 Degradados lineales y radiales</li>
              <li>🔲 Colores individuales de esquinas</li>
              <li>🏁 Modo con fondo transparente</li>
            </ul>
          </div>

          {/* Columna 4: Repositorio & Código Abierto */}
          <div className="footer-col">
            <h3 className="footer-col__title">Código Abierto</h3>
            <p className="footer-repo-text">
              Proyecto libre bajo licencia <strong>MIT</strong>. Puedes utilizarlo, bifurcarlo o integrarlo en tus proyectos comerciales y personales.
            </p>
            <a
              href="https://github.com/JNicoEP/qr-customizer"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-github-btn"
            >
              <span>★ Ver repositorio en GitHub</span>
              <span className="footer-github-arrow">➔</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom__content">
          <span>© {currentYear} <strong>QR Customizer</strong> — Hecho con pasión, café y código limpio.</span>
          <span className="footer-bottom__privacy">
            Todos los códigos QR se generan de forma local en tu dispositivo. Nada se envía a servidores externos.
          </span>
        </div>
      </div>
    </footer>
  );
}
