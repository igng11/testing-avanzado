import { config } from "../config/config.js";
import ProductManager from "./managers/fileSystem/productsManager.js";
import {CartsManager} from "./managers/fileSystem/cartsManager.js";
import {ProductManagerMongo} from "./managers/mongo/productMgrMongo.js"
import {CartsManagerMongo} from "./managers/mongo/cartsMgrMongo.js";
import { UsersMongo } from "./managers/mongo/users.mongo.js";

const productService = new ProductManagerMongo();
const cartService = new CartsManagerMongo();
const userService = new UsersMongo();

export {productService,cartService,userService};
