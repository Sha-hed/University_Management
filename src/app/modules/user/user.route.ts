import express from 'express'
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchemas } from '../student/student.validation.Zod';
// import StudentValidationSchemas from '../student/student.validation.Zod';

const router = express.Router();



router.post(
  '/create-student',
  validateRequest(StudentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
