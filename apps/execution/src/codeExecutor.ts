import fs from "fs"
import tmp from "tmp"
import Dockerode from "dockerode"
import { languageType } from "../types/language"
import { getFileExtension } from "../utils/fileExtension"
import { runDockerContainer } from "../utils/runDocker"
import path from "path"

const docker = new Dockerode()

export default function executeCode(language:languageType, code:string, inputData:any[] = []) {
    return new Promise((resolve, reject) => {
      // Step 1: Create temp file
      tmp.file({ postfix: getFileExtension(language) }, (err, tmpPath, fd, cleanupCallback) => {
        if (err) return reject(err);
        console.log("tmpPath:"+tmpPath)
        // Step 2: Write code to temp file
        fs.writeFile(tmpPath, code, async (writeErr) => {
          if (writeErr) {
            cleanupCallback();
            return reject(writeErr);
          }
          // console.log("File content before execution:", fs.readFileSync(tmpPath, "utf8"));
          let newFilePath="";
          if(language == "java"){
            const match = code.match(/public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/)||["code"];
            const newFileName = match[1]+".java"||code;
            const dir= path.dirname(tmpPath);
             newFilePath = path.join(dir,newFileName)
            fs.rename(tmpPath, newFilePath, (renameErr) => {
              if (renameErr) {
                  console.error('Error renaming file:', renameErr);
                  return;
              }
      
              console.log(`Temporary file renamed to: ${newFilePath}`);
          });
          }
          
          // Step 3: Run Docker container
          const filePath = language == "java"? newFilePath : tmpPath;
          console.log("FilePath: "+filePath)
          const executionOutput = await runDockerContainer(language, filePath,code,inputData, cleanupCallback)
            .then(resolve)
            .catch(reject);
            return executionOutput;
        });
      });
    });
  }