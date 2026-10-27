# 📱 QR Customizer — Generador y Personalizador de Códigos QR

Generador de códigos QR con **diseño neo-brutalista** inspirado en el sistema de diseño de **Gumroad** (bordes gruesos negros, sombras sólidas offset, paleta de colores de alto contraste y tipografía *Space Grotesk*).

🌐 **Demo en vivo en GitHub Pages**: [https://jnicoep.github.io/qr-customizer/](https://jnicoep.github.io/qr-customizer/)

---

## ✨ Características Principales

### 1. 📋 Múltiples Tipos de Contenido
- **🔗 URL / Enlace**: Para cualquier sitio web o landing page.
- **📝 Texto Libre**: Mensajes, notas o códigos de cupón.
- **✉️ Correo Electrónico**: Formulario con destinatario, asunto y cuerpo precargado (`mailto:`).
- **📱 Teléfono**: Enlace directo para llamadas telefónicas (`tel:`).
- **📶 Red Wi-Fi**: Conexión rápida escaneable indicando SSID, contraseña y encriptación (WPA/WEP/abierta).
- **👤 Contacto (vCard)**: Tarjeta de contacto completa con nombre, teléfono, email, empresa, cargo y web.

### 2. 🎨 Personalización Avanzada del QR
- **✨ Plantillas Rápidas Brutalistas en 1 Clic**:
  - 🌸 *Gumroad Pink*: Estilo icónico con marco rosa y tipografía gruesa.
  - ⚡ *Acid Cyber*: Puntos circulares sobre amarillo neón con sticker angular.
  - 🔮 *Lavender Pop*: Degradado violeta-magenta sobre lavanda suave.
  - 🌿 *Mint Modern*: Formas *classy* en verde menta y marco superior.
  - 🖤 *Dark Neo*: Modo oscuro brutalista con acentos verde neón.
  - 🍊 *Sunset Punch*: Degradado cálido mandarina con marco polaroid.
  - 📷 *Retro Polaroid*: Tarjeta estilo fotografía instantánea con leyenda inferior.
- **⬛ Estilos de Puntos Modulares**:
  - Cuadrado clásico, Redondeado, Puntos circulares (*dots*), Clásico (*classy*), Clásico redondeado y Extra redondeado.
- **🔲 Personalización de Esquinas Detectoras**:
  - Forma del marco exterior: Cuadrado, Punto, Extra redondeado.
  - Forma del punto interior: Cuadrado, Punto.
  - Opción de colores individuales e independientes para esquinas.
- **🌈 Paleta de Colores y Degradados**:
  - Selector de color hexadecimal e interactivo con swatch táctil.
  - Degradados lineales o radiales con control de ángulo de rotación (0° a 360°).
  - Interruptor de **Fondo Transparente** (ideal para diseñadores que lo incorporan en pósters, Illustrator, Figma o Photoshop).
- **🖼️ Marcos y Llamadas a la Acción (CTA)**:
  - *Banner Superior*: Franja gruesa con texto personalizable (ej: "¡ESCANÉAME!").
  - *Barra Inferior*: Barra con llamada a la acción en contraste.
  - *Polaroid*: Tarjeta retro con texto al pie.
  - *Sticker Brutal*: Insignia inclinada (badge) en la esquina superior.
  - Colores de fondo y texto del marco totalmente editables.
- **🏷️ Logos e Imágenes en el Centro**:
  - **10 Logos populares vectoriales integrados en un clic**: Instagram, WhatsApp, Web, YouTube, X (Twitter), TikTok, Spotify, LinkedIn, GitHub y Wi-Fi.
  - Opción de subir cualquier imagen personalizada (PNG, JPG o SVG).
  - Control de tamaño del logo (15% a 45%) y margen circundante.
  - Opción para ocultar o mantener los módulos QR detrás del logo.
- **⚙️ Tolerancia a Errores y Calidad de Lectura**:
  - Niveles de corrección de error configurables: **L (7%)**, **M (15%)**, **Q (25%)**, **H (30% Máximo)**.
  - Configuración automática en modo **H** al insertar un logo para garantizar 100% de legibilidad.
  - Ajuste de resolución de exportación (300px hasta 1200px) y zona de silencio (márgenes).

### 3. 📥 Descarga en Múltiples Formatos
- **🖼️ PNG**: Alta resolución con soporte para transparencias y composición de marcos.
- **✏️ SVG**: Vectorial infinito sin pérdida de resolución para impresión profesional en carteles o gigantografías.
- **📷 JPEG**: Comprimido de alta calidad para envío rápido por email y web.
- Composición automática en Canvas al exportar con marco brutalista incluido.

### 4. 📱 100% Responsivo y Mobile-First
- Diseñado para funcionar a la perfección en smartphones, tablets y pantallas de escritorio.
- **Visor Flotante en Móviles**: Botón táctil `[👁️ Ver QR en vivo]` para previsualizar el código instantáneamente sin perder el lugar de edición.
- Sub-pestañas táctiles para navegar rápidamente entre configuraciones sin desplazamientos infinitos.
- Controles adaptados al tacto con tamaño mínimo de 44px e inputs optimizados para evitar zooms no deseados en iOS.

---

## 🛠️ Stack Tecnológico

- **React 18** + **TypeScript**
- **Vite 6** (Build y empaquetado ultra rápido)
- **qr-code-styling** (Motor de renderizado vectorial de códigos QR)
- **CSS Brutalista Custom** (Sin dependencias pesadas, sistema de diseño puro con bordes duros y sombras offset sólidas)

---

## 💻 Instalación y Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/JNicoEP/qr-customizer.git
cd qr-customizer

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor local de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5173/qr-customizer/`.

---

## 📦 Compilación para Producción

```bash
npm run build
```

Genera los archivos estáticos optimizados en la carpeta `dist/`.

---

## 🚀 Despliegue en GitHub Pages

El proyecto incluye dos métodos listos para desplegar:

1. **GitHub Actions (Automático al hacer push a `main`)**:
   El archivo [.github/workflows/deploy.yml](.github/workflows/deploy.yml) compila y publica automáticamente.
   Para activarlo:
   - Ve a **Settings** de tu repositorio en GitHub.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En **Build and deployment > Source**, selecciona **GitHub Actions**.

2. **Desde la rama `gh-pages`**:
   Los archivos compilados en `dist/` se encuentran publicados en la rama `gh-pages`.
   - En **Settings > Pages > Branch**, selecciona `gh-pages` con la carpeta `/ (root)`.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
