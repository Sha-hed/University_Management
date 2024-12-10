/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
// import StudentValidationJoiSchema from './student.validation.joi';
// import { z } from "zod";
// import { StudentValidationZodSchema } from './student.validation.Zod';
// const createStudent = async (req: Request, res: Response) => {
//   try {

//     const student = req.body;

//     // Validation with ZOD Validation Library

//     const ZodParsedData = StudentValidationZodSchema.parse(student)

//     // Validation With Joi Validation Library :)

//     // const { error, value } = StudentValidationJoiSchema.validate(student)
//     // console.log({error}, {value});
//     // if(error){
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Something Went Wrong, find at Controller JOI',
//     //     error: error.details,
//     //   });
//     // }
//     const result = await StudentServices.createStudentIntoDB(ZodParsedData);
//     res.status(200).json({
//       success: true,
//       message: 'Student Inserted To DB Successfully',
//       data: result,
//     });
//   } catch (error : any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something Went Wrong, find at Controller',
//       error
//     });
//   }
// };

const getAllStudentFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentFrom(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Student Data Retrieved Successfully',
    data: result,
  });
});
const getSingleStudentData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentData(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student Data Retrieve Successfully',
    data: result,
  });
});

const deletedStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  console.log('Update Student e asi ami');
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student Updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudentFromDB,
  getSingleStudentData,
  deletedStudent,
  updateStudent,
};
