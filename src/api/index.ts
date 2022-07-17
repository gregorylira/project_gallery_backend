import { Router } from "express";
import multerConfig from "../config/multer";

import multer from "multer";

export default () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({
      status: "ok",
    });
  });

  router.post("/posts", multer(multerConfig).single("file"), (req, res) => {
    console.log(req.file);

    return res.status(200).json("imagem postada");
  });

  return router;
};
