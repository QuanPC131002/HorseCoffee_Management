import { Router } from "express";
import { changePassword, forgotPassword, logout, resetPassword, signIn, signUp } from "../controllers/auth";

const authRouter = Router ()
authRouter.post('/signup', signUp)
authRouter.post('/signin', signIn)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.post('/logout', logout)
authRouter.put('/change-password', changePassword)

export default authRouter