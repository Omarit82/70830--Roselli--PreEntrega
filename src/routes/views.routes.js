import { Router } from "express";

export const viewsRouter = Router();

viewsRouter.get('/', (req,res)=>{
    res.render('productos',) //tengo que pasarle el arreglo de productos.
})

