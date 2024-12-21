import {Router} from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.controller.js';


export const productRouter = Router()

productRouter.get('/', getProducts) //Consulta productos
productRouter.get('/:id',getProduct) //Consultar producto con id
productRouter.post('/', createProduct)//Crea un nuevo producto
productRouter.put('/:id', updateProduct)//Actualiza un producto dado su id
productRouter.delete('/:id', deleteProduct)//Elimina un producto dado su id
