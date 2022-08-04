import { Inject, Service } from 'typedi';

import PostModel from '../models/Post.model';
import TagModel from '../models/Tags.model';
import { addTags, deleteTags, getAllTags, isEmpty } from '../utils/validate.util';

@Service()
export default class TagsService {
  constructor(
    @Inject('postRepository') private postRepository: Models.PostModel
  ) {
    this.postRepository = PostModel;
  }

  public async findAll() {
    try {
      const response = await TagModel.find();

      if (isEmpty(response)) {
        throw new Error('Tags not found!');
      }

      return await getAllTags(response);
    } catch (error) {
      throw error;
    }
  }

  public async changeTags(id: string, body: any) {
    try {
      const tagBody = body.tag.split(' ');

      await addTags(tagBody, TagModel, this.postRepository, id);

      const post = await this.postRepository.findById(id);
      const postTags = post.tag;

      const filteredTagsToDelete = postTags.filter(
        (tag: string) => !tagBody.includes(tag)
      );

      const filteredTagsRemainedInPost = postTags.filter(
        (tag: string) => tagBody.includes(tag)
      );

      const responsePost =
        await this.postRepository.findByIdAndUpdate(id, {
          tag: filteredTagsRemainedInPost,
        });

      await deleteTags(
        filteredTagsToDelete,
        TagModel,
        this.postRepository
      );

      return responsePost;
    } catch (error) {
      throw error;
    }
  }
}
