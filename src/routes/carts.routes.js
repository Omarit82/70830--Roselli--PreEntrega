import {Router} from 'express'
import crypto from 'crypto'

export const cartsRouter = Router()

const carritos = []

cartsRouter.get('/:id', (req, res) =>{
    const id = req.params.id;
    const cart = carritos.find((car)=>car.id == id)

    if(cart){
        res.status(200).send(cart.products)
    } else {
        res.status(404).send({mensaje: "Carro no encontrado."})
    }
})

cartsRouter.post('/', (req, res)=>{
    const newCart = {
        id: crypto.randomBytes(5).toString('hex'),
        products: []
    }
    carritos.push(newCart)
})

cartsRouter.post('/:cid/products/:id', (req, res)=>{

})