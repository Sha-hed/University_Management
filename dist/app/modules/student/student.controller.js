"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
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
const getAllStudentFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.StudentServices.getAllStudentFrom(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'All Student Data Retrieved Successfully',
        data: result,
    });
}));
const getSingleStudentData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.getSingleStudentData(studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Student Data Retrieve Successfully',
        data: result,
    });
}));
const deletedStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.deleteStudentFromDB(studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Student deleted successfully',
        data: result,
    });
}));
const updateStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Update Student e asi ami');
    const { studentId } = req.params;
    const { student } = req.body;
    const result = yield student_service_1.StudentServices.updateStudentIntoDB(studentId, student);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Student Updated successfully',
        data: result,
    });
}));
exports.StudentControllers = {
    getAllStudentFromDB,
    getSingleStudentData,
    deletedStudent,
    updateStudent,
};
