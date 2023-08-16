import httpVehiculo from "../controllers/vehiculo.js"
import { Router } from "express"
import { check } from "express-validator"
// import {validarJWT} from "../middlewares/validar-jwt.js"
import {validarCampos} from "../middlewares/validar-campos.js"

const router= Router()
  
  router.post("/",[
    check("placa","Completar Placa").trim().not().isEmpty(),
    check("placa","La placa debe tener 7 digitos").trim().isLength({min:7,max:7}),
    check("num_vehiculo","Falta el numero del vehiculo").trim().not().isEmpty(),
    check("num_vehiculo","El número del vehiculo debe tener minimo 3 digitos y maximo 4 digitos").trim().isLength({min:3,max:4}),
    check("propietario","Ingrese el propietario del vehiculo").trim().not().isEmpty(),
    check('estado',"Campo requerido").trim().not().isEmpty(),
    check("conductor_id",'No es un ID válido').trim().isMongoId(),
    check("revision_id",'No es un ID válido').trim().isMongoId(),
    validarCampos
  ], httpVehiculo.postVehiculo)

  router.get("/", httpVehiculo.getVehiculo)
  
  router.get("/:placa",[
    check("placa","Ingrese el número de placa").trim().not().isEmpty(),
    check("placa","La placa debe tener 7 digitos").trim().isLength({min:7,max:7}),
    validarCampos
  ] ,httpVehiculo.getVehiculoId)
  
  router.put("/:id",[
    check("placa","Completar placa").trim().not().isEmpty(),
    check("placa","La placa debe tener 7 digitos").trim().isLength({min:7,max:7}),
    check("num_vehiculo","Falta el numero del vehiculo").trim().not().isEmpty(),
    check("num_vehiculo","El número del vehiculo debe tener minimo 3 digitos y maximo 4 digitos").trim().isLength({min:3,max:4}),
    check("propietario","Ingrese el propietario del vehiculo").trim().not().isEmpty(),
    check('estado',"Campo requerido").trim().not().isEmpty(),
    check("conductor_id",'No es un ID válido').trim().isMongoId(),
    check("revision_id",'No es un ID válido').trim().isMongoId(),
    validarCampos
  ], httpVehiculo.putVehiculo)

  router.patch("/:id",httpVehiculo.patchVehiculo)

  router.delete("/:id", httpVehiculo.deleteVehiculo)
  
  export default router