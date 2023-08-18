import { Router } from "express";
import { cartService, productService } from "../src/dao/index.js";

const router = Router();

// Ruta raíz POST /api/carts/
// Crea un nuevo carrito
router.post("/", (req, res) => {
  const newCart = cartService.save();
  res.json({ status: "success", data: newCart });
});

// Ruta GET /api/carts/:cid
// Lista los productos que pertenecen al carrito con el cid proporcionado
router.get("/:cid", (req, res) => {
  const cartId = req.params.cid;
  const cart = cartService.getCartById(cartId);
  if (cart) {
    res.json({ status: "success", data: cart.products });
  } else {
    res.json({ status: "error", message: "Carrito no encontrado" });
  }
});

//////////////////////////////////////GPT////////////////////////////////

// Ruta POST /api/carts/:cid/product/:pid
// Agrega el producto al carrito seleccionado
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  const quantity = parseInt(req.body.quantity);
  
  try {
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.json({ status: "error", message: "Producto no encontrado" });
    }

    const cart = await cartService.getCartById(cartId);
    if (!cart) {
      return res.json({ status: "error", message: "Carrito no encontrado" });
    }

    const updatedCart = await cartService.addProductToCart(cartId, product, quantity);
    return res.json({ status: "success", message: "Producto agregado al carrito", data: updatedCart });
  } catch (error) {
    return res.json({ status: "error", message: "Error al agregar el producto al carrito" });
  }
});
//////////////////////////////////////////////////////////////////////

export { router as cartsRouters };
