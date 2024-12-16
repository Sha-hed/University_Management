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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const admin_model_1 = require("../Admin/admin.model");
const faculty_model_1 = require("../Faculty/faculty.model");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const createStudentIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create user object
    const userData = {};
    // if password not given, use default password
    const admissionSemester = yield academicSemester_model_1.AcademicSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new AppError_1.default(404, 'Admission semester not found.');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
        userData.password = (password || config_1.default.default_password);
        // set student role
        userData.role = 'student';
        // set manually id
        // create a user transaction-01
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(400, 'Failed To Create User!');
        }
        // set id, _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; // reference id
        //create a student ==> transaction-02
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(400, 'Failed To Create Student!');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
const createAdminIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create user object
    const adminData = {};
    // if password not given, use default password
    // const admissionSemester = await AcademicSemester.findById(
    //   payload.admissionSemester,
    // );
    // if (!admissionSemester) {
    //   throw new AppError(404, 'Admission semester not found.');
    // }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        adminData.id = yield (0, user_utils_1.generateAdminId)();
        adminData.password = (password || config_1.default.default_password);
        // set student role
        adminData.role = 'admin';
        // set manually id
        // create a user transaction-01
        const newUser = yield user_model_1.User.create([adminData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(400, 'Failed To Create User!');
        }
        // set id, _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; // reference id
        //create a admin ==> transaction-02
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(400, 'Failed To Create Admin!');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
const createFacultyIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.default_password;
    //set student role
    userData.role = 'faculty';
    //find academic department info
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new AppError_1.default(400, 'Academic department not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateFacultyId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); // array
        //create a faculty
        if (!newUser.length) {
            throw new AppError_1.default(400, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a faculty (transaction-2)
        const newFaculty = yield faculty_model_1.Faculty.create([payload], { session });
        if (!newFaculty.length) {
            throw new AppError_1.default(400, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.UserServices = {
    createStudentIntoDB,
    createAdminIntoDB,
    createFacultyIntoDB,
};
