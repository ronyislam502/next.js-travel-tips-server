import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { PostRoutes } from '../modules/Post/post.route';
import { CommentRoutes } from '../modules/comment/comment.route';
import { FollowRoutes } from '../modules/follower/follower.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/followers',
    route: FollowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
