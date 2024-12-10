"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.get('/', academicDepartment_controller_1.AcademicDepartmentControllers.getAllAcademicDepartments);
router.post('/create-academic-department', 
// validateRequest(AcademicDepartmentValidation.academicDepartmentValidationSchema),
academicDepartment_controller_1.AcademicDepartmentControllers.createAcademicDepartment);
router.get('/:facultyId', academicDepartment_controller_1.AcademicDepartmentControllers.getSingleAcademicDepartment);
router.patch('/:facultyId', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentControllers.updateAcademicDepartment);
exports.AcademicDepartmentRoutes = router;
