import { Router } from "express";

import { check } from "express-validator";

import { login } from "./auth.controller.js";

import { validarCampos, userNameANDEmailEmpty, userNameANDEmailIsBoth} from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    '/login',
    [
        check('password', 'El password es obligatorio').not().isEmpty(),
        userNameANDEmailEmpty,
        userNameANDEmailIsBoth,
        validarCampos,
    ], login
)

export default router;