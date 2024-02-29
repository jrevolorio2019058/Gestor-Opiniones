import { validationResult } from "express-validator";

import bcryptjs from 'bcryptjs';

import Publication from "../publications/publication.model.js";

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

export const ownPublication = (req, res, next) =>{

    const { id } = req.params;

    const usuarioId = req.usuario._id;

    const validationId = Publication.findOne({ _id: id });

    const objetoConDatos = validationId.idCreador;

    const validationPublication = Publication.findOne({ objetoConDatos: usuarioId });
    
    console.log(objetoConDatos);

    if(!validationPublication){

        return res.status(422).json({
            msg: `${req.usuario.userName} no puede modificar la publicación de otro.`
        });

    }

    next();

}