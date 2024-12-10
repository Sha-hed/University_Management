"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.get('/', academicFaculty_controller_1.AcademicFacultyControllers.getAllAcademicFaculties);
router.post('/create-academic-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.academicFacultyValidationSchema), academicFaculty_controller_1.AcademicFacultyControllers.createAcademicFaculty);
router.get('/:facultyId', academicFaculty_controller_1.AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch('/:facultyId', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.updateAcademicFacultyValidationSchema), academicFaculty_controller_1.AcademicFacultyControllers.updateAcademicFaculty);
exports.AcademicFacultyRoute = router;
