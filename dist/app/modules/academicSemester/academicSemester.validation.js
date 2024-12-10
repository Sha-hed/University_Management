"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.enum([...academicSemester_constant_1.academicSemesterName]),
        year: zod_1.default.string(),
        code: zod_1.default.enum([...academicSemester_constant_1.academicSemesterCode]),
        startMonth: zod_1.default.enum([...academicSemester_constant_1.Months]),
        endMonth: zod_1.default.enum([...academicSemester_constant_1.Months]),
    }),
});
const updateAcademicSemesterValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.enum([...academicSemester_constant_1.academicSemesterName]).optional(),
        year: zod_1.default.string().optional(),
        code: zod_1.default.enum([...academicSemester_constant_1.academicSemesterCode]).optional(),
        startMonth: zod_1.default.enum([...academicSemester_constant_1.Months]).optional(),
        endMonth: zod_1.default.enum([...academicSemester_constant_1.Months]).optional(),
    }),
});
exports.AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
};
