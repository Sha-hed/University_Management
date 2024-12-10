import { Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student Created Successfully!!',
    data: result,
  });

  res.status(200).json({
    success: true,
    message: 'Student Inserted To DB Successfully',
    data: result,
  });
});

export const UserControllers = { createStudent };
