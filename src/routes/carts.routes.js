import { Router } from "express";
import { cartDao, productDao } from "../dao/index.js";
import { cartsModel } from "../dao/managers/models/carts.model.js";
import { productsModel } from "../dao/managers/models/products.model.js";
import { CartController } from "../controllers/carts.controller.js";
import { TicketsController } from "../controllers/tickets.controller.js";


const router = Router();

// Ruta raíz POST /api/carts/
// Crea un nuevo carrito
router.post("/", CartController.createCart);

// Ruta GET /api/carts/:cid
// Lista los productos que pertenecen al carrito con el cid proporcionado
router.get("/:cid", CartController.getCartProducts);


// Ruta POST /api/carts/:cid/products
// Agrega un producto al carrito con el ID proporcionado
router.post("/:cid/product/:pid", CartController.addProductToCart);


router.post("/:cid/purchase", TicketsController.createTicket );

export { router as cartsRouters };
