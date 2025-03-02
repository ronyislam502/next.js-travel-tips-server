import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Post } from '../Post/post.model';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createCommentIntoDB = async (payload: TComment) => {
  const isPost = await Post.findById(payload.postId);

  if (!isPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const isUser = await Post.findById(payload.userId);

  if (isUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Comment.create(payload);

  return result;
};

const getAllCommentsByPostFromDB = async (
  payload: TComment,
  query: Record<string, unknown>,
) => {
  // const isPostExists = await Post.findById(payload.postId);

  // console.log('post', isPostExists);

  // if (!isPostExists) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  // }

  const commentQuery = new QueryBuilder(
    Comment.find().populate('postId').populate('userId'),
    query,
  ).sort();

  const result = await commentQuery.modelQuery;

  return result;
};

const updateCommentByPostIntoDB = async (
  _id: string,
  payload: Partial<TComment>,
) => {
  const isCommentExists = await Comment.findById(_id);

  if (!isCommentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  const isUser = isCommentExists?.userId;
  if (!isUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }

  const isPostExists = isCommentExists?.postId;

  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const result = await Comment.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCommentByPostFromDB = async (id: string) => {
  const isCommentExists = await Comment.findById(id);

  if (!isCommentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  const isUser = isCommentExists.userId;
  if (!isUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }
  const result = await Comment.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CommentServices = {
  createCommentIntoDB,
  getAllCommentsByPostFromDB,
  updateCommentByPostIntoDB,
  deleteCommentByPostFromDB,
};
