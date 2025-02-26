import { Types } from 'mongoose';

export type TPost = {
  user: Types.ObjectId;
  title: string;
  images?: string[];
  category: string;
  tags: 'premium' | 'everyone';
  comments?: string[];
  upVotes?: Types.ObjectId[];
  downVotes?: Types.ObjectId[];
  isDelete: boolean;
};
