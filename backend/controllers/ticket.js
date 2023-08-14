// put ingresar tikete
// get listar todos los tiketes
// get buscar 1 tikete
import Ticket from "../models/ticket.js"
import Ruta from "../models/rutas.js"
import Vehiculo from "../models/vehiculo.js"

const httpTicket = {
    postTicket: async(req, res) => {
      const { codigo, fecha_venta,fecha_salida,hora_salida,precio,cliente,vehiculo,ruta,empresa,numero_puesto} = req.body
      const ticket = await Ticket({ codigo, fecha_venta,fecha_salida,hora_salida,precio,cliente,vehiculo,ruta,empresa,numero_puesto })
      await ticket.save()
      res.status(200).json({
        msg: "1 registro insertado!!",
        ticket
      })
    },
    getTicket:async (req, res) => {
      try {
        const buscar= await Ticket.find()
      .populate("cliente")
      .populate("vehiculo")
      .populate("ruta")
      .populate("empresa")
      res.status(200).json({buscar})
      console.log(buscar);
      } catch (error) {
        console.log(error);
       return res.status(500).json({ msg: "Error al obtener los tickets" });
      }
    },

    getRenovarTicket: async (req, res)=>{
     try {
      const {ruta,vehiculo,fecha_venta}= req.query;
      if(!ruta||!vehiculo||!fecha_venta){
        return res.status(400).json({msg:'Faltan parametros'})
      }
      const idRuta= await Ruta.findOne({_id:ruta});
      const idVehiculo= await Vehiculo.findOne({_id:vehiculo})
      if(!idRuta||!idVehiculo){
        return res.status(404).json({msg:"Ruta o vehiculo no encontrado"}) 
      }
      const ticket= await Ticket.find({
        ruta:idRuta._id,
        vehiculo:idVehiculo._id,
        fecha_venta:fecha_venta
      }).populate("ruta")
      .populate("vehiculo")
      .populate("cliente")
       if(ticket.length===0){
       return res.status(404).json({msg:'Ruta o vehiculo sin coincidencias'})
       }
      const puestos=ticket.map(t=>t.numero_puesto)
      return res.json({ticket,puestos})
     } catch (error) {
      res.status(500).json({msg:'Error en el servidor'})
     }
    },


    getTicketId:async (req, res) => {
      const  {codigo}  = req.params
      const ticket = await Ticket.find({ codigo: codigo })
      .populate('cliente')
      .populate('vehiculo')
      .populate('ruta')
      .populate('empresa')
      if(ticket.length===0){
       return res.status(404).json({msg:`No se encontraron coincidencias para ${codigo}`})
      }else{
        console.log(ticket);
      res.status(200).json({ ticket })
      }
    },
    putTicket: async (req,res)=>{
     const id= req.params.id;
     const ticketActualizado={
      fecha_venta:req.body.fecha_venta,
      fecha_salida : req.body.fecha_salida,
      hora_salida: req.body.hora_salida,
      precio: req.body.precio,
      cliente: req.body.cliente,
      vehiculo: req.body.vehiculo,
      ruta:req.body.ruta,
      numero_puesto: req.body.numero_puesto
     }
     try {
      const buscarTicket= await Ticket.findByIdAndUpdate(id,ticketActualizado);
      if(buscarTicket){
        res.json(buscarTicket)
      }else{
       return res.json({msg:`El ticket con id ${id} no se encuentra en la base de datos`})
      }
     } catch (error) {
     return res.json({msg:"error al actualizar ticket", error})
     }
    },
      deleteTicket: async (req, res) => {
        const { id } = req.params;
        const eliminado = await Ticket.findOneAndDelete({ _id: id });
        
        if (eliminado) {
          res.json({ mensaje: `Se eliminó ${id} de la base de datos` });
        } else {
          res.json({ mensaje: `${id} no se encuentra en la base de datos` });
        }
      }
    }
  export default httpTicket;