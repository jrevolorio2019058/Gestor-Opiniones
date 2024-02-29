import { validationResult } from "express-validator";

import bcryptjs from 'bcryptjs';


export const validarCampos = (req, res, next) => {

    const error = validationResult(req);
    
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    next();

}

export const validacionPassword = (req, res, next) =>{

    const { oldPassword } = req.body;

    const confirmationOldPassword = bcryptjs.compareSync(oldPassword, req.usuario.password);

    if(!confirmationOldPassword){

        return res.status(400).json({
            msg: `La constraseña ${oldPassword} no concide con la contraseña guardada en la base de datos.`
        });

    }

    next();

}