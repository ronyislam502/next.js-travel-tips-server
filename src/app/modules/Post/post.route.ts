import { Router } from 'express';
import { PostControllers } from './post.controller';
import { parseBody } from '../../middlewares/bodyParse';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post(
  '/create-post',
  multerUpload.fields([{ name: 'files' }]),
  parseBody,
  PostControllers.createPost,
);

router.get('/', PostControllers.getAllPosts);

router.patch('/update/:id', PostControllers.updatePost);

export const PostRoutes = router;
