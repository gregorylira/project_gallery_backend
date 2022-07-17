import dotenv from "dotenv";

const envs = dotenv.config();
envs.error && new Error("Couldn't find .env file");

export default {
  port_server: Number(process.env.PORT_SERVER),
};
