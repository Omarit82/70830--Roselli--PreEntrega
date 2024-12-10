import {Router} from 'express'
import {__dirname} from '../path.js'
import {promises as fs} from 'fs';
import path from 'path'

export const viewsRouter = Router()

const productosPath = path.resolve(__dirname,'../src/db/productos.json');
const productosData = await fs.readFile(productosPath, 'utf-8');
const products = JSON.parse(productosData);


viewsRouter.get('/products', (req,res)=>{
    const {limit} = req.query
    const prods = products.slice(0,limit)
    res.status(200).render('templates/home',{products: prods, js:'productos.js',css:'products.css'})
})
//Consultar producto con id
viewsRouter.get('/:id',(req, res)=>{
    const id = req.params.id
    const product = products.find(prod => prod.id == id);
    if(product){
        //res.status(200).send(product)
        res.status(200).render('templates/singleProduct',{product: product, css:'products.css'})
    } else {
        res.status(404).render('templates/error',{mensaje: "El producto no existe",css:'error.css'})
    }
})

viewsRouter.get('/', (req,res) => {
    res.status(200).render('templates/realTimeProducts',{products:products,js:'realTime.js'})
})
