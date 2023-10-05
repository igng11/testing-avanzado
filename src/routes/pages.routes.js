import { Router } from "express";
import { PagesController } from "../controllers/pages.controller.js";

const router = Router();


router.get("/home", PagesController.renderHome);

router.get("/shop", PagesController.renderShop);

router.get("/essential", PagesController.renderEssential);

router.get("/about", PagesController.renderAbout);

router.get("/contact", PagesController.renderContact);


export {router as pagesRouter}