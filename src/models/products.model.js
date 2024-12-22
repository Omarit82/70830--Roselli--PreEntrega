import { Schema, model } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema ({
    title: {
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    price: {
        type:Number,
        required:true
    },
    status: {
        type:Boolean,
        default:true
    },
    stock: {
        type:Number,
        required:true,
        min:0
    },
    category: {
        type:String,
        required: true,
        index:true
    },
    thumbnail: {
        default: []
    }
})
productSchema.plugin(mongoosePaginate)
export const productsModel = model("products",productSchema)
