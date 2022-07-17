import dotenv from "dotenv";

const envs = dotenv.config();
envs.error && new Error("Couldn't find .env file");

export default {
  port_server: Number(process.env.PORT_SERVER),
  bucket_name: process.env.BUCKET_NAME,
  mongo_url: process.env.MONGO_URL,
  storage_type: process.env.STORAGE_TYPE,
};
