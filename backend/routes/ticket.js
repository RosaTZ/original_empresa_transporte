import httpTicket from "../controllers/ticket.js"
import { Router } from "express"
// import {validarJWT} from "../middlewares/validar-jwt.js"
import { check } from "express-validator"
import {validarCampos} from "../middlewares/validar-campos.js"

const router = Router()

  router.post("/",[
    check("codigo","campo codigo requerido").trim().not().isEmpty(),
    check("fecha_venta","Fecha de la venta requerida").trim().not().isEmpty(),
    check("fecha_salida","Fecha salida requerida").trim().not().isEmpty(),
    check("numero_puesto","Numero de puesto requerido").trim().not().isEmpty(),
    check("hora_salida","Debe ingresar la hora de salida").trim().not().isEmpty(),
    check("precio","El precio es requerido").trim().not().isEmpty(),
    check("cliente",'No es un ID válido').trim().isMongoId(),
    check("vehiculo",'No es un ID válido').trim().isMongoId(),
    check("ruta",'No es un ID válido').trim().isMongoId(),
    check("empresa",'No es un ID válido').trim().isMongoId(),
    validarCampos
  ], httpTicket.postTicket)

  router.get("/", httpTicket.getTicket)

  router.get("/renovar", httpTicket.getRenovarTicket)
  
  router.get("/codigo/:codigo",[
    check("codigo","Ingrese el codigo del ticket").trim().not().isEmpty(),
    validarCampos
  ], httpTicket.getTicketId)
  
  router.put("/:id",[
    check("codigo","campo codigo requerido").trim().not().isEmpty(),
    check("fecha_venta","Fecha de la venta requerida").trim().not().isEmpty(),
    check("fecha_salida","Fecha salida requerida").trim().not().isEmpty(),
    check("numero_puesto","Numero de puesto requerido").trim().not().isEmpty(),
    check("hora_salida","Debe ingresar la hora de salida").trim().not().isEmpty(),
    check("cliente",'No es un ID válido').trim().isMongoId(),
    check("vehiculo",'No es un ID válido').trim().isMongoId(),
    check("ruta",'No es un ID válido').trim().not().isMongoId(),
    check("empresa",'No es un ID válido').trim().isMongoId(),
    validarCampos
  ], httpTicket.putTicket)

  router.delete("/:id", httpTicket.deleteTicket)
  
  export default router