import Post from "../models/Post";

export async function verifyTags(tag: string) {
  const posts = await Post.find({ tag: { $eq: tag } });

  if (posts.length > 1) return true;
  else return false;
}
