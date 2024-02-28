import { Router } from "express";

import { check } from "express-validator";

import {
    usuariosPost,
    usuarioPut
} from "./user.controller.js";

import {
    existenteEmail
} from "../helpers/db-validator.js";

import { validarCampos } from "../middlewares/validar-campos.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        check("userName", "El nombre de usuario es obligatorio").not().isEmpty(),
        check("password", "La contraseña debe de contener minimo 6 caracteres").isLength({
            min: 6
        }),
        check("email", "El correo no es valido").isEmail(),
        check("email").custom(existenteEmail),
        validarCampos
    ], usuariosPost
);

router.put(
    "/",
    [
        validarJWT,
        validarCampos
    ], usuarioPut
);

export default router;