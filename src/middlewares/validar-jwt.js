import jwt from 'jsonwebtoken';

import Usuario from '../users/user.model.js';


export const validarJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        
        return res.status(400).json({
            msg: "En la petición no hay token"
        });

    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe en la base de datos'
            })
        }

        if (!usuario.state) {
            return res.status(401).json({
                msg: 'Token no valido | State User: false'
            })
        }

        req.usuario = usuario;

        req.usuarioId = await Usuario.findById(uid);

        next();
        
    } catch (e) {
        console.log(e),
            res.status(401).json({
                msg: "Token no válido"
            });
    }

}