import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/', auth(), AcademicDepartmentControllers.getAllAcademicDepartments);
router.post(
  '/create-academic-department',
  // validateRequest(AcademicDepartmentValidation.academicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.get(
  '/:facultyId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
