import { Document } from 'mongoose';

export interface TagModelI extends Document {
  _id: string;
  tags: string;
  __v: number;
}
