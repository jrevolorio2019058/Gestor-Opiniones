import bcryptjs from 'bcryptjs';

import Usuario from '../users/user.model.js';

import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    
    const { userName, email, password } = req.body;

    try {

        if(userName == null){

            const usuario = await Usuario.findOne({ email });
        
            if (!usuario) {
                return res.status(400).json({
                msg: "Credenciales incorrectas, No se encontro Correo en la base de datos"

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

        }else if( email == null){

            const usuario = await Usuario.findOne({ userName });
        
            if (!usuario) {
                return res.status(400).json({
                msg: "Credenciales incorrectas, No se encontro Usuario en la base de datos"

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
                    {userName: usuario.userName},
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

        }



    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Error | Comuniquese con soporte!"
        })
    }

}