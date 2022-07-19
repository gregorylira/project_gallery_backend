import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import paths from "./Paths";
import components from "./components";

dotenv.config();

const swaggerconfig = {
  openapi: "3.0.0",
  info: {
    title: "API ",
    description:
      "Essa API tem como objetivo controlar a cadeira e registrar testes",
    termsOfService: "http://google.com",
    contact: {
      email: "gregory.lira@gmail.com",
    },
  },
  version: "1.0.0",
  servers: [
    {
      url: process.env.URL_APP + "/v1/",
    },
    {
      url: "http://localhost:3002/v1/",
    },
  ],

  apis: ["../src/api/index.ts"],
  paths: paths,
  components: components,
};

export default swaggerconfig;
