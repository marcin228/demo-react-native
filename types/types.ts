export const LANGUAGES = {
  PL: 'pl-PL',
  CZ: 'cz-CZ',
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];