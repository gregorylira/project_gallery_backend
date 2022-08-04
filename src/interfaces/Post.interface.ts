import { Document } from 'mongoose';

export interface PostModelI extends Document {
  _id: string;
  name: string;
  size: number;
  key: string;
  url: string;
  tag: string[];
  createdAt: Date;
  __v: number;
}
