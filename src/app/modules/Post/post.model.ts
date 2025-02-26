import { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    upVotes: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    downVotes: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    comments: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: {
      type: String,
      enum: {
        values: ['premium', 'everyone'],
      },
      default: 'everyone',
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

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
