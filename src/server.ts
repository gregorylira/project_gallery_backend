import ConfigServer from "./initializer/app";

export const __baseDir = __dirname;

class Server {
  public static async start(): Promise<void> {
    const app = new ConfigServer();
    await app.init();
    app.start();
  }
}

Server.start();
