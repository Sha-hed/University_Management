"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidationSchemas = exports.updateLocalGuardianValidationSchema = exports.updateGuardianValidationSchema = exports.updateUserNameValidationSchema = exports.createLocalGuardianValidationSchema = exports.createGuardianValidationSchema = exports.createUserNameValidationSchema = void 0;
const zod_1 = require("zod");
// UserName Schema
exports.createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .max(20, { message: 'MaxLength can be more than 20 characters' })
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: '{VALUE} is not in capitalize format' }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
        message: 'Last Name is not valid Man!',
    }),
});
// Guardian Schema
exports.createGuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string(),
    fatherContactNo: zod_1.z.string(),
    fatherOccupation: zod_1.z.string(),
    motherName: zod_1.z.string(),
    motherContactNo: zod_1.z.string(),
    motherOccupation: zod_1.z.string(),
});
// LocalGuardian Schema
exports.createLocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    address: zod_1.z.string(),
    contactName: zod_1.z.string(),
});
//Update validation schema
exports.updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .max(20, { message: 'MaxLength can be more than 20 characters' })
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: '{VALUE} is not in capitalize format' }).optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
        message: 'Last Name is not valid Man!',
    }).optional(),
});
//update Guardian Schema
exports.updateGuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().optional(),
    fatherContactNo: zod_1.z.string().optional(),
    fatherOccupation: zod_1.z.string().optional(),
    motherName: zod_1.z.string().optional(),
    motherContactNo: zod_1.z.string().optional(),
    motherOccupation: zod_1.z.string().optional(),
});
//update LocalGuardian Schema
exports.updateLocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    occupation: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    contactName: zod_1.z.string().optional(),
});
// Student Schema
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        student: zod_1.z.object({
            name: exports.createUserNameValidationSchema,
            gender: zod_1.z.enum(['Male', 'Female', 'Other']),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z
                .string()
                .email({ message: '{VALUE} is not valid, give a valid Email' }),
            contactNumber: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            guardian: exports.createGuardianValidationSchema,
            localGuardian: exports.createLocalGuardianValidationSchema,
            admissionSemester: zod_1.z.string(),
            admissionDepartment: zod_1.z.string(),
            profileImg: zod_1.z.string().optional(),
            isDeleted: zod_1.z.boolean().default(false)
        }),
    }),
});
const updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            name: exports.updateUserNameValidationSchema.optional(),
            gender: zod_1.z.enum(['Male', 'Female', 'Other']).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z
                .string()
                .email({ message: '{VALUE} is not valid, give a valid Email' }).optional(),
            contactNumber: zod_1.z.string().optional(),
            emergencyContactNo: zod_1.z.string().optional(),
            bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: zod_1.z.string().optional(),
            permanentAddress: zod_1.z.string().optional(),
            guardian: exports.updateGuardianValidationSchema.optional(),
            localGuardian: exports.updateLocalGuardianValidationSchema.optional(),
            admissionSemester: zod_1.z.string().optional(),
            admissionDepartment: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
            isDeleted: zod_1.z.boolean().default(false).optional()
        }),
    }),
});
exports.StudentValidationSchemas = {
    createStudentValidationSchema,
    updateStudentValidationSchema
};
