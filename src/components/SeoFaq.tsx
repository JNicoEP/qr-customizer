import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
  tag: string;
  color: string;
}

const faqs: FaqItem[] = [
  {
    tag: 'DISEÑO',
    color: '#FF90E8',
    q: '¿Cómo poner un logo en el código QR sin que deje de funcionar?',
    a: 'Los códigos QR tienen un algoritmo matemático de corrección de errores (Reed-Solomon). Al insertar un logo en el centro, nuestra herramienta eleva automáticamente el nivel de tolerancia a "H" (30%), lo que permite tapar hasta un tercio del código sin perder legibilidad.',
  },
  {
    tag: 'IMPRESIÓN',
    color: '#FFC900',
    q: '¿Qué formato debo descargar: PNG, SVG o JPEG?',
    a: 'Para impresión profesional en folletos, pancartas o packaging, el formato SVG es el indicado porque es vectorial y no se pixela sin importar el tamaño. Para redes sociales, páginas web o presentaciones, PNG es perfecto gracias a su nitidez y soporte para transparencias.',
  },
  {
    tag: 'PRIVACIDAD',
    color: '#23A094',
    q: '¿Dónde se guardan los datos que ingreso en mi QR?',
    a: 'En ningún servidor. A diferencia de otros generadores comerciales que recopilan tus datos o acortan URLs para rastreo, QR Customizer procesa y dibuja los códigos QR directamente en la memoria de tu propio navegador web (100% Client-Side).',
  },
  {
    tag: 'MARCOS',
    color: '#B8B8FF',
    q: '¿Por qué añadir un marco con texto como "¡ESCANÉAME!"?',
    a: 'Estudios de marketing demuestran que los códigos QR con una llamada a la acción clara (CTA) obtienen hasta un 80% más de escaneos que los códigos simples sin contexto. El marco brutalista orienta a las personas sobre qué encontrarán al escanear.',
  },
];

export default function SeoFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="seo-faq-section" aria-label="Preguntas frecuentes sobre códigos QR">
      <div className="seo-faq-header">
        <span className="seo-faq-tag">GUÍA & PREGUNTAS FRECUENTES</span>
        <h2 className="seo-faq-title">TODO LO QUE NECESITAS SABER SOBRE TUS CÓDIGOS QR</h2>
        <p className="seo-faq-subtitle">
          Consejos técnicos para lograr códigos QR de máximo impacto, legibilidad garantizada y calidad de imprenta.
        </p>
      </div>

      <div className="seo-faq-grid">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <article
              key={idx}
              className={`seo-faq-card ${isOpen ? 'seo-faq-card--open' : ''}`}
              onClick={() => toggle(idx)}
            >
              <div className="seo-faq-card__header">
                <span className="seo-faq-card__tag" style={{ backgroundColor: faq.color }}>
                  {faq.tag}
                </span>
                <span className="seo-faq-card__toggle">{isOpen ? '−' : '+'}</span>
              </div>
              <h3 className="seo-faq-card__question">{faq.q}</h3>
              <p className="seo-faq-card__answer">{faq.a}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
