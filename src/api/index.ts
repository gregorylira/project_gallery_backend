import { Router } from "express";
import multerConfig from "../config/multer";
import Post from "../models/Post";

import multer from "multer";
import Tags from "../models/Tags";
import { verifyTags } from "../service/verifyTags";

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

      try {
        req.body.tag = req.body.tag.split(" ");
      } catch (error) {}
      const tag = req.body.tag;

      const tags = await Tags.find();
      let listaNovaTag = [...tags[0].tags];
      tag.map((e) => !tags[0].tags.includes(e) && listaNovaTag.push(e));
      if (listaNovaTag.length > tags[0].tags.length) {
        await Tags.findByIdAndUpdate(tags[0]._id, {
          tags: listaNovaTag,
        });
      }

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
    const page = req.query.page;
    const pagination = Number(page) || 0;
    const offset = 20;

    if (!req.query.nsfw) {
      req.query.nsfw = "false";
    }

    if (req.query.nsfw === "false" && !req.query.tag) {
      const noNsfw = await Post.find({ tag: { $ne: "nsfw" } })
        .sort({ createdAt: -1 })
        .skip(pagination === 0 ? pagination * offset : pagination * offset + 2)
        .limit(offset);
      return res.status(200).json(noNsfw);
    }

    if (req.query.tag) {
      try {
        req.query.tag = req.query.tag.toString().split(" ");
        if (req.query.tag.length < 2) {
          req.query.tag = req.query.tag[0];
        }
      } catch (error) {}

      const postsFilter = await Post.find({ tag: { $eq: req.query.tag } })
        .sort({ createdAt: -1 })
        .skip(pagination * offset)
        .limit(offset + 1);

      return res.status(200).json(postsFilter);
    }

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(pagination * offset)
      .limit(offset + 1);

    return res.status(200).json(posts);
  });

  router.delete("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    const tags = await Tags.find();
    let listatags = tags[0].tags;

    post.tag.forEach(async (tag) => {
      const test = await verifyTags(tag);

      if (test) {
      } else {
        listatags = listatags.filter((tagf) => tagf !== tag);
        await Tags.findByIdAndUpdate(tags[0]._id, {
          tags: listatags,
        });
      }
    });

    await post.remove();

    return res.send();
  });

  router.get("/posts/tags", async (req, res) => {
    const posts = await Tags.find();

    return res.status(200).json(posts[0].tags);
  });

  return router;
};
