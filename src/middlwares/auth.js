// export const checkUserAuthenticated = (req,res,next)=>{
//     console.log(req.session);
//     if(req.session?.userInfo){
//         next();
//     } else {
//         res.redirect("/sessions");
//     }
// };

export const checkUserAuthenticated = (req,res,next)=>{
    console.log('Checking if user is authenticated');
    console.log(req.session);
    if(req.session?.userInfo){
        console.log('User is authenticated, calling next()');
        next();
    } else {
        console.log('User is not authenticated, redirecting to /sessions');
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