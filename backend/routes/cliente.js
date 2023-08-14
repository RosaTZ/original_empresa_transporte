import { check } from "express-validator"
import httpCliente from "../controllers/cliente.js"
import { Router } from "express"
// import {validarJWT} from "../middlewares/validar-jwt.js"
import {validarCampos} from "../middlewares/validar-campos.js"

const router= Router()

  router.post("/",[
    check("cedula","Falta la cedula").trim().not().isEmpty(),
    check("cedula","La cedula debe ser mayor a 7 caracteres y menor de 10 caracteres").trim().isLength({min:8,max:10}),
    check("nombre","Nombre requerido").trim().not().isEmpty(),
    check("apellidos","Apellido requerido").trim().not().isEmpty(),
    check("telefono","Telefono requerido").trim().not().isEmpty(),
    check("telefono","El número de telefono debe tener entre 7 y 12 caracteres").trim().isLength({min:7,max:12}),
    validarCampos
  ] ,httpCliente.postCliente)

  router.get("/",httpCliente.getCliente)
  
  router.get("/cedula/:cedula",[
    check("cedula","Ingrese la cedula a buscar").trim().not().isEmpty().trim(),
    check("cedula","La cedula debe ser mayor a 7 caracteres y menor de 10 caracteres").trim().isLength({min:8,max:10}),
    validarCampos
  ],httpCliente.getClienteCedula)
  
  router.put("/:id",[
    check("cedula","Falta la cedula").trim().not().isEmpty(),
    check("cedula","La cedula debe ser mayor a 7 caracteres y menor de 10 caracteres").trim().isLength({min:8,max:10}),
    check("nombre","Nombre requerido").trim().not().isEmpty(),
    check("apellidos","Apellido requerido").trim().not().isEmpty(),
    check("telefono","Telefono requerido").trim().not().isEmpty(),
    check("telefono","El número de telefono debe tener entre 7 y 12 caracteres").trim().isLength({min:7,max:12}),
    validarCampos
  ] ,httpCliente.putCliente)

  router.patch("/:id",httpCliente.patchCliente)
  
  router.delete("/:id",httpCliente.deleteCliente)

  export default router