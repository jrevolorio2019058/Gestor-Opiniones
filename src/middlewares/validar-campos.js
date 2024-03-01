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

export const ownPublication = async (req, res, next) =>{

    const { id } = req.params;

    const usuarioId = req.usuario._id;

    const validationId = await Publication.findById(id);

    if(!validationId){

        return res.status(404).json({
            msg: `La publicación con el id: ${id} no se a encontrado`
        })

    }



    if(validationId.idCreador != usuarioId){

        return res.status(422).json({
            msg: `${req.usuario.userName} no puedes Modificar/Eliminar la publicación de otro.`
        });

    }

    next();

}