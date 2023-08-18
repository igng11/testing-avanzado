export const checkUserAuthenticated = (req,res,next)=>{
    console.log(req.session);
    if(req.session?.userInfo){
        next();
    } else {
        res.redirect("/sessions");
    }
};

export const showLoginView = (req,res,next)=>{
    console.log(req.session);
    if(req.session?.userInfo){
        res.redirect("/perfil");
    } else {
        next();
    }
};