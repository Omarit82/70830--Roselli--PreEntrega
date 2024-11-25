import { Router } from 'express'
import { uploadProds } from '../config/multer.js'  

const multerRouter = Router()
// En postman seleccionando form-data para postear, se debe poner key : product  seleccionamos file, y value elegimos la imagen
multerRouter.post('/products',uploadProds.single('product'), (req, res) => {
    res.status(200).send("Imagen Cargada")
})

export default multerRouter