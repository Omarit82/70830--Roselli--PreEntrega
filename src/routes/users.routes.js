import { Router } from "express";
import { getUser, loginUser,getUsers, createUser, deleteUser } from '../controllers/users.controller.js'


export const userRouter = Router();

userRouter.get('/login',loginUser);
userRouter.get('/',getUsers); // Devuelve todos los usuarios
userRouter.get('/:id',getUser); //Devuelve un usuario segun su id
userRouter.post('/',createUser); // Crea un usuario
userRouter.delete('/:id',deleteUser); //Borra un usuario segun su id
