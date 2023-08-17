// put ingresar rutas
// get listar todos las rutas
// get buscar 1 ruta
// post actualizar { todo excepto cedula, Licencia }
// delete para eliminar una ruta
import Ruta from "../models/rutas.js";

const httpRutas = {
  postRutas: async (req, res) => {
    const { codigo, origen, destino, hora_salida ,estado } = req.body;
    const ruta = await Ruta({ codigo, origen, destino, hora_salida ,estado });
    const buscar= await Ruta.findOne({codigo:codigo})
    if(buscar){
      return res.status(400).json({msg:'Ya se encuentra registrado'})
    }else{
      await ruta.save();
      res.json({
        mensaje: "1 registro insertado!!",
        ruta,
      });
    }
  },
  getRutas: async (req, res) => {
    const buscar = await Ruta.find();
    res.json({ buscar });
  },
  getRutasId: async (req, res) => {
    const { codigo } = req.params;
    try {
      const ruta = await Ruta.find({ codigo: codigo });
    if (ruta.length===0) {
      return res.status(404).json({ msg: `Sin coincidencias para ${codigo}`});
    } else {
      res.status(200).json({ ruta });
    }
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  putRutas: async (req, res) => {
    const id = req.params.id;
    const rutaActualizada = {
      codigo:req.body.codigo,
      origen: req.body.origen,
      destino: req.body.destino,
    };
    try {
      const buscarRuta= await Ruta.findByIdAndUpdate(id, rutaActualizada);
      if(buscarRuta){
        res.json(buscarRuta)
      }else{
        res.status(404).json({msg:`La ruta con id ${id} no se encuentra en la base de datos`})
      }
    } catch (error) {
     return res.status(500).json({msg:"Error al actualizar la ruta",error})
    }
  },
  patchRuta: async (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;
    try {
      const ruta = await Ruta.findById(id);
      if (ruta) {
        ruta.estado = estado;
        await ruta.save();
        res.json(ruta);
      } else {
      return  res.status(404).json({ msg: `ruta con id: ${id} no encontrado` });
      }
    } catch (error) {
     return res.status(500).json({ msg: "Error interno del servidor" });
    }
  },
  deleteRuta: async (req, res) => {
    const { id } = req.params;
    const eliminado = await Ruta.findOneAndDelete({ _id: id });

    if (eliminado) {
     return res.status(200).json({ msg: `Se eliminó ${id} de la base de datos` });
    } else {
    return  res.status(404).json({ msg: `${id} no se encuentra en la base de datos` });
    }
  },
};

export default httpRutas;