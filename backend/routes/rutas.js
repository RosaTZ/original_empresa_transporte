import { check } from "express-validator"
import httpRutas from "../controllers/rutas.js"
import { Router } from "express"
// import {validarJWT} from "../middlewares/validar-jwt.js"
import {validarCampos} from "../middlewares/validar-campos.js"

const router= Router()
  
  router.post("/",[
    check("codigo","Campo codigo requerido").trim().not().isEmpty(),
    check("codigo","El codigo debe estar entre 2 y 5 digitos").trim().isLength({min:2,max:5}),
    check("origen","Complete el campo origen").trim().not().isEmpty(),
    check("destino","Complete el campo destino").trim().not().isEmpty(),
    check("hora_salida","Debe ingresar la hora de salida").trim().not().isEmpty(),
    validarCampos
  ], httpRutas.postRutas)

  router.get("/",httpRutas.getRutas)
  
  router.get("/:codigo",[
    check("codigo","Ingrese el codigo de la ruta").trim().not().isEmpty(),
    check("codigo","El codigo debe estar entre 2 y 5 digitos").isLength({min:2,max:5}),
    validarCampos
  ],httpRutas.getRutasId)
  
  router.put("/:id",[
    check("codigo","Campo codigo requerido").trim().not().isEmpty(),
    check("codigo","El codigo debe estar entre 2 y 5 digitos").trim().isLength({min:2,max:5}),
    check("origen","Complete el campo origen").trim().not().isEmpty(),
    check("destino","Complete el campo destino").trim().not().isEmpty(),
    check("hora_salida","Debe ingresar la hora de salida").trim().not().isEmpty(),
    validarCampos
  ],httpRutas.putRutas)

  router.patch("/:id",httpRutas.patchRuta)

  router.delete("/:id",httpRutas.deleteRuta)
  
  export default router