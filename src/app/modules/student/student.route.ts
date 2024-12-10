import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchemas } from './student.validation.Zod';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudentFromDB);
router.get('/:studentId', StudentControllers.getSingleStudentData);
router.delete('/:studentId',StudentControllers.deletedStudent)
router.patch('/:studentId',validateRequest(StudentValidationSchemas.updateStudentValidationSchema),StudentControllers.updateStudent)

export const StudentRoutes = router;
