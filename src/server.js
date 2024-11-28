import express from 'express'
import {__dirname} from './path.js'
import { productRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import multerRouter from './routes/imgs.routes.js';
import { create } from 'express-handlebars'
import path from 'path'
import { Server } from 'socket.io';

const app = express();
const hbs = create();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views',path.join(__dirname,'/views'))

app.use('/static', express.static(__dirname+'/public'))
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)
app.use('/upload', multerRouter)

app.get('/', (req,res) => {
    res.status(200).send('Ok');
})


app.listen(PORT, () => {
    console.log("Server on port: ", PORT)
})

// WEBSOCKET
/*
const server = app.listen(PORT,() => {
    console.log("Server on port ",PORT )
})

const io = new Server(server)

io.on('Connection',(socket) => {
    console.log('User connected: ',socket.id);

    socket.on('message',(data) => {
        console.log("Message received: ",data);
        socket.emit('response','Message received correctly')
    })

    socket.on('disconnect', () => {
        console.log('User disconnected: ',socket.id)
    })

})*/
