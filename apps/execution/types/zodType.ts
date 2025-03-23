import { z } from "zod";
import { languageEnum } from "../types/language";

export const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/; // Simple Base64 validation

export const executeCodeInput = z.object({
  language: z.enum(languageEnum),
  code: z.string().regex(base64Regex, "Invalid Base64 string"), // Validate Base64
  inputData: z.array(z.any()).optional(),
});
