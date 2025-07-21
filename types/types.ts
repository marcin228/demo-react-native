export const LANGUAGES = {
  PL: 'pl',
  CZ: 'cz',
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];