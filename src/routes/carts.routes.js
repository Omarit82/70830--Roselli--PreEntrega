import {Router} from 'express'
import crypto from 'crypto'
import {__dirname} from '../path.js'
import {promises as fs} from 'fs';
import path from 'path'

export const cartsRouter = Router()

const carritosPath = path.resolve(__dirname,'../src/db/carritos.json');
const carritosData = await fs.readFile(carritosPath, 'utf-8');
const carritos = JSON.parse(carritosData);

cartsRouter.get('/:id', (req, res) =>{
    const id = req.params.id;
    const cart = carritos.find((carrito)=>carrito.id == id)

    if(cart){
        res.status(200).send(cart.products)
        res.status(200).render('templates/cart/',{cart: cart.products, js:'productos.js'})
    } else {
        res.status(404).send({mensaje: "Carro no encontrado."})
    }
})
//Crea un nuevo carrito
cartsRouter.post('/', async(req, res)=>{
    const newCart = {
        id: crypto.randomBytes(5).toString('hex'),
        products: []
    }
    carritos.push(newCart)
    await fs.writeFile(carritosPath, JSON.stringify(carritos))
    res.status(201).send(`Carrito creado correctamente con id: ${newCart.id}`)
})

cartsRouter.post('/:cid/products/:id', async(req, res)=>{
    const idC = req.params.cid
    const idP = req.params.id
    const {quantity} = req.body
    const cart = carritos.find(crt => crt.id == idC)

    if(cart){
        const index = cart.products.findIndex(prod => prod.id ==idP)
        if(index != -1){
            cart.products[index].quantity += quantity
        } else {
            cart.products.push({id: idP, quantity})
        }
        await fs.writeFile(carritosPath, JSON.stringify(carritos))
        res.status(200).send("Carrito actualizado correctamente")
    } else {
        res.status(404).send({mensaje: "El carrito no existe"})
    }
})