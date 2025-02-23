import { Router } from 'express';
import { UserControllers } from './user.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import { parseBody } from '../../middlewares/bodyParse';

const router = Router();

router.post(
  '/create-user',
  upload.single('file'),
  parseBody,
  UserControllers.createUser,
);

router.get('/', UserControllers.getAllUsers);

router.get('/:email', UserControllers.getSingleUser);

export const UserRoutes = router;
