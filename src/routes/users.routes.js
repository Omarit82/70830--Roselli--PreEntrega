import { Router } from "express";
import { getUser, loginUser,getUsers, createUser, deleteUser } from '../controllers/users.controller.js'


export const userRouter = Router();

userRouter.get('/login',loginUser);
userRouter.get('/users',getUsers); // Devuelve todos los usuarios
userRouter.get('/users/:id',getUser); //Devuelve un usuario segun su id
userRouter.post('/users',createUser); // Crea un usuario
userRouter.delete('/users/:id',deleteUser); //Borra un usuario segun su id
