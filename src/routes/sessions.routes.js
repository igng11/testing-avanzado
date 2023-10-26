import { Router } from "express";
import { checkUserAuthenticated, showLoginView } from "../middlwares/auth.js";
import passport from "passport";
import { SessionsController } from "../controllers/sessions.controller.js";
// import { userDao } from "../dao/index.js";
// import { createHash, isValidPassword } from "../utils.js";

const router = Router();

router.get("/views", SessionsController.viewSessions);

router.post("/signup", SessionsController.signupSession);

router.get("/login", showLoginView, SessionsController.loginSessions);
// router.get("/login", SessionsController.loginSessions);

router.post("/profile", SessionsController.profileSessions);

router.get("/logout", SessionsController.logoutSessions);


//authentication github
router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

router.get("/github-callback", passport.authenticate("githubLoginStrategy",{
    failureRedirect:"/fail-signup"
}), SessionsController.loginGitSessions);


router.get("/registro",showLoginView, SessionsController.registroSessions);
// router.get("/registro",SessionsController.registroSessions);


router.get("/profile", checkUserAuthenticated, SessionsController.perfilSessions);
// router.get("/profile", SessionsController.profileSessions);

router.post("/forgot-password", SessionsController.forgotPassword);

router.post("/reset-password", SessionsController.resetPassword);


export {router as sessionRouter};