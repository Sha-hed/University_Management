"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidationJoiSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userNameValidationJoiSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .required()
        .max(20)
        .regex(/^[A-Z][a-z]*$/, 'capitalize format')
        .messages({
        'string.empty': 'Vai FirstName Lagbei Lagbe',
        'string.max': 'MaxLength can be more than 20 characters',
        'string.pattern.base': '{#value} is not in capitalize format',
    }),
    middleName: joi_1.default.string().optional(),
    lastName: joi_1.default.string()
        .required()
        .regex(/^[A-Za-z]+$/, 'alpha characters only')
        .messages({
        'string.empty': 'Last Name is required',
        'string.pattern.base': 'Last Name is not valid Man!',
    }),
});
const guardianValidationJoiSchema = joi_1.default.object({
    fatherName: joi_1.default.string().required(),
    fatherContactNo: joi_1.default.string().required(),
    fatherOccupation: joi_1.default.string().required(),
    motherName: joi_1.default.string().required(),
    motherContactNo: joi_1.default.string().required(),
    motherOccupation: joi_1.default.string().required(),
});
const localGuardianValidationJoiSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    occupation: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    contactName: joi_1.default.string().required(),
});
exports.StudentValidationJoiSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: userNameValidationJoiSchema.required(),
    gender: joi_1.default.string().valid('Male', 'Female', 'Other').required().messages({
        'any.only': '{#value} is not a valid Gender',
    }),
    dateOfBirth: joi_1.default.date().iso().required(),
    email: joi_1.default.string().email().required().messages({
        'string.email': '{#value} is not valid, give a valid Email',
    }),
    contactNumber: joi_1.default.string().required(),
    emergencyContactNo: joi_1.default.string().required(),
    bloodGroup: joi_1.default.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required(),
    presentAddress: joi_1.default.string().required(),
    permanentAddress: joi_1.default.string().required(),
    guardian: guardianValidationJoiSchema.required(),
    localGuardian: localGuardianValidationJoiSchema.required(),
    profileImg: joi_1.default.string().optional(),
    isActive: joi_1.default.string().valid('Active', 'Inactive').default('Active'),
});
exports.default = exports.StudentValidationJoiSchema;
