import express from 'express'
import { create } from 'express-handlebars'
import { Server } from 'socket.io';
import path from 'path'
import {__dirname} from './path.js'
import { productRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import multerRouter from './routes/imgs.routes.js';
import { viewsRouter } from './routes/views.routes.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

import mongoose from 'mongoose';


const app = express();
const hbs = create();
const PORT = 8080;

const server = app.listen(PORT,() => {
    console.log("Server on port ",PORT )
})

await mongoose.connect("mongodb+srv://Omarit:Strutter78@cluster0.nbefu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{console.log("Conexion exitosa a la ddbb")}).catch(()=>{console.log("Fallo al conectar a la ddbb")})


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
    
    socket.on('disconnect', () => {
        console.log('User disconnected: ',socket.id)
    })
    
})
