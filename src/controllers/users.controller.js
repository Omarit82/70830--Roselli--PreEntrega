import { userModel } from "../models/users.model.js";

export const getUsers = async(req,res) => {
    try {
        const respuesta = await userModel.find();
        res.status(200).send({usuarios: respuesta});
    } catch (e) {
        res.status(500).send({message:"Error!",error:e});
    }
}

export const loginUser = async(req,res) => {
    try {
        const {email, pass} = req.body
        console.log(email);
        console.log(pass)
    } catch (e) {
        res.status(500).send({message:"Error de conexion",error:e})
    }
    
}

export const getUser = async(req,res) => {
    try {
        const id = req.params.id;
        const respuesta = await userModel.findById(id);
        if(respuesta){
            res.status(200).send({message:"Usuario encontrado",user:respuesta});
        }else{
            res.status(404).send({message:"No se encontro el usuario"})
        }
    } catch (e) {
        res.status(500).send({message:"Error!",error:e});
    }
}

export const createUser = async (req,res) => {
    try {
        const usuario = req.body;
        const respuesta = await userModel.create(usuario);
        res.status(201).send({message:"Usuario Creado", usuario: respuesta})
    } catch (e) {
        res.status(500).send({message:"Error en la conexion",error:e})
    }
}

export const deleteUser = async(req,res) => {
    try {
        const id = req.params.id;
        const respuesta = await userModel.findOneAndDelete(id);
        res.status(200).send({message:"Usuario eliminado", respuesta: respuesta})
    } catch (e) {
        res.status(500).send({message:"Error en la conexion", error:e})
    }
}