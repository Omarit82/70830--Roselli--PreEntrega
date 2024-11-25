import express from 'express'
import {__dirname} from './path.js'
import { productRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { viewsRouter } from './routes/views.routes.js';
import multerRouter from './routes/imgs.routes.js';
import { create } from 'express-handlebars'
import path from 'path'

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
app.use('/',viewsRouter)


app.listen(PORT, () => {
    console.log("Server on port: ", PORT)
})
