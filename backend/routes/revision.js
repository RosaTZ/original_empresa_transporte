import { check } from "express-validator"
import httpRevision from "../controllers/revision.js"
import { Router } from "express"
// import {validarJWT} from "../middlewares/validar-jwt.js"
import {validarCampos} from "../middlewares/validar-campos.js"

const router= Router()
  
  router.post("/", [
    check("tecnomecanica","Tecnomecanica requerida").trim().not().isEmpty(),
    check("fecha_revision","Fecha de la ultima revisión requerida").trim().not().isEmpty(),
    check("fecha_proxima_revision","Fecha de la proxima revision requerida").trim().not().isEmpty(),
    check("descripcion","Complete la descripción").trim().default(),validarCampos
  ],httpRevision.postRevisiones)

  router.get("/",httpRevision.getRevisiones)
  
  router.get("/:tecnomecanica",[
    check("tecnomecanica","Ingrese la tecnomecanica").trim().not().isEmpty(),
    validarCampos
  ],httpRevision.getRevisionesId)
  
  router.put("/:id", [
    check("tecnomecanica","Tecnomecanica requerida").trim().not().isEmpty(),
    check("fecha_revision","Fecha de la ultima revisión requerida").trim().not().isEmpty(),
    check("fecha_proxima_revision","Fecha de la proxima revision requerida").trim().not().isEmpty(),
    check("descripcion","Complete la descripción").trim().default(),validarCampos
  ],httpRevision.putRevisiones)

  router.delete("/:id", httpRevision.deleteRevision)
  
  export default router