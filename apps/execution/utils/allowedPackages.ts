import { languageType } from "../types/language";

const ALLOWED_PACKAGES = {
    'python': ['numpy', 'pandas', 'matplotlib', 'requests', 'scipy', 'scikit-learn'],
    'javascript': ['lodash', 'axios', 'moment', 'express', 'chalk', 'uuid']
  };
export const getAllowedPackages = (language:languageType)=>{
    switch (language) {
        case "python":
            return ALLOWED_PACKAGES.python
        case "javascript":
            return ALLOWED_PACKAGES.javascript
        default:
            return [];
    }
}