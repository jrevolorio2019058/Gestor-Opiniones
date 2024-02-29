import bcryptjs from 'bcryptjs';

import User from './user.model.js';


export const usuariosPost = async (req, res) => {

    const { userName, email, password } = req.body;

    const usuario = new User({
        userName, email, password
    });

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });

}

export const usuarioPut = async (req, res) => {

    const id_Usuario = req.usuarioId._id;

    const {_id, email, img, state, ...resto} = req.body;

    await User.findByIdAndUpdate(id_Usuario, resto);

    const usuario = await User.findOne({_id: id_Usuario});

    const {password} = req.body;

    if(password == null){

    }else{

        const salt = bcryptjs.genSaltSync();

        usuario.password = bcryptjs.hashSync(password, salt);

    }

    await usuario.save();

    res.status(200).json({
        msg: `${usuario.userName} tus datos fueron actualizados`
    })

}

export const usuarioDelete = async (req, res) => {

    const usuarioAutenticado = req.usuario;

    res.status(401).json({
        msg: `${usuarioAutenticado.userName} no puedes eliminar tu perfil`
    })

}