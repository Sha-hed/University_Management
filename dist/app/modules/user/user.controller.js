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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student: studentData } = req.body;
    const result = yield user_service_1.UserServices.createStudentIntoDB(password, studentData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Student Created Successfully!!',
        data: result,
    });
}));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin: adminData } = req.body;
    const result = yield user_service_1.UserServices.createAdminIntoDB(password, adminData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Admin is Created Successfully!!',
        data: result,
    });
}));
const createFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty: facultyData } = req.body;
    const result = yield user_service_1.UserServices.createFacultyIntoDB(password, facultyData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty is Created Successfully Man!!',
        data: result,
    });
}));
exports.UserControllers = { createStudent, createAdmin, createFaculty };
