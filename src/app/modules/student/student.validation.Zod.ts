import { z } from 'zod';

// UserName Schema
export const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'MaxLength can be more than 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: '{VALUE} is not in capitalize format' },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last Name is not valid Man!',
  }),
});

// Guardian Schema
export const createGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
});
// LocalGuardian Schema
export const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  address: z.string(),
  contactName: z.string(),
});
//Update validation schema
export const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'MaxLength can be more than 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: '{VALUE} is not in capitalize format' },
    ).optional(),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last Name is not valid Man!',
  }).optional(),
});

//update Guardian Schema
export const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherContactNo: z.string().optional(),
  fatherOccupation: z.string().optional(),
  motherName: z.string().optional(),
  motherContactNo: z.string().optional(),
  motherOccupation: z.string().optional(),
});

//update LocalGuardian Schema
export const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  address: z.string().optional(),
  contactName: z.string().optional(),
});

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other']),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: '{VALUE} is not valid, give a valid Email' }),
      contactNumber: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      admissionDepartment: z.string(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().default(false)
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['Male', 'Female', 'Other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: '{VALUE} is not valid, give a valid Email' }).optional(),
      contactNumber: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      admissionDepartment: z.string().optional(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().default(false).optional()
    }),
  }),
});

export const StudentValidationSchemas = { 
  createStudentValidationSchema,
  updateStudentValidationSchema
 };
