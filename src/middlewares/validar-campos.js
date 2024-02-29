import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {

    const error = validationResult(req);
    
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    next();

}

export const validacionPassword = (req, res, next) =>{

    const {password, passwordConfirmation} = req.body;

    if(password != passwordConfirmation){

        return res.status(400).json({
            msg: `La confirmación ${passwordConfirmation} no coincide con la contraseña ${password}`
        });

    }

    next();

}

export const userNameANDEmailEmpty = (req, res, next) =>{

    const {userName, email} = req.body;

    if(email == null && userName == null){

        return res.status(422).json({
            msg: `Se necesita de un email o de una usuario`
        });

    }

    next();

}

export const userNameANDEmailIsBoth = (req, res, next) =>{

    const {userName, email} = req.body;

    if(email != null && userName != null){

        return res.status(422).json({
            msg: `No se puede ingresar userName: ${userName} y email: ${email} al mismo tiempo.`
        });

    }

    next();

}