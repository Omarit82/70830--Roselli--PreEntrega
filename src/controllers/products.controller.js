import { productsModel } from "../models/products.model.js";


export const getProducts = async (req,res) => {
    try {
        const {limit, page, filter,metFilter, order} = req.query

        const pag = page !== undefined ? page:1
        const lim = limit !== undefined ? limit:5
        const query = metFilter !== undefined ? {[metFilter]:filter}:{}
        const orderQuery = order !== undefined ? {price:order} : {}

        const prods = await productsModel.paginate(query,{limit:lim,page:pag , orderQuery});
        res.status(200).send({products:prods});
    } catch (error) {
        res.status(500).send("Error al obtener productos")
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