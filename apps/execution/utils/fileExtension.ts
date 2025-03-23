import { languageType } from "../types/language";

export const getFileExtension = (language: languageType): string => {
    switch (language) {
        case "python":
            return ".py";
        case "c":
            return ".c";
        case "cpp":
            return ".cpp";
        case "java":
            return ".java";
        case "javascript":
            return ".js";
        default:
            throw new Error("No such language found");
    }
};