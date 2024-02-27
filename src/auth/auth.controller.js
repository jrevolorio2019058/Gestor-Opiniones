import bcryptjs from 'bcryptjs';

import Usuario from '../users/user.model.js';

import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    
    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        
        if (!usuario) {
            return res.status(400).json({
            msg: "Credenciales incorrectas, No se encontro Correo o Nombre de usuario en la Base de datos"

        });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        if (usuario && validPassword) {

            await Usuario.findOneAndUpdate(
                {email: usuario.email},
                {$set: {state: true}},
                {new: true},
                console.log(req.body)
            );
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({

            msg: 'Logeado Correctamente',
            usuario,
            token

        });



    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Error | Comuniquese con soporte!"
        })
    }

}