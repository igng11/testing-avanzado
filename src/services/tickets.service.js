import { ticketsDao } from "../dao/index.js";

export class TicketsService {
    static async createTicket(ticketInfo){
        return await ticketsDao.createTicket(ticketInfo);
    };
};

export class ProductsService {
    static async updateProductStock(productId, newStock) {
        try {
            // Actualiza el stock del producto con el nuevo valor en la base de datos
            await productsDao.updateProductStock(productId, newStock);

            // Puedes agregar una verificación adicional aquí para manejar casos de error
            // si la actualización no tiene éxito.

            console.log(`Stock actualizado para el producto con ID ${productId} a ${newStock}`);

            // Devuelve true para indicar que la actualización tuvo éxito
            return true;
        } catch (error) {
            // En caso de error, maneja la excepción apropiadamente
            console.error(`Error al actualizar el stock del producto con ID ${productId}: ${error.message}`);

            // Devuelve false o lanza una excepción según lo que necesites en tu aplicación
            throw error;
        }
    }
}
