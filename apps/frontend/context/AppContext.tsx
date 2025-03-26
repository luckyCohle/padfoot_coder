import { languageType } from '@/utils/types';
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for context state
type Theme = 'light' | 'dark' ;

// Interface for context value
interface CompilerContextType {
  language: languageType;
  setLanguage: (language: languageType) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  input: any[];
  setInput:(inputArray:any[])=>void;
  code:string;
  setCode:(code:string)=>void;
  output:string;
  setOutput:(data:string)=>void;

}

// Create the context with a default value
const CompilerContext = createContext<CompilerContextType>({
  language: 'javascript',
  setLanguage: () => {},
  theme: 'light',
  setTheme: () => {},
  input:[],
  setInput:()=>{},
  code:"",
  setCode:()=>{},
  output:"",
  setOutput:()=>{}
});

// Provider component
export const CompilerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<languageType>('javascript');
  const [theme, setTheme] = useState<Theme>('light');
  const [input,setInput] = useState<any[]>([]);
  const [code,setCode] = useState<string>("");
  const [output,setOutput] = useState<string>("//Output will appear here");
 
  return (
    <CompilerContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        theme, 
        setTheme ,
        code,
        setCode,
        input,
        setInput,
        output,
        setOutput
      }}
    >
      {children}
    </CompilerContext.Provider>
  );
};

// Custom hook for using compiler context
export const useCompilerContext = () => {
  const context = useContext(CompilerContext);
  
  if (!context) {
    throw new Error('useCompilerContext must be used within a CompilerProvider');
  }
  
  return context;
};