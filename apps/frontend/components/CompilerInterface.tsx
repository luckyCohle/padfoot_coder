import { useCompilerContext } from "@/context/AppContext";
import React from "react";

function CompilerInterface() {
  const { theme,output,setInput } = useCompilerContext();
  
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-gray-200";
  const btnColor = theme === "dark" ? "bg-gray-600" : "bg-white";
  const btnHoverColor = theme === "dark" ? "hover:bg-gray-500" : "hover:bg-gray-400";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const bgColor2 = theme === "dark" ? "bg-gray-700" : "bg-gray-200";
  const bgColor3 = theme === "dark" ? "bg-black" : "bg-white";
  const textColor2 = theme === "dark" ? "text-gray-300" : "text-gray-800";
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const data = event.target.value;
    const inputArray = data.split("\n").map(line => line.trim()).filter(line => line !== "");
    setInput(inputArray);
  };
  


  return (
    <div className={`h-full flex flex-col space-y-4 ${bgColor} ${textColor}`}>
      {/* Input Section */}
      <div className={`rounded-lg shadow-lg flex flex-col ${bgColor}`}>
        <div className={`flex justify-between items-center px-4 py-2 ${bgColor2}`}>
          <p className="font-semibold">Input</p>

        </div>
        <div className={`flex-1 p-4 ${bgColor3}`}>
          <textarea className={`w-full h-32 p-2 rounded ${bgColor2} ${textColor2}`} placeholder="Enter your input here...place each input element in seperate line" onChange={handleInputChange}></textarea>
        </div>
      </div>
      
      {/* Output Section */}
      <div className={`rounded-lg shadow-lg flex flex-col flex-1 ${bgColor}`}>
        <div className={`flex justify-between items-center px-4 py-2 ${bgColor2}`}>
          <p className="font-semibold">Output</p>
          <button className={`${btnColor} ${btnHoverColor} ${textColor} font-bold px-3 py-1 rounded transition`}>
            Clear
          </button>
        </div>
        <div className={`flex-1 p-4 ${bgColor3} h-full`}>
          <p className={`${textColor2} text-sm h-full`}>{output}</p>
        </div>
      </div>
    </div>
  );
}

export default CompilerInterface;
