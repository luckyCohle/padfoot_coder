import { languageType } from "../types/language"
import { getAllowedPackages } from "./allowedPackages";

export const getCompileCommand = (language: languageType, filePath: string) => {
    switch (language) {
        case "java":
            const className = filePath.replace(/\.java$/, ''); // Handle .java extension correctly
            return [ "javac" ,`/app/${filePath}`];
        case "cpp":
            return [ "g++",`/app/${filePath}`,"-o ","/app/output"];
        case "c":
            return ["gcc", `/app/${filePath}`, "-o", "/app/output"];
        default:
            return [];
    }
}

export const getRunCommand = (language: languageType, filePath: string) => {
    switch (language) {
        case "python":
            return ['python', `/app/${filePath}`];
        case "javascript":
            return ["node", `/app/${filePath}`]; // Fixed path inconsistency
        case "java":
            const className = filePath.replace(/\.java$/, ''); // Handle .java extension correctly
            return [` java -cp /app ${className}`];
        case "cpp":
            return [` /app/output`];
        case "c":
            return [` /app/output`];
        default:
            return [];
    }
}

export const extractDependencies = (language: languageType, code: string): string[] => {
    switch (language) {
        case 'python': {
            const pythonImports = code.match(/^\s*(?:import|from)\s+([^\s]+)/gm) || [];
            return pythonImports
                .map(match => match.split(/\s+/)[1]?.split('.')[0])
                .filter((pkg): pkg is string => pkg !== undefined);
        }
        case 'javascript': {
            const jsImports = code.match(/(?:require\(['"]([^'"]+)['"]\)|import\s+(?:.*\s+from\s+)?['"]([^'"]+)['"])/g) || [];
            return jsImports
                .map(match => {
                    const pkg = match.match(/['"]([^'"]+)['"]/)?.[1];
                    if (!pkg || pkg.startsWith('.') || pkg.startsWith('/')) return null; // Ignore relative imports
                    return pkg.startsWith('@') ? pkg : pkg.split('/')[0];
                })
                .filter((pkg): pkg is string => pkg !== null);
        }
        default:
            return [];
    }
};

function filterDependencies(deps: string[], language: languageType) {
    const allowlist = getAllowedPackages(language);
    return deps.filter(dep => allowlist.includes(dep));
}

export const getDependencies = (language: languageType, code: string): string[] => {
    return filterDependencies(extractDependencies(language, code), language);
}

export const getInstallCommand = (deps: string, language: languageType) => {
    if (deps.length === 0) return '';

    switch (language) {
        case 'python':
            return `pip install ${deps} && `; // Removed unnecessary --user flag
        case 'javascript':
            return `npm install --no-save ${deps}  `;
        default:
            return '';
    }
}
