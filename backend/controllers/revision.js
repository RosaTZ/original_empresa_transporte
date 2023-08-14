// put ingresar estado vehiculo
// get buscar la matricula y acceder al estado 
// post actualizar { todo }
import Revision from '../models/revision.js'

const httpRevisiones = {
    postRevisiones:async (req, res) => {
      const { tecnomecanica,fecha_revision,fecha_proxima_revision,descripcion,estado} = req.body
      const revision =await Revision({ tecnomecanica,fecha_revision,fecha_proxima_revision,descripcion,estado })
      await revision.save()
      res.json({
        revision
      })
    },
    getRevisiones:async (req, res) => {
      const buscar= await Revision.find()
  res.status(200).json({buscar})
    },
    getRevisionesId:async (req, res) => {
      const  {tecnomecanica}  = req.params
      try {
        const revision = await Revision.find({ tecnomecanica: tecnomecanica })
      if(revision.length===0){
       return res.status(404).json({msg:`Sin coincidencias para ${tecnomecanica}`})
      }else{
        res.status(200).json({ revision })
      }
      } catch (error) {
        return res.status(500).json(error)
      }
    },
    putRevisiones: async (req,res) =>{
      const id = req.params.id
      const revisionActualizada={
        tecnomecanica : req.body.tecnomecanica,
        fecha_revision:req.body.fecha_revision,
        fecha_proxima_revision : req.body.fecha_proxima_revision,
        descripcion:req.body.descripcion
      }
      try {
        const buscarRevision= await Revision.findByIdAndUpdate(id, revisionActualizada);
        if(buscarRevision){
          res.json(buscarRevision)
        }else{
          res.json({"mensaje":`La revisión con id ${id} no se encuentra en la base de datos`})
        }
      } catch (error) {
        res.json({"mensaje":"error al actualizar la revisión",error})
      }
    },
      deleteRevision: async (req, res) => {
        const { id } = req.params;
        const eliminado = await Revision.findOneAndDelete({ _id: id });
        
        if (eliminado) {
          res.json({ mensaje: `Se eliminó ${id} de la base de datos` });
        } else {
          res.json({ mensaje: `${id} no se encuentra en la base de datos` });
        }
      }
}
  export default httpRevisiones;