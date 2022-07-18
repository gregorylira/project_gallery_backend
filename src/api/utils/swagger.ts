import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

const swaggerdocs = require("./docs/swagger");

export function swaggerDocs(app: Express, port: number) {
  // swagger page
  app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerdocs));

  // docs in json format

  console.log(`Docs available at http://localhost:${port}/v1/docs`);
}
