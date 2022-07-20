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
      const { tag } = req.body;
      if (!tag) throw new Error("Invalid tag passed to post");
      const post = await Post.create({
        name,
        size: size,
        key,
        tag,
        url,
      });

      return res.status(200).json(post);
    }
  );

  router.get("/posts", async (req, res) => {
    const posts = await Post.find();

    if (req.query.tag) {
      const postsFilter = posts.filter((e) => e.tag === req.query.tag);

      return res.status(200).json(postsFilter);
    }

    return res.status(200).json(posts);
  });

  router.delete("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
  });

  router.get("/posts/tags", async (req, res) => {
    const posts = await Post.find();
    const listRaw = posts.map((e) => e.tag);
    const unique = [...new Set(listRaw)];

    return res.status(200).json(unique);
  });

  return router;
};
