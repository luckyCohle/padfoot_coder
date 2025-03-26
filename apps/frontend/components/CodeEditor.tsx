"use client";
import { useCompilerContext } from "@/context/AppContext";
import { getBoilerplate } from "@/utils/boilerplate";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

function CodeEditor() {
  const { theme, code, setCode, language } = useCompilerContext();
  const bgTheme = theme === "dark" ? "vs-dark" : "vs-light";
  const monaco = useMonaco();

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  useEffect(() => {
    setCode(getBoilerplate(language))
    if (monaco) {
      if (language === "javascript") {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false, // Ensure syntax errors are checked
        });
      } else {
        // For other languages (like C, C++, Python), we need custom validation
        monaco.languages.register({ id: language });
        monaco.editor.setModelLanguage(monaco.editor.getModels()[0], language);
      }
    }
  }, [monaco, language]);

  return (
    <div className="flex-1 w-full">
      <Editor
        language={language}
        theme={bgTheme}
        value={code}
        defaultValue={getBoilerplate(language)}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;
