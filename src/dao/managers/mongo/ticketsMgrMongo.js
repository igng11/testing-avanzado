import { ticketsModel } from "../models/tickets.model.js";

export class TicketsMgrMongo{
    constructor(){
        this.model = ticketsModel;
    };

    async createTicket(ticketInfo){
        try {
            const result = await this.model.create(ticketInfo);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}