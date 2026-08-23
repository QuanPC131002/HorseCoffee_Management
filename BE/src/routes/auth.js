import { Router } from "express";
import { changePassword, forgotPassword, getUserById, logout, resetPassword, signIn, signUp } from "../controllers/auth.js";

const authRouter = Router ()
authRouter.post('/signup', signUp)
authRouter.post('/signin', signIn)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.post('/logout', logout)
authRouter.put('/change-password', changePassword)
authRouter.get('/:id', getUserById)

export default authRouter