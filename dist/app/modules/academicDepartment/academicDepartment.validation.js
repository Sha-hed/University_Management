"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const academicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Department name must be string',
            required_error: 'Name is Required'
        }),
        academicFaculty: zod_1.z.string({ required_error: 'Faculty is required' }),
    }),
});
const updateAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Academic Department must be string',
        })
            .optional(),
        academicFaculty: zod_1.z.string().optional(),
    }),
});
exports.AcademicDepartmentValidation = {
    academicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};
