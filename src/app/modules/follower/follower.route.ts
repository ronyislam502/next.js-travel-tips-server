import { Router } from 'express';
import { FollowerControllers } from './follower.controller';

const router = Router();

router.patch('/follower', FollowerControllers.followUser);

router.get('/userFollowers', FollowerControllers.getFollowers);

router.get('/userFollowings', FollowerControllers.getFollowings);

export const FollowRoutes = router;
