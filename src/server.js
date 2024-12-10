import express from 'express'
import { create } from 'express-handlebars'
import { Server } from 'socket.io';
import path from 'path'
import {__dirname} from './path.js'
import { productRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import multerRouter from './routes/imgs.routes.js';
import { viewsRouter } from './routes/views.routes.js';
import {promises as fs} from 'fs';
import crypto from 'crypto'

const app = express();
const hbs = create();
const PORT = 8080;

const server = app.listen(PORT,() => {
    console.log("Server on port ",PORT )
})

const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.set('views',path.join(__dirname,'/views'))

app.use('/public', express.static(__dirname+'/public'))
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)
app.use('/chat',viewsRouter)
app.use('/home',viewsRouter)
app.use('/upload', multerRouter)
app.use('/realTimeProducts',viewsRouter)


app.get('/', (req,res) => {
    res.status(200).send('Ok');
})

// WEBSOCKET

io.on('connection',(socket) => {
    console.log('User connected: ',socket.id);

    socket.on('mensaje',(data) => {
        console.log("Message received: ",data);
        messages.push(data);
        socket.emit('respuesta',messages)
    })

    socket.on('eraseProduct',async(producto)=>{
        const productosPath = path.resolve(__dirname,'../src/db/productos.json');
        const productosData = await fs.readFile(productosPath, 'utf-8');
        const products = JSON.parse(productosData);
        const result = products.filter( prod => prod.id !== producto.id);
        console.log(result);
    })

    socket.on('addProduct',async(newProd) => {
        const productosPath = path.resolve(__dirname,'../src/db/productos.json');
        const productosData = await fs.readFile(productosPath, 'utf-8');
        const products = JSON.parse(productosData);
        newProd["id"] = crypto.randomBytes(10).toString('hex');
        newProd["thumbnails"] = [];
        products.push(newProd);
        await fs.writeFile(productosPath, JSON.stringify(products))
        socket.emit('respuesta',products)

    })

    socket.on('disconnect', () => {
        console.log('User disconnected: ',socket.id)
    })

})
