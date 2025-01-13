import {Router} from 'express'
import { viewProduct, viewProducts,viewCart, viewUser, viewChat } from '../controllers/views.controller.js'

export const viewsRouter = Router()

viewsRouter.get('/products',viewProducts)
viewsRouter.get('/products/:id',viewProduct)
viewsRouter.get('/carts/:cid',viewCart)
viewsRouter.get('/newUser',viewUser)
viewsRouter.get('/chat',viewChat)

