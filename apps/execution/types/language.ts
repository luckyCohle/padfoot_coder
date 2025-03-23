export const languageEnum = ["javascript", "python", "c", "cpp","java"] as const;
export type languageType = (typeof languageEnum)[number];
export const compiledLanguages = [ "c", "cpp","java"]

