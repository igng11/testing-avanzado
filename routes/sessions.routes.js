import { Router } from "express";
import { checkUserAuthenticated, showLoginView } from "../src/midlwares/auth.js";
import { userService } from "../src/dao/index.js";

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
        const result = await userService.save(signupForm);
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
        if(user.password === loginForm.password){
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