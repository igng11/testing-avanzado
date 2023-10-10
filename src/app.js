import express from "express";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import {config} from "./config/config.js"
import { productsRouters } from "./routes/product.routes.js"
import { connectBD } from "./config/dbConnection.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { ProductManagerMongo } from "./dao/managers/mongo/productMgrMongo.js";
import { productDao } from "./dao/index.js";
import { pagesRouter } from "./routes/pages.routes.js";
import { Server } from "socket.io";
import Message from '../src/dao/managers/models/chat.models.js';
import { cartsRouters } from "./routes/carts.routes.js";
import { homeRouters } from "./routes/home.routes.js";
import { sessionRouter } from "./routes/sessions.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { initializePassport } from "./config/passportConfig.js"
import { generateUser } from "./utils/helpers.js";
import { addLogger } from "./helpers/logger.js";
// import { routerFS } from "./routes/product-fs.routes.js";
// import FileStore from "session-file-store";

const port = config.server.port;
const app = express();

//mildwares
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));

//configuracion de las sessiones en el servidor
app.use(session({
  store: MongoStore.create({
      ttl:40,
      mongoUrl:config.mongo.sessions
  }),
  secret:config.mongo.sessions, //cifra el id de la sesion dentro de la cookie
  resave:true,
  saveUninitialized:true
}));//req.session

//configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//servidor de express (guardar el servidor en una variable para conectarlo al de socket)
const httpServer = app.listen(port,()=>console.info(`Server ${port}`));

//crear el servidor de websocket (lado del servidor)
const io = new Server(httpServer);

//conexion a la base de datos
connectBD();

//configuracion de handlebars
app.engine('.hbs', engine({extname: ".hbs",
runtimeOptions: {allowProtoProperties: true, // Permitir acceso a propiedades no propias
}}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//routes
// app.use("/home",homeRouters);
app.use("/products",productsRouters);
app.use("/carts",cartsRouters);
app.use("/users", usersRouter);
app.use("/",pagesRouter);
app.use("/",sessionRouter);
// app.use("/fileSystem",routerFS);

//traer productos faker
app.get("/mockingpoducts", (req,res)=>{
  const cant = parseInt(req.query.cant) || 100;
  let users = [];
  for(let i=0;i<cant;i++){
      const user = generateUser();
      users.push(user);
  }
  res.json({status:"success", data:users});
});

const logger = addLogger();
app.get("/loggerTest",(req,res)=>{
  // console.info("peticion get recibida");
  logger.silly("mensaje de nivel silly");
  logger.info("mensaje de nivel info");
  logger.debug("mensaje con nivel debug");
  logger.http("mensaje de nivel http");
  logger.error("mensaje de nivel error");
  logger.warn("mensaje de nivel warn");
  logger.verbose("mensaje de nivel verbose");
  res.send("peticion recibida");
});

// Definir las rutas
// ruta para renderizar productos
app.get("/home", async (req, res) => {
  try {
  //traer la hoja de estilos
  const products = await productDao.get();
  console.debug(products);
  // Renderizar la vista "home.hbs" con los productos como datos
  res.render("home", {products: products, user: req.session.userInfo});}
catch (error) {
res.render("error");
}});


//ruta para traer json de productos
app.get("/get", async (req, res) => {
  try {
  //traer productos
  console.debug("solicitando...")
  const products = await productDao.get();
  console.debug("solicitando...2")
  // Renderizar la vista "home.hbs" con los productos como datos
  res.json(products);}
catch (error) {
  console.debug("error ", error);
res.render("error al obtener products");
}});

//cookies
//mildeware para gestionar cookies
// app.use(cookieParser("securityKey"));//gestion de cookies por parte del servidor//no es necesario ya que viene incluido en express-session
//mildware para recibir el form en formato JSON
app.use(express.urlencoded({extended:true}));

//sockets
let messages = [];
io.on("connection",(socket)=>{
  console.info("nuevo cliente conectado");
  
  //capturamos el ingreso de un nuevo usuario
  socket.on("autenticated",(msg)=>{
      socket.emit("messageHistory", messages);
      //enviamos la informacion de que un nuevo usuario se conecto al resto, excepto al que se conecta
      socket.broadcast.emit("newUser",msg);
  });

  socket.on("message",(data)=>{
      console.debug("data", data);
      messages.push(data);

      // Insertar el mensaje en la base de datos
      const newMessage = new Message({
        user: data.user, 
        email: data.email, 
        message: data.message,
        timestamp: new Date().toLocaleString()
      });

      newMessage.save()
        .then(() => {
          console.info('Mensaje guardado en la base de datos');
        })
        .catch(error => {
          console.error('Error al guardar el mensaje en la base de datos:', error);
        });

      //cada vez que recibimos mje, debemos enviarlos a todos los clientes conectados
      io.emit("messageHistory", messages);
  });
});