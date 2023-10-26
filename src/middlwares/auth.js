export const checkUserAuthenticated = (req,res,next)=>{
    console.debug('Chequeando si el usuario esta auth..');
    // console.debug(req.session);
    if(req.session?.userInfo){
        console.debug('Usuario autenticado...');
        next();
    } else {
        console.debug('Usuario no autenticado, redirigiendo a Login');
        res.redirect("/login");
    }
};

export const showLoginView = (req,res,next)=>{
    // console.debug(req.session);
    if(req.session?.userInfo){
        res.redirect("/profile?message=El usuario ya ha iniciado sesión");
    } else {
        next();
    }
};

export const checkRole = (roles)=>{  //roles = ["admin", "superadmin"]
    roles = ["admin", "superadmin"]
    return (req,res,next)=>{
        console.debug("req", req.user);
        if(roles.includes(req.user.role)){
            next();
        } else {
            res.json({status:"error", message:"No tienes permisos para usar este recurso"});
        }
    }
};

export const checkAuthenticated = (req,res,next)=>{
    if(req.user){
        next();
    } else {
        res.json({status:"error", message:"Debes estar autenticado"});
    }
};