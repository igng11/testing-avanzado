import { productDao } from "../dao/index.js";

export class ProductsController{
    static getProducts = async (req, res) => {
        try {
          const limit = req.query.limit;
          const products = await productDao.get();
          if(limit){
              //devolver productos de acuerdo al limite
        } else {
          res.json({ status: "success", data: products });
        }
      }catch (error){
          res.json({status:"error", message:error.message});
      }
      };

    static getProductById = (req, res) => {
        const productId = parseInt(req.params.pid);
        const product = productDao.getProductById(productId);
        if (product) {
          res.json({ status: "success", data: product });
        } else {
          res.json({ status: "error", message: "Producto no encontrado" });
        }
      }
    
    static setProductById = async (req, res) => {
        try {
            const productInfo = req.body;
            const productCreated = await productDao.save(productInfo);
              res.json({ status: "success", data: productCreated, 
              message:"producto creado"});
        } catch (error){
            res.json({status:"error", message:error.message});
        }
      }

    static deleteProductByID = async (req, res) => {
        try {
            const productId = parseInt(req.params.pid);
    
            // Verifica si el producto existe antes de intentar eliminarlo
            const product = productDao.getProductById(productId);
            if (!product) {
                res.json({ status: "error", message: "Producto no encontrado" });
                return;
            }
    
            // Llama al servicio para eliminar el producto por su ID
            const deletedProduct = await productDao.deleteProductById(productId);
    
            if (deletedProduct) {
                res.json({ status: "success", message: "Producto eliminado exitosamente" });
            } else {
                res.json({ status: "error", message: "No se pudo eliminar el producto" });
            }
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }}
    };