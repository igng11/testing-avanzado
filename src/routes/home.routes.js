import { Router } from "express";
import { ProductManagerMongo } from "../src/dao/managers/mongo/productMgrMongo.js";
import { uploader } from "../src/utils.js";
import { HomeController } from "../controllers/home.controller.js";

const productDao = new ProductManagerMongo();

const homeRouter = Router();

//esta ruta trae los productos que luego se renderizan en el fetch de /home.hbs
homeRouter.get("/", HomeController.getHomeProducts);

homeRouter.post("/",uploader.single("fileImage"), HomeController.createHomeProducts);

homeRouter.delete("/:sid",);

// Ruta para eliminar todos los productos
homeRouter.delete("/", HomeController.deleteAllProducts);

export {homeRouter as productsRouter}