import express from 'express'
import { create } from 'express-handlebars'
import { Server } from 'socket.io';
import path from 'path'
import {__dirname} from './path.js'
import { productRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import multerRouter from './routes/imgs.routes.js';
import chatRouter from './routes/chat.routes.js';

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
app.use('/upload', multerRouter)
app.use('/api/chat',chatRouter)


app.get('/', (req,res) => {
    res.status(200).send('Ok');
})



// WEBSOCKET
let messages = []
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
