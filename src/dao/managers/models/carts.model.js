import mongoose from "mongoose";
import { cartCollection } from "../../../constants/index.js";

const cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product" // Aquí debes proporcionar el nombre del modelo referenciado
    }]
});

export const cartsModel = mongoose.model(cartCollection, cartSchema);