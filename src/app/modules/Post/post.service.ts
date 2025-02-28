import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TPost } from './post.interface';
import { Post } from './post.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { postSearch } from './post.constant';

const createPostIntoDB = async (payload: TPost) => {
  const user = await User.findById(payload.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not Found');
  }

  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find(), query)
    .search(postSearch)
    .filter()
    .sort()
    .fields();

  const result = await postQuery.modelQuery;

  return result;
};

const updatePostFromDB = async (_id: string, payload: Partial<TPost>) => {
  const isPostExists = await Post.findById(_id);

  if (isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not Found');
  }

  const isUser = payload?.userId;
  if (!isUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }

  const result = await Post.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  updatePostFromDB,
};
