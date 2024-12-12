import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';



const router = express.Router();

router.post('/create-course',validateRequest(CourseValidations.createCourseValidationSchema),CourseControllers.createCourse);
router.get('/', CourseControllers.getAllCourses);
router.get('/:id',CourseControllers.getSingleCourse);
router.delete('/:id',CourseControllers.deleteCourse);
router.patch('/:id',validateRequest(CourseValidations.updateCourseValidationSchema),CourseControllers.updateCourse);
router.put('/:courseId/assign-faculties',validateRequest(CourseValidations.assignFacultiesWithCourseValidationSchema),CourseControllers.assignFacultiesWithCourse)

export const CourseRoutes = router