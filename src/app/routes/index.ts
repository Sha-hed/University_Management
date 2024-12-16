import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoute
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoute
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes
    },
    {
        path: '/courses',
        route: CourseRoutes
    },
    {
        path: '/faculties',
        route: FacultyRoutes
    },
    {
        path: '/admins',
        route: AdminRoutes
    },
    {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes
    }
]

moduleRoutes.forEach((route)=> router.use(route.path,route.route))

export default router;