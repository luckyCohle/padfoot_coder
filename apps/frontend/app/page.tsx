"use client";
import CodeEditor from "@/components/CodeEditor";
import Navbar from "@/components/Navbar";
import { getBoilerplate } from "@/utils/boilerplate";
import { CompilerProvider, useCompilerContext } from "@/context/AppContext";
import EditorToolBar from "@/components/EditorToolBar";
import Output from "@/components/CompilerInterface";
import LanguageSelector from "@/components/LanguageSelector";
import { useState, useEffect } from "react";

function HomeContent() {
  const { language } = useCompilerContext();
  const [boilerplate, setBoilerplate] = useState(getBoilerplate(language));
  const {theme}=useCompilerContext();

  useEffect(() => {
    setBoilerplate(getBoilerplate(language));
  }, [language]);

  return (
    <div className={`h-[100vh] flex flex-col ${theme === "dark"?"bg-gray-900":"bg-white"}`}>
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Language Selector (Left Sidebar) */}
        <div className={` w-1/12 h-full border-r border-gray-700  ${theme === "dark"?"bg-gray-800":"bg-white"} flex justify-center`}>
          <LanguageSelector />
        </div>

        {/* Code Writing Section (Middle) */}
       <div className="flex flex-1">
       <div className="flex flex-col w-1/2 h-full">
          <EditorToolBar />
          <CodeEditor />
        </div>

        {/* Output Section (Right) */}
        <div className="w-1/2 h-full bg-gray-800 border-l border-gray-700">
          <Output />
        </div>
       </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <CompilerProvider>
      <HomeContent />
    </CompilerProvider>
  );
}
