import mongoose from "mongoose";
import {productsModel} from "../dao/managers/models/products.model.js"
import {config} from "../config/config.js"

const updateProducts = async()=>{
    try {
        await mongoose.connect(config.mongo.url);
        console.log("base de datos conectada");
        const adminId= "64dffc85d286c53f4d562cb3";
        const result = await productsModel.updateMany({},{$set:{owner:adminId}});
        console.log(result);
    } catch (error) {
        console.log(error);
    } finally{
        await mongoose.connection.close();
    }
};
updateProducts();