import { Router } from "express";
// import { ProductManagerMongo } from "../src/dao/managers/mongo/productMgrMongo.js";
import { uploader } from "../utils.js";
import { HomeController } from "../controllers/home.controller.js";

// const productDao = new ProductManagerMongo();

const router = Router();

//esta ruta trae los productos que luego se renderizan en el fetch de /home.hbs
router.get("/home", HomeController.getHomeProducts);

router.post("/", uploader.single("fileImage"), HomeController.createHomeProducts);

router.delete("/:sid",);

// Ruta para eliminar todos los productos
router.delete("/", HomeController.deleteAllProducts);

export {router as homeRouters}