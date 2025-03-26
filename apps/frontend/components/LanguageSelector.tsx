import { useCompilerContext } from "@/context/AppContext";
import React, { JSX } from "react";
import { SiC, SiCplusplus, SiJavascript, SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { languageType } from "@/utils/types";

const languages: { name: string; key: languageType; icon: JSX.Element }[] = [
  { name: "C", key: "c", icon: <SiC size={24} /> },
  { name: "C++", key: "cpp", icon: <SiCplusplus size={24} /> },
  { name: "Java", key: "java", icon: <FaJava size={24} /> },
  { name: "JavaScript", key: "javascript", icon: <SiJavascript size={24} /> },
  { name: "Python", key: "python", icon: <SiPython size={24} /> },
];

function LanguageSelector() {
  const { language, setLanguage, theme } = useCompilerContext();

  return (
    <div 
      className={`h-screen w-24 flex flex-col items-center p-4 shadow-lg space-y-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {languages.map((lang) => (
        <div
          key={lang.key}
          className={`relative group w-full flex justify-center items-center p-2 rounded-lg cursor-pointer ${
            language === lang.key
              ? theme === "dark"
                ? "bg-blue-500 text-white"
                : "bg-blue-300 text-black"
              : theme === "dark"
              ? "hover:bg-gray-700"
              : "hover:bg-gray-300"
          }`}
          onClick={() => setLanguage(lang.key)}
        >
          {lang.icon}
          {/* Tooltip for language name */}
          <div
            className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 whitespace-nowrap ${
              theme === "dark" 
                ? "bg-gray-800 text-white" 
                : "bg-gray-200 text-black"
            }`}
          >
            {lang.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LanguageSelector;