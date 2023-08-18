export const config = {
    server:{
        port:8082,
        secretSesion: "FrestPass"
    },
    fileSystem:{
        productFile:"product.json",
        cartFile:"cart.json"
    },
    mongo:{
        url:"mongodb+srv://igng44:8PjX1dcqFKZCUUqq@cluster0.13qf6cu.mongodb.net/products?retryWrites=true&w=majority",
        sessions:"mongodb+srv://igng44:8PjX1dcqFKZCUUqq@cluster0.13qf6cu.mongodb.net/sessions?retryWrites=true&w=majority"
    }
}
