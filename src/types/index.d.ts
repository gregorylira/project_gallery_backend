import { Model } from 'mongoose';

import { PostModelI } from '../interfaces/Post.interface';

declare global {
  namespace Models {
    export type PostModel = Model<PostModelI>;
  }
}
