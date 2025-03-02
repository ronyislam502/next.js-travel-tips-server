import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';
import { TImageFiles } from '../../interface/image';
import AppError from '../../errors/AppError';

const createPost = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(httpStatus.NOT_FOUND, 'please upload image file');
  }

  const result = await PostServices.createPostIntoDB(
    req.files as TImageFiles,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post create successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.updatePostFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  updatePost,
};
