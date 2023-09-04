
import { cartsModel } from "../models/carts.model.js";

export class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
  };

  //////////////////GPT////////////////////////
// Agregar un producto al carrito
async addProductToCart(cartId, productId) {
  try {
    const cart = await this.model.findById(cartId);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    // Agregar el ID del producto al array de productos del carrito
    cart.productsCarts.push(productId);

    // Guardar los cambios en el carrito
    await cart.save();

    return cart;
  } catch (error) {
    throw error;
  }
}
///////////////////GPT///////////////////////
  
  // Obtener todos los carts
    async getAll() {
        try {
            const carts = await this.model.find();
            return carts;
        } catch (error) {
            throw error;
        }
    }

    async save(){
        try {
            const cartCreated = await this.model.create({});
            return cartCreated;
        } catch (error) {
            throw error;
        }
    };
}

export default CartsManagerMongo;
