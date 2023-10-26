import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { gmailTransporter } from "../config/gmail.config.js";

export const generateEmailToken = (email, expireTime)=>{
    //genera el token
    const token = jwt.sign({email},config.gmail.secretToken,{expiresIn:expireTime});
    return token;
};

//funcion para generar enlace con token
export const recoveryEmail = async(req,userEmail,emailToken)=>{
    try {
        const domain = `${req.protocol}://${req.get('host')}`;
        const link = `${domain}/reset-password?token=${emailToken}`;
        //Enviar el correo con el enlace
        await gmailTransporter.sendMail({
            from:"Frest Lab",
            to: userEmail,
            subject:"Restablece tu contraseña - FrestLab",
            html: `
                <p>Solicitaste restablecer tu contraseña</p>
                <p>Haz click <a href=${link}>aqui</a></p> para restablecer tu constraseña
            `
        });
    } catch (error) {
        console.log(`Hubo un error ${error.message}`);
    }
};