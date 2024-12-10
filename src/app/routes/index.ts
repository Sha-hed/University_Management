import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";


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
    }
]

moduleRoutes.forEach((route)=> router.use(route.path,route.route))

export default router;