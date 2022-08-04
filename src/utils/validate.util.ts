export const isEmpty = (obj: any) => {
  if (obj === null || obj === undefined || obj === '') {
    return true;
  }
  return false;
};

export const removeOne = (arr: string[], value: string) => {
  return arr.filter((item: string) => item !== value);
};

export const getAllTags = async (arr: any[]) => {
  const tagList: string[] = [];

  arr.map((tags) => {
    tags.tags.forEach((tag) => {
      tagList.push(tag);
    });
  });

  return tagList;
};

export const deleteTags = async (
  tag: string[],
  tagsModel: any,
  postModel: any
) => {
  const responseTags = await tagsModel.find();

  tag.forEach(async (tag: string) => {
    const posts = await postModel.find({ tag: { $eq: tag } });

    if (posts.length === 0) {
      masterDeleteTag(tag, tagsModel);
    }
  });

  function masterDeleteTag(tagToDelete: string, tagsModel: any) {
    responseTags.forEach((tagObJ: any) => {
      tagObJ.tags.forEach(async (tag: string) => {
        if (tag === tagToDelete) {
          await tagsModel.findByIdAndDelete(tagObJ._id);
        }
      });
    });
  }
};

export const addTags = async (
  tag: string[],
  tagsModel: any,
  postModel: any,
  postId: string
) => {
  const responsePost = await postModel.findById(postId);
  const responseTags = await tagsModel.find();

  const allStringTags = await getAllTags(responseTags);
  const tagsInPost = responsePost.tag;

  let notAddedTags: string[] = [];

  tag.forEach((newTag: string) => {
    if (!allStringTags.includes(newTag)) {
      notAddedTags.push(newTag);
    }

    if (!tagsInPost.includes(newTag)) {
      tagsInPost.push(newTag);
    }
  });

  await postModel.findByIdAndUpdate(postId, {
    tag: tagsInPost,
  });

  notAddedTags.forEach(async (tag: string) => {
    const newTag = new tagsModel({
      tags: [tag],
    });
    await newTag.save();
  });
};
