/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {};
  // if password not given, use default password

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(404, 'Admission semester not found.');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    userData.password = (password || config.default_password) as string;
    // set student role
    userData.role = 'student';
    // set manually id

    // create a user transaction-01
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed To Create User!');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference id

    //create a student ==> transaction-02
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(400, 'Failed To Create Student!');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = { createStudentIntoDB };
