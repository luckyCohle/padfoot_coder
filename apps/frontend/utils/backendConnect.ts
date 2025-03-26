import axios from "axios"
import { languageType } from "./types"

export const getOutput= async(language:languageType,code:string,input:any[])=>{
  try {
    const encodedCode = Buffer.from(code.trim(), 'utf-8').toString('base64');
    console.log("orignal COde:"+code);
    console.log("encodedCode"+encodedCode)

    const {data} = await axios.post('http://localhost:5001/execute', {
        language,
        code:encodedCode,
        inputData:input
      }, 
    )
    console.log(data);
    return data.output.output;
  } catch (error) {
    console.log("backend operation failed with error:");
    console.error(error);
  }
}