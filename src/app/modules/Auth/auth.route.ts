import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidations } from './auth.validation'
import { AuthControllers } from './auth.controller'


const router = express.Router()

router.post('/login', validateRequest(AuthValidations.loginValidationSchema),AuthControllers.loginUser)

export const AuthRoutes = router