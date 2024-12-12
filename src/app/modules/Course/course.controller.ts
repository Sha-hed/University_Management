import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is Created Successfully!!',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courses are retrieved Successfully!!',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is retrieved Successfully!!',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is deleted Successfully!!',
    data: result,
  });
});


const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId,faculties);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Faculty Assigned Successfully!!",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is Updated Successfully!!',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse
};
