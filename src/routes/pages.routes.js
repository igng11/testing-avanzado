import { Router } from "express";
import { PagesController } from "../controllers/pages.controller.js";

const pagesRouter = Router();

pagesRouter.get("/shop", PagesController.renderShop);

pagesRouter.get("/essential", PagesController.renderEssential);

pagesRouter.get("/about", PagesController.renderAbout);

pagesRouter.get("/contact", PagesController.renderContact);


export {pagesRouter as pagesRouter}