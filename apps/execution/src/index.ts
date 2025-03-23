import express from "express"
import executeCode from "./codeExecutor";
import { executeCodeInput } from "../types/zodType";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/execute",async (req,res)=>{
  const requestBody= req.body;
  try {
    const parsedBody = executeCodeInput.safeParse(requestBody);
    
    if(!parsedBody.success){
      res.status(400).send({
        message:"request body is of invalid type",
      })
      return;
    }
    const decodedCode = Buffer.from(req.body.code, "base64").toString("utf-8");
    // console.log("decodedCode: "+decodedCode)
    const output = await executeCode(requestBody.language,decodedCode,requestBody.inputData);
    res.send({
      output
    })

  } catch (error) {
    res.status(500).send({
      message:"code execution failed",
      error
    })
  }
})

const port = 5001;
app.listen(port,()=>console.log("execution server listing to port "+port));