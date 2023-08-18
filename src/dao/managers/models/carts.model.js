import mongoose from "mongoose";
import { cartCollection } from "../../../constants/index.js";

const cartSchema = new mongoose.Schema({
    products:{
        type:[],
        default:[]
    }
});

export const cartsModel = mongoose.model(cartCollection,cartSchema);
