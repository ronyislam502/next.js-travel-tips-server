import { Router } from 'express';
import { UserControllers } from './user.controller';
import { parseBody } from '../../middlewares/bodyParse';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post(
  '/create-user',
  multerUpload.single('file'),
  parseBody,
  UserControllers.createUser,
);

router.get('/', UserControllers.getAllUsers);

router.get('/:email', UserControllers.getSingleUser);

export const UserRoutes = router;
