import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';



const router = express.Router();

router.post('/create-course',validateRequest(CourseValidations.createCourseValidationSchema),CourseControllers.createCourse);
router.get('/', CourseControllers.getAllCourses);
router.get('/:id',CourseControllers.getAllCourses);
router.delete('/:id',CourseControllers.deleteCourse);
// router.patch('/:facultyId',validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),AcademicFacultyControllers.updateAcademicFaculty);
  

export const CourseRoutes = router