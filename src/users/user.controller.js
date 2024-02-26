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