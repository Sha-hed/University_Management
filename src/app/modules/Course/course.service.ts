import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...basicUpdatedInfo } = payload;

  console.log({ preRequisiteCourses }, { basicUpdatedInfo });

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      basicUpdatedInfo,
      { new: true, runValidators: true },
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(400, 'Failed to update basic info');
    }

    // Step - 02

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // Step -01.1

      const deletePre = preRequisiteCourses
        .filter((el) => el.isDeleted === true)
        .map((el) => el.course);
      console.log({ deletePre });
      const deleteCourses = await Course.findByIdAndUpdate(
        id,
        { $pull: { preRequisiteCourses: { course: { $in: deletePre } } } },
        { new: true, runValidators: true },
      );

      if (!deleteCourses) {
        throw new AppError(400, 'Failed delete course');
      }

      // Step -01.2

      const newCourse = preRequisiteCourses.filter(
        (e) => e.isDeleted === false,
      );

      console.log('New Coursees', newCourse);

      const addCourses = await Course.findByIdAndUpdate(
        id,
        { $addToSet: { preRequisiteCourses: { $each: newCourse } } },
        { new: true, runValidators: true },
      );

      if (!addCourses) {
        throw new AppError(400, 'Failed to add course');
      }
      console.log({ deleteCourses }, { addCourses });
    }

    const result = await Course.findById(id);
    if (!result) {
      throw new AppError(400, 'Failed to find updated data');
    }
    return result;
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to updated');
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true, new:true
    },
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
};
