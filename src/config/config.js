import dotenv from "dotenv";
dotenv.config();

export const config = {
    server:{
        port:8082,
        secretSesion: "FrestPass"
        // port:process.env.PORT,
        // secretSession:process.env.SECRET_SESSION
    },
    fileSystem:{
        productFile:"product.json",
        cartFile:"cart.json"
    },
    mongo:{
        url:"mongodb+srv://igng44:8PjX1dcqFKZCUUqq@cluster0.13qf6cu.mongodb.net/products?retryWrites=true&w=majority",
        // url:process.env.MONGO_URL
        sessions:"mongodb+srv://igng44:8PjX1dcqFKZCUUqq@cluster0.13qf6cu.mongodb.net/sessions?retryWrites=true&w=majority"
    },
    github:{
        clientId:"Iv1.8073dd6ba9800cfb",
        clienteSecret:"0d858a447f3cbb5b797bbd2112863985f8361624",
        callbackUrl:"http://localhost:8082/github-callback"
    }
}



