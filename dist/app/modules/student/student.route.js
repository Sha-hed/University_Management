"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const student_validation_Zod_1 = require("./student.validation.Zod");
const router = express_1.default.Router();
// router.post('/create-student', StudentControllers.createStudent);
router.get('/', student_controller_1.StudentControllers.getAllStudentFromDB);
router.get('/:id', student_controller_1.StudentControllers.getSingleStudentData);
router.delete('/:id', student_controller_1.StudentControllers.deletedStudent);
router.patch('/:id', (0, validateRequest_1.default)(student_validation_Zod_1.StudentValidationSchemas.updateStudentValidationSchema), student_controller_1.StudentControllers.updateStudent);
exports.StudentRoutes = router;
