export const checkUserAuthenticated = (req,res,next)=>{
    console.debug('Checking if user is authenticated');
    console.debug(req.session);
    if(req.session?.userInfo){
        console.debug('User is authenticated, calling next()');
        next();
    } else {
        console.debug('User is not authenticated, redirecting to /signup');
        res.redirect("/signup");
    }
};

export const showLoginView = (req,res,next)=>{
    console.debug(req.session);
    if(req.session?.userInfo){
        res.redirect("/profile");
    } else {
        next();
    }
};

export const checkRole = (roles)=>{ 
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