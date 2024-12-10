import Joi from 'joi';

const userNameValidationJoiSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'capitalize format')
    .messages({
      'string.empty': 'Vai FirstName Lagbei Lagbe',
      'string.max': 'MaxLength can be more than 20 characters',
      'string.pattern.base': '{#value} is not in capitalize format',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/, 'alpha characters only')
    .messages({
      'string.empty': 'Last Name is required',
      'string.pattern.base': 'Last Name is not valid Man!',
    }),
});

const guardianValidationJoiSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

const localGuardianValidationJoiSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  address: Joi.string().required(),
  contactName: Joi.string().required(),
});

export const StudentValidationJoiSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationJoiSchema.required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.only': '{#value} is not a valid Gender',
  }),
  dateOfBirth: Joi.date().iso().required(),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not valid, give a valid Email',
  }),
  contactNumber: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationJoiSchema.required(),
  localGuardian: localGuardianValidationJoiSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('Active', 'Inactive').default('Active'),
});


export default StudentValidationJoiSchema;