// //ruta para crear una cookie
// app.get("/crearCookie",(req,res)=>{
//     res.cookie("cookie1","oreo").send("cookie creada");
// });

// app.get("/crearCookie2",(req,res)=>{
//     res.cookie("cookie2","Pepitos",{maxAge:5000}).send("cookie creada");
// });

// //ruta para cookie firmada
// app.get("/crearCookie4",(req,res)=>{
//     res.cookie("cookie4","{username:'pepe',role:'user'}",{signed:true}).send("cookie firmada creada");
// });

// //ruta para obtener o leer las cookies
// app.get("/leerCookies",(req,res)=>{
//     const cookies = req.cookies; //req.cookies['nombreCookie']
//     res.send(cookies);
// });

// //ruta para obtener las cookies firmadas
// app.get("/leerCookiesFirmadas",(req,res)=>{
//     const cookies = req.signedCookies;
//     res.send(cookies);
// });

// //ruta para eliminar de una cookie
// app.get("/eliminarCookie",(req,res)=>{
//     res.clearCookie('cookie1').send("cookie eliminada")
// });

// app.post("/crearCookieForm",(req,res)=>{
//   const loginInfo = req.body;
//   res.cookie("userInfo",`{user:${loginInfo.first_name},email:${loginInfo.email}}`,{maxAge:10000}).send("Informacion recibida");
// });

// app.get("/leerCookies",(req,res)=>{
//   const cookies = req.cookies;
//   res.send(cookies);
// });