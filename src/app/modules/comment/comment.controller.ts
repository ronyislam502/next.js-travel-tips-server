import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createCommentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment successfully',
    data: result,
  });
});

const getAllCommentsByPost = catchAsync(async (req, res) => {
  const result = await CommentServices.getAllCommentsByPostFromDB(
    req.body,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post by comment retrieved successfully',
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.updateCommentByPostIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments update successfully',
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  updateComment,
  getAllCommentsByPost,
};
