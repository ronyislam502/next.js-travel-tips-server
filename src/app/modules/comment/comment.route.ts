import { Router } from 'express';
import { CommentControllers } from './comment.controller';

const router = Router();

router.post('/create-comment', CommentControllers.createComment);

router.get('/', CommentControllers.getAllCommentsByPost);

router.patch('/update/:id', CommentControllers.createComment);

export const CommentRoutes = router;
