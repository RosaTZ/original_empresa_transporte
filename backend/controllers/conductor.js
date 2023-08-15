// put ingresar conductore
// get listar todos los conductores
// get buscar 1 conductor
// post actualizar { todo excepto cedula, Licencia }
import Conductor from "../models/conductor.js"

const httpConductor = {
    postConductor: async (req, res) => {
      const { cedula,nombre, apellidos, telefono, licencia,categoria_licencia,fecha_vencimiento, 
        fecha_nacimiento, direccion, estado_civil,estado} = req.body
      const conductor = await Conductor({  cedula,nombre, apellidos, telefono, licencia,categoria_licencia,fecha_vencimiento, 
        fecha_nacimiento, direccion, estado_civil,estado})
        const buscar= await Conductor.findOne({cedula:cedula})
        if(buscar){
          return res.status(400).json({msg:'El número de cedula ya se encuentra registrado'})
        }else{
          await conductor.save()
          res.json({
            msg: "1 registro insertado!!",
            conductor
          })
        }
    },
    getConductor:async (req, res) => {
      const buscar= await Conductor.find()
      res.status(200).json({buscar})
    },
    getConductorCedula:async (req, res) => {
      const  {cedula}  = req.params
      try {
        const conductor = await Conductor.find({ cedula: cedula })
      if(conductor.length===0){
        return res.status(404).json({msg:`Sin coincidencias para ${cedula}`})
      }else{
        res.status(200).json({ conductor })
      }
      } catch (error) {
        res.json(error)
      }
    },
    putConductor: async (req,res)=>{
const id=req.params.id;
const conductorActualizado={
  cedula: req.body.cedula,
  nombre: req.body.nombre,
  apellidos:req.body.apellidos,
  telefono : req.body.telefono,
  licencia : req.body.licencia,
  categoria_licencia: req.body.categoria_licencia,
  fecha_vencimiento: req.body.fecha_vencimiento,
  fecha_nacimiento:req.body.fecha_nacimiento,
  direccion : req.body.direccion,
  estado_civil : req.body.estado_civil,
}
try {
  const buscarConductor= await Conductor.findByIdAndUpdate(id,conductorActualizado);
if(buscarConductor){
  res.json(buscarConductor)
}else{
 return res.status(404).json({msg:`No se encontraron coincidencias`})
}
} catch (error) {
 return res.status(500).json({msg:"Error al actualizar cliente", error})
}
    },
    patchConductor: async (req, res) => {
      const id = req.params.id;
      const { estado } = req.body;
      try {
        const conductor = await Conductor.findById(id);
        if (conductor) {
          conductor.estado = estado;
          await conductor.save();
          res.json(conductor);
        } else {
          console.log(`id: ${id} no encontrado`);
          res.status(404).json({ mensaje: `conductor con id: ${id} no encontrado` });
        }
      } catch (error) {
        console.log(`Error al actualizar el conductor: ${error}`);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    },
      deleteConductor: async (req, res) => {
        const { id } = req.params;
        const eliminado = await Conductor.findOneAndDelete({ _id: id });
        
        if (eliminado) {
          res.json({ mensaje: `Se eliminó ${id} de la base de datos` });
        } else {
          res.json({ mensaje: `${id} no se encuentra en la base de datos` });
        }
      }
}
  export default httpConductor;