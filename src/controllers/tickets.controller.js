import { TicketsService } from "../services/tickets.service.js";
// import { CartsService } from "../services/carts.service.js";
import { cartDao } from "../dao/index.js";
import {ProductsService} from "../services/products.service.js";

export class TicketsController{
    static async createTicket(req,res){
        try {
            const cartId = req.params.cid;
            const cart = await cartDao.getCart(cartId);
            const productsCart = cart.products;
            let purchaseProducts=[];
            let rejectedProducts=[];
            //iteramos por cada producto del carrito
            for(let i=0;i<productsCart.length;i++){
                const product = ProductsService.getProduct(productsCart[i].productId);
                //si quantiy < product.stock
                let totalAmount = 0; // Variable para realizar un seguimiento del monto total de la compra.

            // Iteramos por cada producto del carrito
            for (let i = 0; i < productsCart.length; i++) {
            const product = ProductsService.getProduct(productsCart[i].productId);
            const quantity = productsCart[i].quantity; // Obtener la cantidad del producto en el carrito

            // Comprobar si la cantidad en el carrito es menor o igual al stock del producto
            if (quantity <= product.stock) {
            // El producto se puede comprar, agregarlo a la lista de compra
            purchaseProducts.push({
                productId: product.id,
                quantity: quantity,
                price: product.price,
            });

        // Actualizar el stock del producto
        ProductsService.updateProductStock(product.id, product.stock - quantity);

        // Calcular el monto total
        totalAmount += product.price * quantity;
    } else {
        // Si el producto no se puede comprar debido a la falta de stock, se agrega a la lista de productos rechazados
        rejectedProducts.push({
            productId: product.id,
            quantity: quantity,
        });
    }
}

        //else, agregamos el producto a purchaseProducts, y adicional actualizamos el producto product.stock - quantity
            }
            const newTicket = {
                code,
                purchase_datetime:new Date(),
                amount: totalAmount,
                purchaser:req.user.email,
            }
            const ticketCreated = await TicketsService.createTicket(newTicket);
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    }
}