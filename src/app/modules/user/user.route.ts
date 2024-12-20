import express from 'express'
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchemas } from '../student/student.validation.Zod';
import { AdminValidations } from '../Admin/admin.validation';
import { FacultyValidations } from '../Faculty/faculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
// import StudentValidationSchemas from '../student/student.validation.Zod';

const router = express.Router();



router.post(
  '/create-student',auth(USER_ROLE.admin),
  validateRequest(StudentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);

router.post(
  '/create-faculty',auth(USER_ROLE.admin),
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty
);

export const UserRoutes = router;
