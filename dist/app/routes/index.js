"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const course_route_1 = require("../modules/Course/course.route");
const faculty_route_1 = require("../modules/Faculty/faculty.route");
const admin_route_1 = require("../modules/Admin/admin.route");
const semesterRegistration_route_1 = require("../modules/semesterRegistration/semesterRegistration.route");
const OfferedCourse_route_1 = require("../modules/OfferedCourse/OfferedCourse.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/students',
        route: student_route_1.StudentRoutes
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes
    },
    {
        path: '/academic-semester',
        route: academicSemester_route_1.AcademicSemesterRoute
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_route_1.AcademicFacultyRoute
    },
    {
        path: '/academic-departments',
        route: academicDepartment_route_1.AcademicDepartmentRoutes
    },
    {
        path: '/courses',
        route: course_route_1.CourseRoutes
    },
    {
        path: '/faculties',
        route: faculty_route_1.FacultyRoutes
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes
    },
    {
        path: '/semester-registrations',
        route: semesterRegistration_route_1.semesterRegistrationRoutes
    },
    {
        path: '/offered-courses',
        route: OfferedCourse_route_1.offeredCourseRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
