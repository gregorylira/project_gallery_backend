import { Inject, Service } from 'typedi';

import PostModel from '../models/Post.model';
import TagModel from '../models/Tags.model';
import { deleteTags, getAllTags, isEmpty } from '../utils/validate.util';

@Service()
export default class PostService {
  constructor(
    @Inject('postRepository') private postRepository: Models.PostModel
  ) {
    this.postRepository = PostModel;
  }

  public async findOnePost(id: string) {
    try {
      const response = await this.postRepository.findById(id);

      if (isEmpty(response)) {
        throw new Error('Post not found!');
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deletePost(id: string) {
    try {
      const postResponse = await this.postRepository.findById(id);
      const postTag = postResponse.tag;

      if (isEmpty(postResponse)) {
        throw new Error('Post not found!');
      }

      await this.postRepository.findByIdAndDelete(id);

      await deleteTags(postTag, TagModel, this.postRepository);

      return;
    } catch (error) {
      throw error;
    }
  }

  public async getAllPosts(query: any) {
    const tag: string = query.tag.toString();
    const pagination: number = Number(query.page);

    const offset = 20;
    let nsfw = false;

    if (nsfw === false && !tag) {
      return await this.postRepository
        .find({ tag: { $ne: 'nsfw' } })
        .sort({ createdAt: -1 })
        .limit(offset)
        .skip(
          pagination === 0
            ? pagination * offset
            : pagination * offset + 3
        );
    }

    if (tag) {
      let tagList: string[] = [];

      tagList = tag.split(' ');

      if (tagList.length < 2) {
        tagList = [tagList[0]];
      }

      return await this.postRepository
        .find({
          tag: { $all: tagList },
        })
        .sort({ createdAt: -1 })
        .skip(pagination * offset)
        .limit(offset + 1);
    }

    return await this.postRepository
      .find()
      .sort({ createdAt: -1 })
      .skip(pagination * offset)
      .limit(offset + 1);
  }

  public async createPost(Image: any, tag: string) {
    const {
      originalname: name,
      size,
      key,
      location: url = '',
    } = Image;

    const tagList: string[] = tag.split(' ');
    const tagsResponse = await TagModel.find();

    if (isEmpty(tagsResponse)) {
      throw new Error('Tags not found!');
    }

    const tagsReturned: string[] = await getAllTags(tagsResponse);

    tagList.forEach(async (tag: string) => {
      if (!tagsReturned.includes(tag)) {
        await TagModel.create({
          tags: [tag],
        });
      }
    });

    if (isEmpty(tag)) {
      throw new Error('Invalid tag passed to post');
    }

    return await this.postRepository.create({
      name,
      size: size,
      key,
      tag: tagList,
      url,
    });
  }
}
