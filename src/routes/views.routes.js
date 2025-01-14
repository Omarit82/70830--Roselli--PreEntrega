import {Router} from 'express'
import { viewProduct, viewProducts,viewCart, viewUser, viewChat,viewLoadProduct } from '../controllers/views.controller.js'

export const viewsRouter = Router()

viewsRouter.get('/products',viewProducts)
viewsRouter.get('/products/:id',viewProduct)
viewsRouter.get('/load',viewLoadProduct)
viewsRouter.get('/carts/:cid',viewCart)
viewsRouter.get('/users',viewUser)
viewsRouter.get('/chat',viewChat)

