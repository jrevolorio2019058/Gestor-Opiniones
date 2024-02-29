import { Router } from "express";

import { check } from "express-validator";

import {
    
    publicacionPost,
    publicacionPut

} from "./publication.controller.js";

import { validarCampos} from "../middlewares/validar-campos.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(

    "/",
    [
        validarJWT,
        check("tittle", "Es necesario un titulo").not().isEmpty(),
        check("category", "Es necesario una categoria").not().isEmpty(),
        check("mainText", "El máximo en el texto es de 200 caracteres").isLength({
            max: 200
        }),
        validarCampos
    ], publicacionPost

);

router.put(

    "/:id",
    [
        validarJWT,
        validarCampos
    ], publicacionPut

);

export default router;