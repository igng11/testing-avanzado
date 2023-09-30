import { userDao } from "../dao/index.js";
import { isValidPassword } from "../utils.js";


export class SessionsController {
    static viewSessions = (req,res)=>{
        console.log(req.session)
        if(req.session?.user?.username){
            req.session.user.visitas++;
            res.send(`Ya estas logueado ${req.session.user.username} y visitaste esta pagina ${req.session.user.visitas} veces.`);
            console.log(req.session);
        } else {
            res.send("necesitas estar logueado")
        }
    }

    static signupSession = async(req,res)=>{
        try {
            const signupForm = req.body;
            console.log("Received POST request:", signupForm);
            //verificar si el usuario ya se registro
            const user = await userDao.getByEmail(signupForm.email);
            console.log(user);
            if(user){
                return res.render("signup",{error:"el usuario ya esta registrado"});
            }
            const newUser = {
                first_name:signupForm.first_name,
                email:signupForm.email,
                password: createHash(signupForm.password)
            }
            const result = await userDao.save(newUser);
            res.render("signup",{message:"usuario registrado"});
        } catch (error) {
            res.render("sessions",{error:error.message});
        }
    }

    static profileSessions = async(req,res)=>{
        try {
            const loginForm = req.body;
            console.log(loginForm);
            //verificar si el usuario ya se registro
            const user = await userDao.getByEmail(loginForm.email);
            if(!user){
                return res.render("signup",{error:"El usuario no se ha registrado"});
            }
            //si el usuario existe, validar la contraseña
            if(isValidPassword(user,loginForm.password)){
                //si la contraseña es valida, creamos la session
                req.session.user = {
                    first_name:user.first_name,
                    email:user.email
                };
                res.redirect("/profile");
            } else {
                return res.render("login",{error:"Credenciales invalidas"});
            }
        } catch (error) {
            res.render("signup",{error:error.message});
        }
    }

    static logoutSessions = (req,res)=>{
        req.session.destroy(error=>{
            if(error) return res.render("profile",{user: req.session.userInfo, error:"No se pudo cerrar la sesion"});
            res.redirect("/signup");
        })
    }

    static loginGitSessions = (req,res)=>{
        console.log('GitHub authentication successful, redirecting to /perfil');
        req.session.userInfo = {
            first_name: req.user.first_name,
            email: req.user.email
        };
        res.redirect("/perfil");
    }

    static registroSessions = (req,res)=>{
        res.render("signup");
    }

    static loginSessions = (req,res)=>{
        res.render("login");
    }

    static perfilSessions = (req,res)=>{
        console.log(req.session);
        res.render("profile",{user: req.session.userInfo});
    }
}