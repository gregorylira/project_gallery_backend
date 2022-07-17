import mongoose from "mongoose";
import aws from "aws-sdk";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import env from "../config";

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  tags: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

PostSchema.pre("save", function () {
  if (!this.url) this.url = `${process.env.URL_APP}/files/${this.key}`;
});

PostSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === "s3") {
    s3.deleteObject({
      Bucket: env.bucket_name,
      Key: this.key,
    }).promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
});

export default mongoose.model("Post", PostSchema);
