import { z } from 'zod';

const preRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false).optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const updatePreRequisiteCourseValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCourseValidationSchema)
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const assignFacultiesWithCourseValidationSchema = z.object({
  body: z.object({
    course: z.string(),
    faculties: z.array(z.string())
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assignFacultiesWithCourseValidationSchema
};
