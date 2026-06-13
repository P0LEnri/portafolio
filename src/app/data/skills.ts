// Non-translatable metadata: category order, layout (hero) and id used to
// look up translated titles/skills from the i18n translations.
export interface SkillMeta {
  id: string;
  hero?: boolean;
}

export const skillMeta: SkillMeta[] = [
  { id: 'genai', hero: true },
  { id: 'ml' },
  { id: 'engineering' },
];
