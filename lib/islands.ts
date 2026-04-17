export const islandSlugs = [
  "santiago",
  "sal",
  "sao-vicente",
  "santo-antao",
  "boa-vista",
  "fogo"
] as const;

export type IslandSlug = (typeof islandSlugs)[number];

export const experienceCardIds = [
  "island-tours",
  "cultural-experiences",
  "airport-transfers",
  "personalized-travel-planning"
] as const;

export type ExperienceCardId = (typeof experienceCardIds)[number];

export function isValidIslandSlug(value: string): value is IslandSlug {
  return islandSlugs.includes(value as IslandSlug);
}

export function getIslandSlug(value?: string | string[]): IslandSlug | null {
  if (!value) {
    return null;
  }

  const rawValue = Array.isArray(value) ? value[0] : value;

  return isValidIslandSlug(rawValue) ? rawValue : null;
}
