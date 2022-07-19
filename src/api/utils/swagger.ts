import { Express, Request, Response } from "express";
const swaggerUi = require("swagger-ui-express");
import swaggerConfig from "./docs/swaggerJson.json";

import swaggerdocs from "./docs/swagger";

export function swaggerDocs(app: Express, port: number) {
  // swagger page
  app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerdocs));

  // docs in json format

  console.log(`Docs available at http://localhost:${port}/v1/docs`);
}
