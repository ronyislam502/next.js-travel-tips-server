import { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    enum: {
      values: ['premium', 'everyone'],
    },
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: [],
    },
  ],
  upVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

postSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

postSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

postSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
export const Post = model<TPost>('Post', postSchema);
