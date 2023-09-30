import {ProductManagerMongo} from "./managers/mongo/productMgrMongo.js";
import {CartsManagerMongo} from "./managers/mongo/cartsMgrMongo.js";
import { UsersMongo } from "./managers/mongo/users.mongo.js";
import { TicketsMgrMongo } from "./managers/mongo/ticketsMgrMongo.js";

const ticketsDao = new TicketsMgrMongo();
const productDao = new ProductManagerMongo();
const cartDao = new CartsManagerMongo();
const userDao = new UsersMongo();

export {productDao,cartDao,userDao, ticketsDao};
