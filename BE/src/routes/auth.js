import { Router } from "express";
import { changePassword, forgotPassword, resetPassword, signIn, signUp } from "../controllers/auth";

const authRouter = Router ()
authRouter.post('/signup', signUp)
authRouter.post('/signin', signIn)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.put('/change-password', changePassword)

export default authRouter