export class HomeController{
    static getHomeProducts = async(req,res)=>{
        try{
            const products = await productDao.get();
            res.json({status:"success",data:products})
        }catch(error){
            console.log(error.message);
            res.json({status:"error",message:"Hubo un error al obtener los productos"});
        }
    }

    static createHomeProducts = (req,res)=>{
        try{
            console.log("files", req.file);
            const productsCreated = productDao.create(req.body); 
            res.json({status:"success",data:productsCreated});
        }catch(error){
            console.log(error.message);
            res.json({status:"error",message:"Hubo un error al crear producto"});
        }
    }

    static deleteHomeProducts = async(req,res)=>{
        try{
            const productsId = req.params.sid;
            await productDao.delete({_id:productsId}); 
            res.json({status:"success",message:"producto eliminado"});
        }catch(error){
            console.log(error.message);
            res.json({status:"error",message:"Hubo un error al eliminar el producto"});
        }
    }

    static deleteAllProducts = async (req, res) => {
        try {
          const deletedProducts = await productDao.deleteAll();
          res.json({
            status: "success",
            message: `Se han eliminado ${deletedProducts.deletedCount} productos`,
          });
        } catch (error) {
          console.log(error.message);
          res.json({ status: "error", message: "Hubo un error al eliminar los productos" });
        }
      }
}