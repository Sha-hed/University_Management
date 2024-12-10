import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department is Created Successfully!!',
      data: result,
    });
  },
);

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartments();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Departments retrieved Successfully!!',
    data: result,
  });
});


const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicDepartmentServices.getSingleAcademicDepartment(facultyId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department is retrieved Successfully!!',
    data: result,
  });
});


const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicDepartmentServices.updateAcademicDepartmentFromDB(facultyId,req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department is Updated Successfully!!',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment
};
