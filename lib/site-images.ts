export type SiteImage = {
  src: string;
  alt: string;
};

// Central image library for the MVP.
// If you want to replace the visuals later, start here first.
const caboVerdeImageLibrary = {
  salCalm: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Sal%2C_Cape_Verde_Islands.jpeg",
    alt: "Soft sand, bright water, and a calm resort-style beach atmosphere that fits Sal"
  },
  salPremium: {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/20240101_123825_beach_near_Santa_Maria%2C_Sal%2C_Cabo_Verde.jpg",
    alt: "A wide Santa Maria beach scene in Sal with turquoise water, bright sand, and a more premium holiday feel"
  },
  santiagoCulture: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Cidade_Velha_Ilha_de_Santiago%2C_Cabo_Verde.jpg",
    alt: "Cidade Velha on Santiago with historic coastal character and a more specific sense of heritage"
  },
  santoAntaoTrails: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Vale_do_Pa%C3%BAl%2C_Santo_Ant%C3%A3o%2C_Cape_Verde.jpg",
    alt: "Steep green mountains and dramatic hiking terrain that strongly match Santo Antao"
  },
  saoVicenteCoast: {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Av_Marginal_%28S_Vicente%2C_Cabo_Verde%29.JPG",
    alt: "A seafront urban island mood with wind, water, and creative coastal energy suited to Sao Vicente"
  },
  caboVerdeShoreline: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Sal%2C_Cape_Verde_Islands.jpeg",
    alt: "A spacious Atlantic shoreline with a quiet premium mood that fits the wider Cabo Verde brand"
  }
} as const satisfies Record<string, SiteImage>;

export const siteImages = {
  home: {
    hero: caboVerdeImageLibrary.salPremium,
    destinations: [
      caboVerdeImageLibrary.salCalm,
      caboVerdeImageLibrary.santiagoCulture,
      caboVerdeImageLibrary.santoAntaoTrails
    ],
    experiences: [
      caboVerdeImageLibrary.caboVerdeShoreline,
      caboVerdeImageLibrary.santiagoCulture,
      caboVerdeImageLibrary.santoAntaoTrails
    ]
  },
  destinations: {
    intro: caboVerdeImageLibrary.santoAntaoTrails,
    cards: [
      caboVerdeImageLibrary.santiagoCulture,
      caboVerdeImageLibrary.salCalm,
      caboVerdeImageLibrary.saoVicenteCoast
    ]
  },
  experiences: {
    intro: caboVerdeImageLibrary.saoVicenteCoast,
    cards: [
      caboVerdeImageLibrary.santoAntaoTrails,
      caboVerdeImageLibrary.santiagoCulture,
      caboVerdeImageLibrary.saoVicenteCoast,
      caboVerdeImageLibrary.salCalm
    ]
  },
  about: {
    hero: caboVerdeImageLibrary.santoAntaoTrails,
    story: caboVerdeImageLibrary.santiagoCulture
  }
} as const;
