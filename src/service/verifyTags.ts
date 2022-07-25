import Post from "../models/Post";
import Tags from "../models/Tags";

export async function deleteTags(tag: string[]) {
  const tags = await Tags.find();
  let listatags = tags[0].tags;
  for (let i = 0; i < tag.length; i++) {
    const posts = await Post.find({ tag: { $eq: tag[i] } });

    if (posts.length === 1) {
      listatags = listatags.filter((tagf) => tagf !== tag[i]);
    }
  }

  await Tags.findByIdAndUpdate(tags[0]._id, {
    tags: listatags,
  });
}
export async function addTags(tag: string[]) {
  const tags = await Tags.find();
  let listatags = tags[0].tags;
  for (let i = 0; i < tag.length; i++) {
    const posts = await Post.find({ tag: { $eq: tag[i] } });

    if (posts.length === 0) {
      listatags.push(tag[i]);
    }
  }

  await Tags.findByIdAndUpdate(tags[0]._id, {
    tags: listatags,
  });
}
