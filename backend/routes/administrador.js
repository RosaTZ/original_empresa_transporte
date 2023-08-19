import { check } from "express-validator"
import httpAdministrador from "../controllers/administrador.js"
import { Router } from "express"
import {validarCampos} from "../middlewares/validar-campos.js"

const router= Router()

  router.post("/",httpAdministrador.postAdministrador)

  // router.post("/login",httpAdministrador.login)

  router.post("/token",[
    check("email","Ingrese el usuario").trim().not().isEmpty(),
    check("password","Ingrese la contraseña").trim().not().isEmpty(),
    validarCampos
  ],httpAdministrador.postAdministradorToken)
  
  // router.put("/:id",httpAdministrador.putAdministrador)
  

  export default router