import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchemas } from './student.validation.Zod';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudentFromDB);
router.get('/:id', StudentControllers.getSingleStudentData);
router.delete('/:id',StudentControllers.deletedStudent)
router.patch('/:id',validateRequest(StudentValidationSchemas.updateStudentValidationSchema),StudentControllers.updateStudent)

export const StudentRoutes = router;
