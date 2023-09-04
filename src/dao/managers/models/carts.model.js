import mongoose from "mongoose";
import { cartCollection } from "../../../constants/index.js";
import { productsModel } from "./products.model.js"; // Importa el modelo de producto

const cartSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        default: function() {
            // Genera un título único basado en la fecha y hora actuales
            return 'Cart-' + Date.now();
        }
    },
    productsCarts: {
        type: [ 
            {type: mongoose.Schema.Types.ObjectId,
            ref: "products" // Usa el nombre del modelo de producto
        }],
    default:[]
    }
});

export const cartsModel = mongoose.model(cartCollection, cartSchema);