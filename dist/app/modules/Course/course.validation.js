"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidations = void 0;
const zod_1 = require("zod");
const preRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        prefix: zod_1.z.string(),
        code: zod_1.z.number(),
        credits: zod_1.z.number(),
        preRequisiteCourses: zod_1.z.array(preRequisiteCourseValidationSchema).optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
const updatePreRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        prefix: zod_1.z.string().optional(),
        code: zod_1.z.number().optional(),
        credits: zod_1.z.number().optional(),
        preRequisiteCourses: zod_1.z
            .array(updatePreRequisiteCourseValidationSchema)
            .optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
const assignFacultiesWithCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        course: zod_1.z.string(),
        faculties: zod_1.z.array(zod_1.z.string())
    }),
});
exports.CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    assignFacultiesWithCourseValidationSchema
};
