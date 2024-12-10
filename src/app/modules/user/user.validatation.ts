import z from 'zod'

const userValidationSchema = z.object({
    body : z.object({
        name: z.enum([''])
    })
})

export const UserValidation = { userValidationSchema }

// DRY=Don't Repeat Yourself