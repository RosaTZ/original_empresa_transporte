import {defineStore} from "pinia"
import axios from "axios"
import {ref} from "vue"

export const useTicketStore = defineStore("ticket",()=>{
  let cargando=ref(false)

    const registrarTicket = async(info)=>{
        try {
            let datos = await axios.post("http://localhost:4000/api/ticket",info)
            return datos
        } catch (error) {
          throw error;
        }
    }

    const buscarTicket= async () => {
      try {
        cargando.value=true
        const buscar= await axios.get(`http://localhost:4000/api/ticket`)
        console.log(buscar.data.buscar);
        return buscar.data.buscar
      } catch (error) {
        cargando.value=true
        console.log(error);
      }finally{
cargando.value=false
      }
        }

        const buscarTicketRenovar= async(ruta,vehiculo,fecha_venta)=>{
          try {
           let renovarVenta=  await axios.get(`http://localhost:4000/api/ticket/renovar`,{
              params:{
               ruta: ruta,
               vehiculo:vehiculo,
                fecha_venta:fecha_venta
              }
            })
            return renovarVenta.data
          } catch (error) {
            throw error
          }
        }


        const buscarTicketId = async (codigo) => {
          try {
            cargando.value=true
            let response = await axios.get(`http://localhost:4000/api/ticket/codigo/${codigo}`);
            return response.data;
          } catch (error) {
            cargando.value=true
            throw error
          }finally{
            cargando.value=false
          }
        };

        const editarTicket = async (id,fecha_venta,
          fecha_salida,
          hora_salida,
          precio,
          cliente,
          vehiculo,
          ruta,
          numero_puesto) => {
          try {
            const response = await axios.put(`http://localhost:4000/api/ticket/${id}`, {
              fecha_venta:fecha_venta,
              fecha_salida:fecha_salida,
              hora_salida:hora_salida,
              precio:precio,
              cliente:cliente,
              vehiculo:vehiculo,
              ruta:ruta,
              numero_puesto:numero_puesto
            });
            return response.data;
          } catch (error) {
            throw error;
          }
        };
        const cambiarEstado= async (id,estado)=>{
          try {
            let res= await axios.patch(`http://localhost:4000/api/ticket/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }

    return{
      cargando,
        registrarTicket,
        buscarTicket,
        buscarTicketRenovar,
        buscarTicketId,
        editarTicket,
        cambiarEstado
    }
})