export type SiteImage = {
  src: string;
  alt: string;
};

import type { ExperienceCardId, IslandSlug } from "@/lib/islands";

type IslandExperienceImages = {
  hero: SiteImage;
  cards: Record<ExperienceCardId, SiteImage>;
};

const userPhotoLibrary = {
  homeHero: {
    src: "/images/tubatour/home-hero.jpg",
    alt: "Cabo Verde flag photo used prominently in the Tuba Travel homepage hero"
  },
  destinationSantiago: {
    src: "/images/tubatour/destination-santiago.jpg",
    alt: "Bay and beach scene in Santiago with boats, shoreline, and calm blue water"
  },
  destinationSal: {
    src: "/images/tubatour/destination-sal.jpg",
    alt: "Ocean waves on Sal with a natural coastline and bright open sea"
  },
  destinationSantoAntao: {
    src: "/images/tubatour/destination-santo-antao.jpg",
    alt: "Mountain valley scene in Santo Antao with greenery, stone walls, and hillside homes"
  },
  experienceSaoVicente: {
    src: "/images/tubatour/experience-sao-vicente.jpg",
    alt: "Aerial marina and port view in Sao Vicente with boats and urban waterfront character"
  },
  experienceSantiago: {
    src: "/images/tubatour/experience-santiago.jpg",
    alt: "Street scene in Santiago with trees, cars, and a lived city atmosphere"
  }
} as const satisfies Record<string, SiteImage>;

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
  salAirport: {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8d/SID_-_Sal_-_Cabo_Verde_-_2016_%283%29.jpg",
    alt: "The airport terminal on Sal suggesting smooth arrivals and practical island travel"
  },
  salSeaPoint: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Sea_point%2C_Santa_Maria%2C_Sal_Island%2C_Cabo_Verde.jpg",
    alt: "A shoreline scene in Santa Maria on Sal with a more lived-in coastal atmosphere"
  },
  salVillage: {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/31/Santa_Maria_1_%28Sal%2C_Cabo_Verde%29.JPG",
    alt: "A village-side view in Santa Maria that gives Sal a lighter local and leisure feel beyond the beach"
  },
  santiagoCulture: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Cidade_Velha_Ilha_de_Santiago%2C_Cabo_Verde.jpg",
    alt: "Cidade Velha on Santiago with historic coastal character and a more specific sense of heritage"
  },
  santiagoCity: {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Praia_Cabo_Verde.jpg",
    alt: "A view across Praia on Santiago with urban rhythm and everyday city atmosphere"
  },
  santiagoLocalLife: {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Repairing_a_stone_road_by_hand%2C_Cidade_Velha%2C_Praia%2C_Cabo_Verde.jpg",
    alt: "A lived local scene in Cidade Velha on Santiago that adds human texture and grounded daily life"
  },
  santiagoHeritage: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Pelourinho_de_Cidade_Velha%2C_Cabo_Verde_1.jpg",
    alt: "A heritage landmark in Cidade Velha that reinforces the historical identity of Santiago"
  },
  santiagoAvenue: {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/be/Cidade_da_Praia_Cabo_Verde.jpg",
    alt: "An avenue scene in Praia that adds city rhythm and movement to Santiago"
  },
  santoAntaoTrails: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Vale_do_Pa%C3%BAl%2C_Santo_Ant%C3%A3o%2C_Cape_Verde.jpg",
    alt: "Steep green mountains and dramatic hiking terrain that strongly match Santo Antao"
  },
  saoVicenteCoast: {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Av_Marginal_%28S_Vicente%2C_Cabo_Verde%29.JPG",
    alt: "A seafront urban island mood with wind, water, and creative coastal energy suited to Sao Vicente"
  },
  saoVicenteStreet: {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/be/Mindelo1.JPG",
    alt: "A street scene in Mindelo with urban detail and everyday island character"
  },
  saoVicenteArts: {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Centro_Nacional_de_Artesanato_e_Design_Mindelo%2C_Cabo_Verde.jpg",
    alt: "The arts and design center in Mindelo suggesting architecture, creativity, and local culture"
  },
  saoVicenteCultureHub: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Mansa_Floating_Hub_Mindelo%2C_Cabo_Verde.jpg",
    alt: "A cultural hub in Mindelo that reinforces the musical and creative identity of Sao Vicente"
  },
  saoVicenteMusicCafe: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Music_cafe_in_Mindelo.jpg",
    alt: "A music-focused venue in Mindelo that adds nightlife and cultural texture to Sao Vicente"
  },
  saoVicenteMarket: {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/65/Mercado_Municipal_Mindelo_Cabo_Verde.jpg",
    alt: "The municipal market in Mindelo bringing local encounters and everyday city life into the Sao Vicente story"
  },
  saoVicenteBay: {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/74/Mindelo_%28S_Vicente%2C_Cabo_Verde%29.JPG",
    alt: "A broader bay view over Mindelo that captures the seaside-city atmosphere of Sao Vicente"
  },
  boaVistaCalm: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Praia%20de%20Chaves%20-%20Boa%20Vista.jpg",
    alt: "A wide quiet beach with openness, pale sand, and calm escape energy suited to Boa Vista"
  },
  fogoVolcano: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Pico%20do%20Fogo%20Cape%20Verde.jpg",
    alt: "A dramatic volcanic landscape with dark terrain and a singular atmosphere suited to Fogo"
  },
  caboVerdeShoreline: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Sal%2C_Cape_Verde_Islands.jpeg",
    alt: "A spacious Atlantic shoreline with a quiet premium mood that fits the wider Cabo Verde brand"
  }
} as const satisfies Record<string, SiteImage>;

