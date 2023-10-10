import {faker,Faker,es,en} from "@faker-js/faker";


const {database, commerce, image, company, internet, person} = faker;

const generateProduct = ()=>{
    return {
        id:database.mongodbObjectId(),
        
        num:database.mongodbObjectId(),
        p_name:commerce.productName(),
        p_desc:commerce.productDescription(),
        c_name:company.name(),
        c_desc:company.catchPhraseDescriptor(),
        price:commerce.price(),
        price_l:commerce.price(),
        specification1:commerce.productDescription(),
        specification2:commerce.productDescription(),
        specification3:commerce.productDescription(),
        link:internet.url(),
        img_1:image.url(),
    }
};
// console.debug(generateProduct());

//generar usuarios
export const generateUser = ()=>{
    //generamos un numero aleatorio de productos que se agregaran al carrito
    const numberOfProducts = parseInt(Math.floor(Math.random() * 9) + 1);//1-9
    let products = [];
    for(let i=0;i<numberOfProducts;i++){
        const newProduct = generateProduct();
        products.push(newProduct);
    };
    // console.debug("numberOfProducts: ", numberOfProducts);
    return {
        id:database.mongodbObjectId(),
        first_name:person.firstName(),
        // last_name:person.lastName(),
        email:internet.email(),
        cart:products
    };
};
// console.debug(generateUser()); 