import { productsModel } from "../models/products.model.js";

export const getProducts = async (req,res) => {
    try {
        const limit = req.query.limit
        const prods = await productsModel.find().limit(limit);
        // res.status(200).render('templates/home',{products: prods,css:'products.css'})
        res.status(200).send(prods);
    } catch (error) {
        res.status(500).send("Error al obtener productos")
    }
}
export const viewProducts = async (req,res) => {
    try {
        const limit = req.query.limit
        const prods = await productsModel.find().limit(limit);
        res.status(200).render('templates/home',{products: prods,css:'products.css'})
    } catch (error) {
        res.status(500).render('templates/error')
    }
}

export const getProduct = async (req,res) => {
    try {
        const prodId = req.params.id;
        const prod = await productsModel.findById(prodId);
        if(prod){
            return res.status(200).send({product: prod})
        }else{
            return res.status(404).send({message:"El producto no existe"})
        }

    } catch (error) {
        res.status(500).send("Error al obtener producto")
    }
}
export const viewProduct = async (req,res) => {
    try {
        const prodId = req.params.id;
        const prod = await productsModel.findById(prodId);
        if(prod){
            return res.status(200).render('templates/home',{product: product, css:'products.css'})
        }else{
            return res.status(404).render('templates/error')
        }

    } catch (error) {
        res.status(500).send("Error al obtener producto")
    }
}

export const createProduct = async (req,res) => {
    try {
        const product = req.body
        const respuesta = await productsModel.create(product);
        res.status(201).send({message:"Producto creado correctamente"})
    } catch (error) {
        res.status(500).send("Error al crear producto")
    }
}
export const updateProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const updateProd = req.body;
        const respuesta = await productsModel.findByIdAndUpdate(id,updateProd);
        res.status(200).send({message:"Producto actualizado"})
    } catch (error) {
        res.status(500).send("Error al actualizar producto")
    }
}
export const deleteProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const respuesta = await productsModel.findByIdAndDelete(id);
        res.status(200).send({message:"Producto Eliminado"})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al borrar producto")
    }
}