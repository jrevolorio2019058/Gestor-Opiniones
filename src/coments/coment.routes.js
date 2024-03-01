import { Router } from "express";

import { check } from "express-validator";

import{

    comentPost

} from "./coment.controller.js";

import { validarCampos, idExistente } from "../middlewares/validar-campos.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(

    "/:id",
    [
        validarJWT,
        idExistente,
        check("text", "El máximo en el texto es de 200 caracteres").isLength({
            max: 200
        }),
        validarCampos
    ],comentPost
);

export default router;