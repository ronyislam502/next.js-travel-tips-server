import { Types } from 'mongoose';
import httpStatus from 'http-status';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import { TFollower } from './follower.interface';

const followUserIntoDB = async (payload: TFollower) => {
  // Convert string IDs to ObjectId
  const userObjectId = new Types.ObjectId(payload?.user);
  const targetedObjectId = new Types.ObjectId(payload?.follower);

  const [user, targetedUser] = await Promise.all([
    User.findById(userObjectId),
    User.findById(targetedObjectId),
  ]);

  if (!user || !targetedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isFollowing = targetedUser?.followers?.includes(userObjectId);

  const session = await User.startSession();
  session.startTransaction();

  try {
    if (isFollowing) {
      await User.updateOne(
        { _id: userObjectId },
        { $pull: { following: targetedObjectId } },
      ).session(session);

      await User.updateOne(
        { _id: targetedObjectId },
        { $pull: { followers: userObjectId } },
      ).session(session);
      await session.commitTransaction();
      return 'Unfollowed successfully';
    } else {
      await User.updateOne(
        { _id: userObjectId },
        { $addToSet: { following: targetedObjectId } },
      ).session(session);
      await User.updateOne(
        { _id: targetedObjectId },
        { $addToSet: { followers: userObjectId } },
      ).session(session);
      await session.commitTransaction();
      return 'Followed successfully';
    }
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error processing request',
    );
  } finally {
    session.endSession();
  }
};

const getFollowersByUser = async (id: string) => {
  const user = await User.findById(id)
    .populate('user', 'username profilePicture')
    .select('followers');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  return { following: user.following };
};

const getFollowingFromDB = async (id: string) => {
  const user = await User.findById(id)
    .populate('user', 'username profilePicture')
    .select('followers');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  return { following: user.following };
};

export const FollowerServices = {
  followUserIntoDB,
  getFollowersByUser,
  getFollowingFromDB,
};
