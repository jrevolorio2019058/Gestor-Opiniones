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