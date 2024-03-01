import { Router } from "express";

import { check } from "express-validator";

import {
    comentDelete,
    comentGet,
    comentPost,
    comentPut
} from "./coment.controller.js";

import { idExistente, ownComent, validarCampos } from "../middlewares/validar-campos.js";

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

router.get("/", comentGet);

router.put(

    "/:id",
    [
        validarJWT,
        ownComent,
        validarCampos
    ], comentPut

);

router.delete(

    "/:id",
    [
        validarJWT,
        ownComent,
        validarCampos
    ], comentDelete

);

export default router;