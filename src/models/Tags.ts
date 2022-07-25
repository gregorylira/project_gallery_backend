import mongoose from "mongoose";

const Tag = new mongoose.Schema({
  tags: [String],
});

export default mongoose.model("Tags", Tag);
