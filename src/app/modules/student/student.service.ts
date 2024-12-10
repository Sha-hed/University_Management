/* eslint-disable @typescript-eslint/no-unused-vars */
// import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchAbleFields } from './student.constant';

// const createStudentIntoDB = async (studentData: TStudent) => {
//   // if(await Student.isUserExists(studentData.id)){
//   //   throw new Error('User Already Exists Man, Statics Methods')
//   // }

//   const result = await Student.create(studentData); // Buildin Static Method
//   // const student = new Student(studentData); // Build in instance method

//   // if(await student.isUserExists(studentData.id)){
//   //  throw new Error("Student Already Exists");
//   // }

//   // const result = await student.save();

//   return result;
// };

const getAllStudentFrom = async (query: Record<string, unknown>) => {
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const queryObj = { ...query };
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach((el) => delete queryObj[el]);

  // console.log('Query Object ta ke dekhbo ', queryObj);
  // console.log('Query gula ', query);

  // // { email: {$regex : 'text', options: 'i'}}

  // const studentSearchAbleFields = ['email', 'name.firstName', 'presentAddress'];

  // const searchQuery = Student.find({
  //   $or: studentSearchAbleFields.map((field) => {
  //     return { [field]: { $regex: searchTerm, $options: 'i' } };
  //   }),
  // });

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'admissionDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let limit = 10;
  // if (query.limit) {
  //   limit = query.limit as number;
  // }

  // let page = 1;
  // let skip = 1;

  // if(query.page){
  //   page = Number(query?.page);
  //   skip = (page-1)*limit
  // }

  // const paginateQuery = sortQuery.skip(skip)

  // const limitQuery = paginateQuery.limit(limit);

  // // field limiting

  // let fields = '-__v';
  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ');
  //   console.log(fields);
  // }

  // const fieldFiltering =await limitQuery.select(fields)

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'admissionDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};
const getSingleStudentData = async (id: string) => {
  console.log(id);
  const result = await Student.findById({ id });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id ,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(400, 'Failed To Delete Student');
    }
    
    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate(
      userId ,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(400, 'Failed To Delete User');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedUser;

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingData };
  console.log('Checking Errors ', payload);
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentFrom,
  getSingleStudentData,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
