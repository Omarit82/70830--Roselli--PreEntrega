import {Router} from 'express'
import crypto from 'crypto'

export const productRouter = Router()

const products = []
//Consulta producto
productRouter.get('/', (req,res)=>{
    res.status(200).send(products)
})
//Consultar producto con id
productRouter.get('/:id',(req, res)=>{
    const id = req.params.id
    const product = products.find(prod => prod.id == id);
    if(product){
        res.status(200).send(product)
    } else {
        res.status(404).send({mensaje: "El producto no existe"})
    }
})
//Crea un nuevo producto
productRouter.post('/', (req, res)=>{
    const {title, description, code, price, stock, category} = req.body
    const newProd = {
        id: crypto.randomBytes(10).toString('hex'),
        title: title,
        description: description,
        code: code,
        price: price,
        status: true,
        stock: stock,
        category: category,
        thumbnails: []
    }
    products.push(newProd)
    res.status(201).send({mensaje: `Producto creado correctamente con el id ${newProd.id}`})
})
//Actualiza un producto dado su id
productRouter.put('/:id', (req,res) => {
    const id = req.params.id
    const {title, description, code, price, status, stock, category, thumbnails} = req.body
    const index = products.findIndex(prod => prod.id == id)

    if(index != -1){
        products[index].title = title
        products[index].description = description
        products[index].code = code
        products[index].price = price
        products[index].status = status
        products[index].stock = stock
        products[index].category = category
        products[index].thumbnails = thumbnails

        res.status(200).send({mensaje: "Producto actualizado"})
    } else {
        res.status(404).send({mensaje: "El producto no existe"})
    }
})
//Elimina un producto dado su id
productRouter.delete('/:id', (req,res) =>{
    const id = req.params.id
    const index = products.findIndex(prod => prod.id == id)
    if(index != -1){
        products.splice(index, 1)
        res.status(200).send({mensaje:'Producto eliminado'})
    } else {
        res.status(404).send({mensaje: 'Producto inexistente'})
    }
})
