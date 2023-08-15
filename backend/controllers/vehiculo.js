// put ingresar vehiculo
// get listar todos los vehiculo
// get buscar 1 vehiculo
// post actualizar { todo excepto matricula }
import Vehiculo from "../models/vehiculo.js";

const httpVehiculo = {
  postVehiculo: async (req, res) => {
    const {placa, num_vehiculo, propietario,puestos, conductor_id, revision_id,estado } =
      req.body;
    const vehiculo = await Vehiculo({
      placa,
      num_vehiculo,
      propietario,
      puestos,
      conductor_id,
      revision_id,
      estado
    });
    const buscar= await Vehiculo.findOne({placa:placa})
    if(buscar){
      return res.status(400).json({msg:'Ya se encuentra registrado'})
    }else{
      await vehiculo.save();
      res.json({
        mensaje: "1 registro insertado!!",
        vehiculo,
      });
    }
  },
  getVehiculo: async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find()
      .populate("conductor_id","nombre")
      .populate("revision_id","tecnomecanica")
      res.json(vehiculos);
    } catch (error) {
      console.error(error);
     return res.status(500).json({ msg: "Error al obtener los vehículos" });
    }
  },
  getVehiculoId: async (req, res) => {
    const { placa } = req.params;
    try {
      const vehiculo = await Vehiculo.find({ placa: placa })
      if (vehiculo.length===0) {
       return res.status(404).json({ msg: `Sin coincidencias para ${placa}` });
      } else {
        res.status(200).json({ vehiculo });
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  putVehiculo: async (req, res) =>{
    const id= req.params.id;
    const vehiculoActualizado={
      placa:req.body.placa,
      num_vehiculo : req.body.num_vehiculo,
      propietario : req.body.propietario,
      puestos:req.body.puestos,
      conductor_id:req.body.conductor_id,
      revision_id:req.body.revision_id
    }
    try {
      const buscarVehiculo= await Vehiculo.findByIdAndUpdate(id,vehiculoActualizado);
      if(buscarVehiculo){
        res.json(buscarVehiculo)
      }else{
       return res.status(404).json({msg:`El vehiculo con ${id} no se encuentra en la base de datos`})
      }
    } catch (error) {
      res.status(500).json({msg:"error al actualizar el vehiculo",error})
    }
  },
  patchVehiculo: async (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;
    try {
      const vehiculo = await Vehiculo.findById(id);
      if (vehiculo) {
        vehiculo.estado = estado;
        await vehiculo.save();
        res.json(vehiculo);
      } else {
       return res.status(404).json({ msg: `vehiculo con id: ${id} no encontrado` });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  deleteVehiculo: async (req, res) => {
    const { id } = req.params;
    const eliminado = await Vehiculo.findOneAndDelete({ _id: id });
    
    if (eliminado) {
      res.json({ msg: `Se eliminó ${id} de la base de datos` });
    } else {
      res.json({ msg: `${id} no se encuentra en la base de datos` });
    }
  }
};
export default httpVehiculo;