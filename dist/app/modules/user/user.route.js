"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const student_validation_Zod_1 = require("../student/student.validation.Zod");
const admin_validation_1 = require("../Admin/admin.validation");
const faculty_validation_1 = require("../Faculty/faculty.validation");
// import StudentValidationSchemas from '../student/student.validation.Zod';
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.default)(student_validation_Zod_1.StudentValidationSchemas.createStudentValidationSchema), user_controller_1.UserControllers.createStudent);
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.AdminValidations.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
router.post('/create-faculty', (0, validateRequest_1.default)(faculty_validation_1.FacultyValidations.createFacultyValidationSchema), user_controller_1.UserControllers.createFaculty);
exports.UserRoutes = router;
