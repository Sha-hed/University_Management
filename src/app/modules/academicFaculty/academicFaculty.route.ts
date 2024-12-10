import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';


const router = express.Router();

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.post('/create-academic-faculty',validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),AcademicFacultyControllers.createAcademicFaculty);
router.get('/:facultyId',AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch('/:facultyId',validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),AcademicFacultyControllers.updateAcademicFaculty);
  

export const AcademicFacultyRoute = router