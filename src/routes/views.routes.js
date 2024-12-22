import {Router} from 'express'
import { viewProduct, viewProducts } from '../controllers/products.controller.js'

export const viewsRouter = Router()

viewsRouter.get('/',viewProducts)
viewsRouter.get('/:id',viewProduct)
/*viewsRouter.get('/', realTimeProducts)*/
