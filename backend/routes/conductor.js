import httpConductor from "../controllers/conductor.js"
import { Router } from "express"
import { check } from "express-validator"
// import {validarJWT} from "../middlewares/validar-jwt.js"
import {validarCampos} from "../middlewares/validar-campos.js"
const router= Router()
  // prueba nuevamente hhhhhhh hhhhhhhh
  router.post("/",[
   check("cedula","La cedula es obligatoria").trim().not().isEmpty(),
   check("cedula","La cedula debe ser mayor a a 7 caracteres  y menor de 10 caracteres").isLength({min:8,max:10}),
   check("nombre","El nombre es obligatorio").trim().not().isEmpty(),
   check("apellidos","Los apellidos son obligatorios").trim().not().isEmpty(),
   check("fecha_nacimiento","Fecha de nacimiento requerida").trim().not().isEmpty(),
   check("direccion","Direccion requerida").trim().not().isEmpty(),
   check("telefono","El telefono es obligatorio").trim().not().isEmpty(),
   check("estado_civil","Estado civil requerido").trim().not().isEmpty(),
   check("licencia","La licencia es obligatoria").trim().not().isEmpty(),
   check("licencia","El número de la licencia de conducción debe ser de 12 digitos").trim().isLength({min:12,max:12}),
   check("categoria_licencia","Categoria de la licencia requerida").trim().not().isEmpty(),
   check("categoria_licencia","Las categorias de licencia estan compuestas por dos digitos").trim().isLength({min:2,max:2}),
   check("fecha_vencimiento","Fecha de vencimiento de la licencia requerida").trim().not().isEmpty(),
   validarCampos
 ] , httpConductor.postConductor)

  router.get("/",httpConductor.getConductor)
  
  router.get("/:cedula",[
    check("cedula","Ingrese la cedula a buscar").trim().not().isEmpty(),
    check("cedula","La cedula debe ser mayor a a 7 caracteres  y menor de 10 caracteres").trim().isLength({min:8,max:10}),
    validarCampos
  ],httpConductor.getConductorCedula)
  
  router.put("/:id",[
    check("cedula","La cedula es obligatoria").trim().not().isEmpty(),
    check("cedula","La cedula debe ser mayor a a 7 caracteres  y menor de 10 caracteres").isLength({min:8,max:10}),
    check("nombre","El nombre es obligatorio").trim().not().isEmpty(),
    check("apellidos","Los apellidos son obligatorios").trim().not().isEmpty(),
    check("fecha_nacimiento","Fecha de nacimiento requerida").trim().not().isEmpty(),
    check("direccion","Direccion requerida").trim().not().isEmpty(),
    check("telefono","El telefono es obligatorio").trim().not().isEmpty(),
    check("estado_civil","Estado civil requerido").trim().not().isEmpty(),
    check("licencia","La licencia es obligatoria").trim().not().isEmpty(),
    check("licencia","El número de la licencia de conducción debe ser de 12 digitos").trim().isLength({min:12,max:12}),
    check("categoria_licencia","Categoria de la licencia requerida").trim().not().isEmpty(),
    check("categoria_licencia","Las categorias de licencia estan compuestas por dos digitos").trim().isLength({min:2,max:2}),
    check("fecha_vencimiento","Fecha de vencimiento de la licencia requerida").trim().not().isEmpty(),
     validarCampos
  ] ,httpConductor.putConductor)

  router.patch("/:id",httpConductor.patchConductor)
  
  router.delete("/:id",httpConductor.deleteConductor)

  export default router