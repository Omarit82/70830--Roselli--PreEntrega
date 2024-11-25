import multer from 'multer'
import { __dirname } from '../path.js'

const storageProducts = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}${file.originalname}`)
    },
    destination: (req,file,callback) =>{ 
        callback(null,`${__dirname}/public/assets/img/products`)
    }
})

export const uploadProds = multer({storage: storageProducts})