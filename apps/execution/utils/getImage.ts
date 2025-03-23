import { languageType } from "../types/language";

export const getDockerImage=(language:languageType)=>{
    switch (language) {
        case "python":
            return "python:3.11-alpine"
            break;
        case "javascript":
            return "node:18-alpine"
        case "c":
            return "gcc:latest"
        case "cpp":
            return "gcc:latest"
        case "java":
            return "openjdk:17-alpine"
        default:
            return ""
    }
}