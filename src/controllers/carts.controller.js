import { cartModel  } from "../models/cart.model.js";

export const getCart = async(req,res) => {
    try {
        const id = req.params.id;
        const respuesta = await cartModel.findOne({_id:id})
        if(respuesta){
            res.status(200).send(respuesta)
        }else{
            res.status(404).send("El carrito no existe")
        }
    } catch (error) {
        res.status(404).send(error)
    }
    
}

export const createCart = async(req,res) => {
    try {
        const respuesta = await cartModel.create({products:[]});
        res.status(201).send({message:"Carro creado correctamente"})
    } catch (error) {
        res.status(404).send(error)
    }
}

export const insertProductCart = async(req, res) => {
    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        const {quantity} = req.body;
        const cart = await cartModel.findById(cartId)
        const indice = cart.products.findIndex(prod => prod.id_prod == prodId)
        if(indice != -1){
            cart.products[indice].quantity += quantity
        } else {
            cart.products.push({id_prod: prodId, quantity:quantity})
        }
        const respuesta = await cartModel.findByIdAndUpdate(cartId, cart);
        res.status(200).send({message:"Producto agregado correctamente"})
    } catch (error) {
        res.status(404).send(error)
    }
}

export const viewCart = async (req,res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartModel.findById(cid).lean();
        res.status(200).render('templates/cart',{cart:cart,css:'products.css'},)
    } catch (error) {
        res.status(500).render('templates/error')
    }
}