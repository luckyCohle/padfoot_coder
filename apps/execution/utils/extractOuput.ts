import Dockerode from "dockerode";

export default async function execAndCapture(container:Dockerode.Container, cmd: string[]): Promise<{ output: string, exitCode: number }> {
  try {
    // Check if container is running before executing command
    const containerInfo = await container.inspect();
    if (!containerInfo.State.Running) {
      return { output: "Container is not running", exitCode: 1 };
    }
    
    const exec = await container.exec({
      Cmd: cmd,
      AttachStdout: true,
      AttachStderr: true
    });

    const stream = await exec.start({ hijack: true, stdin: false });
    let output = "";
    
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => {
        output += chunk.toString('utf8');
      });
      
      stream.on('end', async () => {
        try {
          const inspect = await exec.inspect();
          // Clean the output by removing control characters
          const cleanOutput = output.replace(/[\x00-\x1F\x7F]/g, "");
          resolve({ output: cleanOutput, exitCode: inspect.ExitCode || 0 });
        } catch (err) {
          // If inspect fails, the container might have stopped
          resolve({ output, exitCode: 1 });
        }
      });
      
      stream.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    return { output: `Execution error: ${error}`, exitCode: 1 };
  }
}