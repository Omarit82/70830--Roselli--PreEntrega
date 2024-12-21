import {Schema, model} from 'mongoose';

const cartSchema = new Schema ({
    products: {
        type: [
            {
                id_prod:{ 
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref:"products"
                },
                quantity: {
                    required: true,
                    type:Number
                }
            },

        ],
        default: []
    }
})

export const cartModel = model("carts",cartSchema)
