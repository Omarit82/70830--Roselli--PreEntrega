import {Router} from 'express'
import { viewProduct, viewProducts } from '../controllers/products.controller.js'
import { viewCart } from '../controllers/carts.controller.js'

export const viewsRouter = Router()

viewsRouter.get('/products',viewProducts)
viewsRouter.get('/products/:id',viewProduct)
viewsRouter.get('/:cid',viewCart)

