import { Router } from 'express';
import { CommentControllers } from './comment.controller';

const router = Router();

router.post('/create-comment', CommentControllers.createComment);

router.get('/', CommentControllers.getAllCommentsByPost);

router.patch('/update/:id', CommentControllers.createComment);

router.delete('/delete/:id', CommentControllers.deleteCommentByPost);

export const CommentRoutes = router;
