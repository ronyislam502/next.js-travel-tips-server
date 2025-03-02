/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import QueryBuilder from '../../builder/QueryBuilder';
import { TImageFile } from '../../interface/image';
import { userSearchableFields } from './user.constant';

import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (image: TImageFile, payload: TUser) => {
  const file = image;
  payload.profileImg = file?.path;

  // payload.profileImg = file?.path;

  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;

  return result;
};

const getSingleUsersFromDB = async (email: string) => {
  const result = await User.find({ email });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
};
