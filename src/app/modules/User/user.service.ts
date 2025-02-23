/* eslint-disable @typescript-eslint/no-explicit-any */

import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { userSearchableFields } from './user.constant';

import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (file: any, payload: TUser) => {
  if (file) {
    const imageName = `${payload?.name}`;
    const path = file?.path;
    const img_url = await sendImageToCloudinary(imageName, path);
    payload.profileImg = img_url as string;
  }
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
