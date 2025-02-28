import { model, Schema } from 'mongoose';
import { TComment } from './comment.interface';

const commentSchema = new Schema<TComment>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

commentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

commentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

commentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Comment = model<TComment>('Comment', commentSchema);
