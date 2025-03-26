import React, { useState } from "react";
import { Sun, Moon, Play } from "lucide-react";
import { useCompilerContext } from "@/context/AppContext";
import { getOutput } from "@/utils/backendConnect";
import { getBoilerplate } from "@/utils/boilerplate";
import Spinner from "./Spinner";

function EditorToolBar() {
  const { theme, setTheme ,code,setCode ,input,language ,setOutput} = useCompilerContext();
  const [isLoading,setIsLoading] = useState<boolean>(false);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  const bgColor= theme === "dark"?" bg-gray-800":" bg-gray-200"
  const btnColor= theme === "dark"?" bg-gray-700":" bg-white"
  const btnHoverColor= theme === "dark"?" hover:bg-gray-700":" hover:bg-gray-400"
  const textColor = theme === "dark"?" text-white":" text-black"


  const handleClick = async ()=>{
    if (code === "") {
        setCode(getBoilerplate(language))
    } 
    setIsLoading(true);
    console.log(`language: ${language}\n code: ${code}\n inputData:${input}`)
    const outputData = await getOutput(language,code,input);
    setIsLoading(false);

    setOutput(outputData);
  }

  return (
    <div className={`h-12 flex justify-between items-center px-4 ${bgColor} shadow-md`}>
      <button
        onClick={toggleTheme}
        className={`flex items-center gap-2 ${btnColor} ${btnHoverColor} ${textColor} px-4 py-1 rounded transition`}
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        <span className="text-sm">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
      </button>

      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-1 rounded font-bold transition"
              onClick={handleClick}        
        >
       {isLoading?<Spinner />: <Play size={18} />}
        Run
      </button>
    </div>
  );
}

export default EditorToolBar;
