// Colección de SVGs optimizados como data URIs para logos rápidos populares

export interface PresetLogo {
  id: string;
  name: string;
  category: string;
  svgDataUri: string;
}

function svgToDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const POPULAR_LOGOS: PresetLogo[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Redes',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <rect width="100" height="100" rx="25" fill="#E1306C"/>
        <rect x="20" y="20" width="60" height="60" rx="16" fill="none" stroke="#FFFFFF" stroke-width="6"/>
        <circle cx="50" cy="50" r="14" fill="none" stroke="#FFFFFF" stroke-width="6"/>
        <circle cx="67" cy="33" r="4" fill="#FFFFFF"/>
      </svg>
    `),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'Mensajería',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="48" fill="#25D366"/>
        <path d="M50 22C34.5 22 22 34.5 22 50c0 5.4 1.5 10.4 4.1 14.7L22 78l13.7-4.1c4.1 2.3 8.8 3.6 14.3 3.6 15.5 0 28-12.5 28-28S65.5 22 50 22zm14.2 38.8c-.6 1.7-3.5 3.3-4.9 3.5-1.3.2-3 .3-8.8-2.1-7.4-3.1-12.2-10.6-12.6-11.1-.4-.5-3.1-4.1-3.1-7.8s2-5.5 2.7-6.2c.7-.7 1.6-.9 2.1-.9.5 0 1.1 0 1.5.1.5.1 1.2-.2 1.8 1.4.7 1.6 2.3 5.6 2.5 6 .2.4.3.9.1 1.4-.2.5-.5 1-1 1.5-.5.5-1 .9-1.4 1.3-.5.5-1 1-.4 2 1.2 2 2.7 4 4.5 5.6 2.3 2 4.2 2.7 5.2 3.1 1 .4 1.6.3 2.2-.3.6-.7 2.6-3 3.3-4 .7-1 1.4-.9 2.3-.5.9.3 5.8 2.7 6.8 3.2 1 .5 1.7.8 1.9 1.2.3.4.3 2.3-.3 4z" fill="#FFFFFF"/>
      </svg>
    `),
  },
  {
    id: 'web',
    name: 'Web / URL',
    category: 'General',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="48" fill="#000000"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#FFFFFF" stroke-width="5"/>
        <path d="M12 50h76M50 12c-10 12-15 25-15 38s5 26 15 38c10-12 15-25 15-38s-5-26-15-38z" fill="none" stroke="#FFFFFF" stroke-width="5"/>
      </svg>
    `),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Video',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <rect width="100" height="100" rx="25" fill="#FF0000"/>
        <path d="M78 37c-.8-3.1-3.2-5.5-6.3-6.3C66 29 50 29 50 29s-16 0-21.7 1.7c-3.1.8-5.5 3.2-6.3 6.3C20 42.7 20 50 20 50s0 7.3 2 13c.8 3.1 3.2 5.5 6.3 6.3 5.7 1.7 21.7 1.7 21.7 1.7s16 0 21.7-1.7c3.1-.8 5.5-3.2 6.3-6.3 2-5.7 2-13 2-13s0-7.3-2-13z" fill="#FFFFFF"/>
        <polygon points="44,42 60,50 44,58" fill="#FF0000"/>
      </svg>
    `),
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    category: 'Redes',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <rect width="100" height="100" rx="25" fill="#000000"/>
        <path d="M26 25l20 27-20 23h5l17.5-20.2L62 75h16L57 47l18.5-22h-5L54 43.8 39.5 25H26zm7.5 4h8l33 42h-8l-33-42z" fill="#FFFFFF"/>
      </svg>
    `),
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'Música',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="48" fill="#1DB954"/>
        <path d="M69 44c-12-7-31-8-43-4-2 1-4-.5-4.5-2.5s.5-4 2.5-4.5c14-4 35-3 49 5 2 1 2.5 3.5 1.5 5.5-1 1.5-3.5 2-5.5.5zm-3 12c-10-6-26-8-38-4-2 .5-3.5-.5-4-2s.5-3.5 2-4c14-4 32-2 44 5 1.5 1 2 3 1 4.5s-3 1.5-5 .5zm-4 12c-9-5-22-6-33-3-1.5.5-3-.5-3.5-2s.5-3 2-3.5c13-3 28-2 38 4 1 1 1.5 2.5.5 4-.8 1.5-2.5 1.5-4 .5z" fill="#FFFFFF"/>
      </svg>
    `),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'Redes',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <rect width="100" height="100" rx="25" fill="#000000"/>
        <path d="M53 22h9c1 8 6 13 14 14v10c-5 0-10-2-14-5v24c0 10-8 18-18 18s-18-8-18-18 8-18 18-18c2 0 4 .3 6 1v10c-2-.6-4-1-6-1-5 0-9 4-9 9s4 9 9 9 9-4 9-9V22z" fill="#00F2FE"/>
        <path d="M56 25h9c1 8 6 13 14 14v7c-5 0-10-2-14-5v24c0 10-8 18-18 18s-18-8-18-18 8-18 18-18c2 0 4 .3 6 1v7c-2-.6-4-1-6-1-5 0-9 4-9 9s4 9 9 9 9-4 9-9V25z" fill="#FE2C55"/>
        <path d="M55 24h9c1 8 6 13 14 14v8c-5 0-10-2-14-5v24c0 10-8 18-18 18s-18-8-18-18 8-18 18-18c2 0 4 .3 6 1v8c-2-.6-4-1-6-1-5 0-9 4-9 9s4 9 9 9 9-4 9-9V24z" fill="#FFFFFF"/>
      </svg>
    `),
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    category: 'Conectividad',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <rect width="100" height="100" rx="25" fill="#FFC900"/>
        <path d="M22 36c16-16 40-16 56 0M32 48c10-10 26-10 36 0M41 60c5-5 13-5 18 0" fill="none" stroke="#000000" stroke-width="7" stroke-linecap="round"/>
        <circle cx="50" cy="74" r="6" fill="#000000"/>
      </svg>
    `),
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Código',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="48" fill="#181717"/>
        <path d="M50 20C33.4 20 20 33.4 20 50c0 13.3 8.6 24.5 20.6 28.5 1.5.3 2-.6 2-1.4v-5.2c-8.3 1.8-10.1-4-10.1-4-1.4-3.5-3.4-4.4-3.4-4.4-2.7-1.9.2-1.8.2-1.8 3 .2 4.6 3.1 4.6 3.1 2.7 4.6 7 3.3 8.7 2.5.3-2 1.1-3.3 2-4-6.7-.8-13.7-3.3-13.7-14.8 0-3.3 1.2-6 3.1-8.1-.3-.8-1.3-3.8.3-8 0 0 2.5-.8 8.3 3.1 2.4-.7 5-1 7.5-1s5.1.3 7.5 1c5.7-3.9 8.2-3.1 8.2-3.1 1.7 4.2.6 7.2.3 8 1.9 2.1 3.1 4.8 3.1 8.1 0 11.6-7 14-13.7 14.8 1.1 1 2.1 2.8 2.1 5.7v8.5c0 .8.6 1.8 2.1 1.4C71.4 74.5 80 63.3 80 50c0-16.6-13.4-30-30-30z" fill="#FFFFFF"/>
      </svg>
    `),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'Profesional',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <rect width="100" height="100" rx="25" fill="#0A66C2"/>
        <path d="M30 40h10v35H30zM35 25a6 6 0 100 12 6 6 0 000-12zM48 40h10v5c1.5-3 5-6 11-6 10 0 13 7 13 16v20H72V58c0-4-.5-8-5-8s-5 4-5 8v17H48V40z" fill="#FFFFFF"/>
      </svg>
    `),
  },
];
