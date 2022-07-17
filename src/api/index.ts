import { Router } from "express";
import multerConfig from "../config/multer";
import Post from "../models/Post";

import multer from "multer";

export default () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({
      status: "ok",
    });
  });

  router.post(
    "/posts",
    multer(multerConfig).single("file"),
    async (req, res) => {
      const { originalname: name, size, key, location: url = "" } = req.file;
      const post = await Post.create({
        name,
        size: size,
        key,
        url,
      });

      return res.status(200).json(post);
    }
  );

  router.get("/posts", async (req, res) => {
    const posts = await Post.find();

    return res.status(200).json(posts);
  });

  router.delete("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
  });

  return router;
};
