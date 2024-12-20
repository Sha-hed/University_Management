import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';


const loginUser = async (payload: TLoginUser) => {
  console.log(payload);
  // is userExists with this id

  // const isUserExists = await User.findOne({ id: payload.id });

  const isUserExists = await User.isUserExistsByCustomId(payload.id);

  const isDeleted = await User.isUserDeleted(payload.id);

  if (!isUserExists) {
    throw new AppError(400, 'User Is Not Exists');
  }

  // const isDeleted = isUserExists?.isDeleted;

  if (isDeleted) {
    throw new AppError(400, 'User is Deleted!');
  }

  const isBlocked = isUserExists?.status;

  if (isBlocked === 'blocked') {
    throw new AppError(400, 'User is blocked!');
  }

  if (
    !(await User.isPasswordMatched(payload.password, isUserExists?.password))
  ) {
    throw new AppError(403, 'Password not matched');
  }

  const Payload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };

  const access_token = jwt.sign(
    {
      data: Payload,
    },
    config.jwt_secret as string,
    { expiresIn: '10d' },
  );

  // const isPasswordCorrect = await bcrypt.compare(payload.password, isUserExists?.password);
  // console.log(isPasswordCorrect);

  return {
    access_token,
    needsPasswordChanged: isUserExists?.needsPasswordChange
  };
};

export const AuthServices = { loginUser };
