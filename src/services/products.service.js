//importar la capa de persisitencia
import { productDao } from "../dao/index.js";

export class ProductsService{
    static getProducts = async()=>{
        return await productDao.get();
    };

    static createProduct = async(productInfo)=>{
        return await productDao.save(productInfo);
    };
}