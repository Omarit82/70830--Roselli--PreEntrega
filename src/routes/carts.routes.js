import {Router} from 'express'
import { createCart, getCart, insertProductCart } from '../controllers/carts.controller.js';

export const cartsRouter = Router()

cartsRouter.get('/:id', getCart) //Busca un carro por su id
cartsRouter.post('/', createCart)//Crea un nuevo carrito
cartsRouter.post('/:cid/products/:pid', insertProductCart)