export const siteImages = {
  home: {
    hero: userPhotoLibrary.homeHero,
    destinations: [
      userPhotoLibrary.destinationSal,
      userPhotoLibrary.destinationSantiago,
      userPhotoLibrary.destinationSantoAntao
    ],
    experiences: [
      caboVerdeImageLibrary.caboVerdeShoreline,
      userPhotoLibrary.experienceSantiago,
      caboVerdeImageLibrary.santoAntaoTrails
    ]
  },
  destinations: {
    intro: userPhotoLibrary.destinationSantoAntao,
    cards: [
      userPhotoLibrary.destinationSantiago,
      userPhotoLibrary.destinationSal,
      userPhotoLibrary.destinationSantoAntao
    ]
  },
  experiences: {
    intro: userPhotoLibrary.experienceSaoVicente,
    cards: {
      "island-tours": caboVerdeImageLibrary.santoAntaoTrails,
      "cultural-experiences": userPhotoLibrary.experienceSantiago,
      "airport-transfers": caboVerdeImageLibrary.saoVicenteCoast,
      "personalized-travel-planning": caboVerdeImageLibrary.salCalm
    },
    islands: {
      santiago: {
        hero: userPhotoLibrary.experienceSantiago,
        cards: {
          "island-tours": {
            src: "/images/experiences/santiago-island-tours.jpg",
            alt: caboVerdeImageLibrary.santiagoAvenue.alt
          },
          "cultural-experiences": {
            src: "/images/experiences/santiago-cultural-experiences.jpg",
            alt: caboVerdeImageLibrary.santiagoHeritage.alt
          },
          "airport-transfers": {
            src: "/images/experiences/santiago-airport-transfers.jpg",
            alt: caboVerdeImageLibrary.santiagoLocalLife.alt
          },
          "personalized-travel-planning": {
            src: "/images/experiences/santiago-personalized-travel-planning.jpg",
            alt: caboVerdeImageLibrary.santiagoCity.alt
          }
        }
      },
      sal: {
        hero: userPhotoLibrary.destinationSal,
        cards: {
          "island-tours": {
            src: "/images/experiences/sal-island-tours.jpg",
            alt: caboVerdeImageLibrary.salPremium.alt
          },
          "cultural-experiences": {
            src: "/images/experiences/sal-cultural-experiences.jpg",
            alt: caboVerdeImageLibrary.salVillage.alt
          },
          "airport-transfers": {
            src: "/images/experiences/sal-airport-transfers.jpg",
            alt: caboVerdeImageLibrary.salAirport.alt
          },
          "personalized-travel-planning": {
            src: "/images/experiences/sal-personalized-travel-planning.jpg",
            alt: caboVerdeImageLibrary.salSeaPoint.alt
          }
        }
      },
      "sao-vicente": {
        hero: userPhotoLibrary.experienceSaoVicente,
        cards: {
          "island-tours": {
            src: "/images/experiences/sao-vicente-island-tours.jpg",
            alt: caboVerdeImageLibrary.saoVicenteStreet.alt
          },
          "cultural-experiences": {
            src: "/images/experiences/sao-vicente-cultural-experiences.jpg",
            alt: caboVerdeImageLibrary.saoVicenteCultureHub.alt
          },
          "airport-transfers": {
            src: "/images/experiences/sao-vicente-airport-transfers.jpg",
            alt: caboVerdeImageLibrary.saoVicenteCoast.alt
          },
          "personalized-travel-planning": {
            src: "/images/experiences/sao-vicente-personalized-travel-planning.jpg",
            alt: caboVerdeImageLibrary.saoVicenteArts.alt
          }
        }
      },
      "santo-antao": {
        hero: caboVerdeImageLibrary.santoAntaoTrails,
        cards: {
          "island-tours": caboVerdeImageLibrary.santoAntaoTrails,
          "cultural-experiences": caboVerdeImageLibrary.santiagoCulture,
          "airport-transfers": caboVerdeImageLibrary.santoAntaoTrails,
          "personalized-travel-planning": caboVerdeImageLibrary.santoAntaoTrails
        }
      },
      "boa-vista": {
        hero: caboVerdeImageLibrary.boaVistaCalm,
        cards: {
          "island-tours": caboVerdeImageLibrary.boaVistaCalm,
          "cultural-experiences": caboVerdeImageLibrary.boaVistaCalm,
          "airport-transfers": caboVerdeImageLibrary.boaVistaCalm,
          "personalized-travel-planning": caboVerdeImageLibrary.boaVistaCalm
        }
      },
      fogo: {
        hero: caboVerdeImageLibrary.fogoVolcano,
        cards: {
          "island-tours": caboVerdeImageLibrary.fogoVolcano,
          "cultural-experiences": caboVerdeImageLibrary.santiagoCulture,
          "airport-transfers": caboVerdeImageLibrary.fogoVolcano,
          "personalized-travel-planning": caboVerdeImageLibrary.fogoVolcano
        }
      }
    } as Record<IslandSlug, IslandExperienceImages>
  },
  about: {
    hero: caboVerdeImageLibrary.santoAntaoTrails,
    story: caboVerdeImageLibrary.santiagoCulture
  }
} as const;
