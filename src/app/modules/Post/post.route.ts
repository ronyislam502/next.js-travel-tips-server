import { Router } from 'express';
import { PostControllers } from './post.controller';

const router = Router();

router.post('/create-post', PostControllers.createPost);

router.get('/', PostControllers.getAllPosts);

router.patch('/update/:id', PostControllers.getAllPosts);

export const PostRoutes = router;
