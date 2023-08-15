// put ingresar usuarios
// get listar todos los usuarios
// get buscar 1 usuario
// post actualizar usuario

import Cliente from "../models/cliente.js"

const httpCliente = {
    postCliente:async (req, res) => {
      const { cedula,nombre,apellidos,telefono,estado } = req.body
      const cliente = await Cliente({ cedula,nombre,apellidos,telefono,estado })
      const buscar= await Cliente.findOne({cedula:cedula})
      if(buscar){
       return res.status(400).json({msg:'El número de cedula ya se encuentra registrado'})
      }else{
        await cliente.save()
        res.json({msg:'Registro exitoso',cliente})
      }
    },
    getCliente:async(req,res)=>{
const buscar= await Cliente.find()
res.json({buscar})
    },
    getClienteCedula:async (req, res) => {
      const  {cedula}  = req.params
      try {
        const cliente = await Cliente.find({ cedula: cedula })
        if(cliente.length===0){
         return res.status(404).json({msg:`Sin coincidencias para ${cedula}`})
        }else{
          console.log(cliente);
          res.json({ cliente })
        }
      }catch (error) {
        console.log(error);
       return res.json(error)
      }
    },
      
   putCliente: async(req, res)=>{
    const id =req.params.id;
    const clienteActualizado={
      cedula:req.body.cedula,
      nombre:req.body.nombre,
      apellidos:req.body.apellidos,
      telefono : req.body.telefono
    }
    try {
      const buscarCliente= await Cliente.findByIdAndUpdate(id,clienteActualizado)
      if(buscarCliente){
        res.json(buscarCliente)
      }else{
       return res.status(404).json({msg : `El cliente con ${id} no se encuentra en la base de datos`})
      }
    } catch (error) {
      console.log(error);
     return res.json({msg:"hubo un error al actualizar el cliente"})
    }
   },
   patchCliente: async (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;
    try {
      const cliente = await Cliente.findById(id);
      if (cliente) {
        cliente.estado = estado;
        await cliente.save();
        res.json(cliente);
      } else {
        console.log(`id: ${id} no encontrado`);
        res.status(404).json({ mensaje: `Cliente con id: ${id} no encontrado` });
      }
    } catch (error) {
      console.log(`Error al actualizar el cliente: ${error}`);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
    deleteCliente: async (req, res) => {
      const { id } = req.params;
      const clienteEliminado = await Cliente.findOneAndDelete({ _id: id });
      
      if (clienteEliminado) {
        res.json({ mensaje: `Se eliminó el Cliente: ${id} de la base de datos` });
      } else {
        res.json({ mensaje: `El Cliente: ${id} no se encuentra en la base de datos` });
      }
    },
    existeHolderById: async (id, req) => {
      const existe = await Holder.findById(id)
    
      if (!existe) {
          throw new Error(`El id no existe ${id}`)
      }
      req.req.holderUpdate = existe
    },
    }

   
  export default httpCliente;