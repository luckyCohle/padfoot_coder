import { compiledLanguages, languageType } from "../types/language";
import path from "path";
import { extractDependencies, getCompileCommand, getDependencies, getInstallCommand, getRunCommand } from "./command";
import { getDockerImage } from "./getImage";
import Dockerode from "dockerode";
import fs from "fs";
import execAndCapture from "./extractOuput";

const docker = new Dockerode();

interface returnType {
  status: number;
  output: string;
  dependencies: {
    requested?: string[],
    installed?: string[];
    error?: string;
  }
}

export const runDockerContainer = async(
  language: languageType, 
  tmpPath: string,
  code: string,
  inputData: any[] = [], 
  cleanupCallback: () => void
): Promise<returnType> => {
  // Create input file locally to avoid container permission issues
  const directoryPath = path.dirname(tmpPath);
  const filename = path.basename(tmpPath);
  const inputFilePath = path.join(directoryPath, "input.txt");
  
  // Convert input array into a string with new lines
  const inputString = inputData.join("\n") + "\n";
  const isInputPresent: boolean = inputData.length !== 0;
  
  // Write input to file if needed
  if (isInputPresent) {
    try {
      fs.writeFileSync(inputFilePath, inputString);
    } catch (error) {
      return {
        status: 1,
        output: `Error creating input file: ${error}`,
        dependencies: {
          requested: [],
          installed: []
        }
      };
    }
  }
  
  // Get dependencies
  const safeDependencies = getDependencies(language, code);
  const installCommandList = safeDependencies.map(dep=>{return getInstallCommand(dep,language)})
  
  console.log(`Executing with dependencies: ${safeDependencies.join(', ')}`);
  
  const dockerImage = getDockerImage(language);
  
  const containerConfig = {
    Image: dockerImage,
    // Add a simple command that keeps the container running
    Cmd: ["tail", "-f", "/dev/null"],
    HostConfig: {
      Memory: 128 * 1024 * 1024,
      MemorySwap: 128 * 1024 * 1024,
      CpuPeriod: 100000,
      CpuQuota: 25000,
      NetworkMode: 'none',
      ReadonlyRootfs: false,
      Binds: [`${directoryPath}:/app:rw`]
    },
    WorkingDir: '/app'
  };
  
  let container = null;
  try {
    container = await docker.createContainer(containerConfig);
    await container.start();
    
    // Wait a moment for the container to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let combinedOutput = "";
    
    // Install dependencies if needed
    if (safeDependencies.length > 0) {
      for (const dependency of safeDependencies) {
        // const installCmd = getInstallCommand([dependency], language);
        const { output, exitCode } = await execAndCapture(container, installCommandList);
        
        combinedOutput += output + "\n";
        
        if (exitCode !== 0) {
          return {
            status: exitCode,
            output: `Dependency installation failed for ${dependency}: ${output}`,
            dependencies: {
              requested: extractDependencies(language, code),
              installed: []
            }
          };
        }
      }
    }
    
    // Compile if needed
    if (compiledLanguages.includes(language)) {
      const compileCmd = getCompileCommand(language, filename);
      const { output, exitCode } = await execAndCapture(container, compileCmd);
      
      combinedOutput += output + "\n";
      
      if (exitCode !== 0) {
        return {
          status: exitCode,
          output: `Compilation failed: ${output}`,
          dependencies: {
            requested: extractDependencies(language, code),
            installed: safeDependencies
          }
        };
      }
    }
    
    // Run the code
    let runResult;
    if (isInputPresent) {
      runResult = await execAndCapture(
        container,
        ["sh", "-c", `${getRunCommand(language, filename).join(" ")} < input.txt`]
      );
    } else {
      runResult = await execAndCapture(
        container,
        getRunCommand(language, filename)
      );
    }
    
    combinedOutput += runResult.output;
    
    const allDependencies = extractDependencies(language, code);
    
    return {
      status: runResult.exitCode,
      output: combinedOutput,
      dependencies: {
        requested: allDependencies,
        installed: safeDependencies
      }
    };
  } catch (error) {
    console.log("Docker run error:\n", error);
    
    return {
      status: 1,
      output: `Error: ${error}`,
      dependencies: {
        error: 'Failed to process dependencies'
      }
    };
  } finally {
    // Clean up
    if (container) {
      try {
        await container.remove({ force: true });
      } catch (e) {
        console.error('Error removing container:', e);
      }
    }
    
    // Clean up input file if created
    if (isInputPresent && fs.existsSync(inputFilePath)) {
      try {
        fs.unlinkSync(inputFilePath);
      } catch (e) {
        console.error('Error removing input file:', e);
      }
    }
    
    cleanupCallback(); // Delete the temp file
  }
};