import fs from "fs";
import tmp from "tmp";
import Dockerode from "dockerode";
import { languageType } from "../types/language";
import { getFileExtension } from "../utils/fileExtension";
import { runDockerContainer } from "../utils/runDocker";
import path from "path";

const docker = new Dockerode();

export default function executeCode(language: languageType, code: string, inputData: any[] = []) {
    return new Promise((resolve, reject) => {
        // Step 1: Create temp file
        tmp.file({ postfix: getFileExtension(language) }, (err, tmpPath, fd, cleanupCallback) => {
            if (err) return reject(err);
            console.log("tmpPath:", tmpPath);

            // Step 2: Write code to temp file
            fs.writeFile(tmpPath, code, async (writeErr) => {
                if (writeErr) {
                    cleanupCallback();
                    return reject(writeErr);
                }

                let newFilePath = tmpPath;

                if (language === "java") {
                    // Match the first class declaration (public or default)
                    const match = code.match(/\b(public\s+)?class\s+([A-Za-z_][A-Za-z0-9_]*)/);
                    
                    if (!match) {
                        console.error("Error: No class found in Java code.");
                        cleanupCallback();
                        return reject(new Error("Java code must contain at least one class"));
                    }

                    const className = match[2]; // Extract the class name
                    const newFileName = className + ".java";
                    const dir = path.dirname(tmpPath);
                    newFilePath = path.join(dir, newFileName);

                    try {
                        fs.renameSync(tmpPath, newFilePath);
                        console.log(`Temporary file renamed to: ${newFilePath}`);
                    } catch (renameErr) {
                        console.error("Error renaming file:", renameErr);
                        return reject(renameErr);
                    }
                }

                // Step 3: Run Docker container
                console.log("FilePath:", newFilePath);
                const executionOutput = await runDockerContainer(language, newFilePath, code, inputData, cleanupCallback)
                    .then(resolve)
                    .catch(reject);
                
                return executionOutput;
            });
        });
    });
}
