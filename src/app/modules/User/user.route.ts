import { NextFunction, Request, Response, Router } from 'express';
import { UserControllers } from './user.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = Router();

router.post(
  '/create-user',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  UserControllers.createUser,
);

export const UserRoutes = router;
