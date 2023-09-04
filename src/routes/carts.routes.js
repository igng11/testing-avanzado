import { Router } from "express";
import { cartService, productService } from "../dao/index.js";
import { cartsModel } from "../dao/managers/models/carts.model.js";
import { productsModel } from "../dao/managers/models/products.model.js";

const router = Router();

// Ruta raíz POST /api/carts/
// Crea un nuevo carrito
router.post("/", (req, res) => {
  const newCart = cartService.save(req.body);
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
// router.post("/:cid/product/:pid", async (req, res) => {
//   const cartId = req.params.cid;
//   const productId = parseInt(req.params.pid);
//   const quantity = parseInt(req.body.quantity);
  
//   try {
//     const product = await productService.getProductById(productId);
//     if (!product) {
//       return res.json({ status: "error", message: "Producto no encontrado" });
//     }

//     const cart = await cartService.getCartById(cartId);
//     if (!cart) {
//       return res.json({ status: "error", message: "Carrito no encontrado" });
//     }

//     const updatedCart = await cartService.addProductToCart(cartId, product, quantity);
//     return res.json({ status: "success", message: "Producto agregado al carrito", data: updatedCart });
//   } catch (error) {
//     return res.json({ status: "error", message: "Error al agregar el producto al carrito" });
//   }
// });


// Ruta POST /api/carts/:cid/products
// Agrega un producto al carrito con el ID proporcionado
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    console.log(`Adding product ${productId} to cart ${cartId}`); // Log the operation

    // Busca el carrito por ID
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      console.log(`Cart ${cartId} not found`); // Log if the cart is not found
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Agrega el ID del producto al array de productos del carrito
    cart.productsCarts.push(productId);

    // Guarda el carrito actualizado
    const updatedCart = await cart.save();
    console.log(`Saved updated cart: ${JSON.stringify(updatedCart)}`); // Log the updated cart

    // Verifica que todos los IDs de los productos corresponden a productos existentes
    const productsExist = await Promise.all(updatedCart.productsCarts.map(async (productId) => {
      const product = await productsModel.findById(productId);
      return !!product;
    }));
    if (productsExist.some(exists => !exists)) {
      console.log('One or more product IDs do not correspond to existing products');
      return res.status(400).json({ message: 'One or more product IDs do not correspond to existing products' });
    }

    // Devuelve el carrito actualizado con los productos poblados
    const populatedCart = await cartsModel.findById(updatedCart._id).populate('productsCarts');
    console.log(`Returning populated cart: ${JSON.stringify(populatedCart)}`); // Log the populated cart
    res.json(populatedCart);
  } catch (error) {
    console.error(`Error: ${error.message}`); // Log the error
    res.status(500).json({ message: error.message });
  }
});
//////////////////////////////////////////////////////////////////////

export { router as cartsRouters };
