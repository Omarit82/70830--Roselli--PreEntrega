import { cartModel  } from "../models/cart.model.js";
import { productsModel } from "../models/products.model.js";
import { userModel } from "../models/users.model.js";


export const viewCart = async (req,res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartModel.findById(cid).lean();
        res.status(200).render('templates/cart',{cart:cart,css:'products.css'},)
    } catch (error) {
        res.status(500).render('templates/error')
    }
}

export const viewChat = async(req, res)=>{
    try {
        res.status(200).render('templates/chat')
    } catch (e) {
        res.status(500).render('templates/error')
    }
}

export const viewUser = async (req,res) => {
    try {
        res.status(200).render('templates/newUser',{css:'users.css',js:'user.js'})
    } catch (e) {
        res.status(500).render('templates/error',{error:e})
    }
}

export const viewProducts = async (req,res) => {
    try {
        const limit = req.query.limit
        const prods = await productsModel.find().limit(limit).lean();
        res.status(200).render('templates/home',{products: prods,css:'products.css'})
    } catch (error) {
        res.status(500).render('templates/error')
    }
}

export const viewProduct = async (req,res) => {
    try {
        const prodId = req.params.id;
        const prod = await productsModel.findById(prodId).lean();
        if(prod){
            res.status(200).render('templates/singleProduct',{product: prod, css:'products.css'})
        }else{
            res.status(404).render('templates/error')
        }

    } catch (error) {
        res.status(500).send("Error al obtener producto")
    }
}