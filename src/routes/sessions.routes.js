import { Router } from "express";
import { checkUserAuthenticated, showLoginView } from "../middlwares/auth.js";
import { userService } from "../dao/index.js";
import passport from "passport";
import { createHash, isValidPassword } from "../utils.js";

const sessionRouter = Router();

sessionRouter.get("/views",(req,res)=>{
    console.log(req.session)
    if(req.session?.user?.username){
        req.session.user.visitas++;
        res.send(`Ya estas logueado ${req.session.user.username} y visitaste esta pagina ${req.session.user.visitas} veces.`);
        console.log(req.session);
    } else {
        res.send("necesitas estar logueado")
    }
});

sessionRouter.get("/",(req,res)=>{
    res.send("bienvenido");
    console.log(req.session);
});

sessionRouter.post("/signup", async(req,res)=>{
    try {
        const signupForm = req.body;
        console.log("Received POST request:", signupForm);
        //verificar si el usuario ya se registro
        const user = await userService.getByEmail(signupForm.email);
        console.log(user);
        if(user){
            return res.render("signup",{error:"el usuario ya esta registrado"});
        }
        const newUser = {
            first_name:signupForm.first_name,
            email:signupForm.email,
            password: createHash(signupForm.password)
        }
        const result = await userService.save(newUser);
        res.render("signup",{message:"usuario registrado"});
    } catch (error) {
        res.render("sessions",{error:error.message});
    }
});

sessionRouter.post("/profile", async(req,res)=>{
    try {
        const loginForm = req.body;
        console.log(loginForm);
        //verificar si el usuario ya se registro
        const user = await userService.getByEmail(loginForm.email);
        if(!user){
            return res.render("sessions",{error:"El usuario no se ha registrado"});
        }
        //si el usuario existe, validar la contraseña
        if(isValidPassword(user,loginForm.password)){
            //si la contraseña es valida, creamos la session
            req.session.userInfo = {
                first_name:user.first_name,
                email:user.email
            };
            res.redirect("/home");
        } else {
            return res.render("signup",{error:"Credenciales invalidas"});
        }
    } catch (error) {
        res.render("signup",{error:error.message});
    }
});

sessionRouter.get("/logout", (req,res)=>{
    req.session.destroy(error=>{
        if(error) return res.render("profile",{user: req.session.userInfo, error:"No se pudo cerrar la sesion"});
        res.redirect("/signup");
    })
});

//authentication github
sessionRouter.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

sessionRouter.get("/github-callback", passport.authenticate("githubLoginStrategy",{
    failureRedirect:"/fail-signup"
}), (req,res)=>{
    console.log('GitHub authentication successful, redirecting to /perfil');
    req.session.userInfo = {
        first_name: req.user.first_name,
        email: req.user.email
    };
    res.redirect("/perfil");
});




const router = Router();

sessionRouter.get("/registro",showLoginView,(req,res)=>{
    res.render("sessions");
});

sessionRouter.get("/signup", showLoginView, (req,res)=>{
    res.render("signup");
});

sessionRouter.get("/perfil", checkUserAuthenticated, (req,res)=>{
    console.log(req.session);
    res.render("profile",{user: req.session.userInfo});
});

export {router as viewsRouter};
export {sessionRouter};