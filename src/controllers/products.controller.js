import { productDao } from "../dao/index.js";

export class ProductsController{

    static getProducts = async (req, res) => {
      try {
        const limit = req.query.limit;
        const products = await productDao.get();
  
        if (limit) {
          const limitedProducts = products.slice(0, parseInt(limit));
          res.json({ status: "success", data: limitedProducts });
        } else {
          res.json({ status: "success", data: products });
        }
      } catch (error) {
        res.json({ status: "error", message: error.message });
      }
    };

    static createProduct = async(req,res)=>{
      //Agregar el producto
      try {
          const productInfo = req.body;
          productInfo.owner = req.user._id;
          const productCreated = await productDao.createProduct(productInfo);
          res.json({status:"success", data:productCreated, message:"producto creado"});
      } catch (error) {
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

      static deleteProduct = async(req,res)=>{
        try {
            const productId = req.params.pid;
            const product = await productDao.getProduct(productId);
            //validar que el usuario que esta intentando borrar el producto
            //Si es premium y es el creador del producto
            //Si es usuario administrador
            if((req.user.role === "premium" && product.owner.toString() === req.user._id.toString()) || req.user.role === "admin"){
                await productDao.deleteProduct(productId);
                return res.json({status:"success", message:"producto eliminado"});
            } else {
                return res.json({status:"error", message:"no tienes permisos"});
            }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
    };