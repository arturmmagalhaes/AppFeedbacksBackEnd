import express from 'express';
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

userRouter.post("/signup", new UserController().createUser);
userRouter.post("/login", new UserController().login);
userRouter.get("/users", new UserController().getUsers);