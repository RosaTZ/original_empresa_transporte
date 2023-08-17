import {defineStore} from "pinia"
import axios from "axios"
import {ref} from "vue"

export const useRutaStore = defineStore("ruta",()=>{
let cargando=ref(false)
    const registrarRuta = async(info)=>{
        try {
            let datos = await axios.post("https://empresa-transporte.onrender.com/api/ruta",info)
            return datos
        } catch (error) {
          throw error;
        }
    }

    const buscarRuta=async()=> {
      try {
cargando.value=true
        const buscar= await axios.get(`https://empresa-transporte.onrender.com/api/ruta`)
         console.log(buscar.data.buscar);
         buscar.data.buscar.reverse()
         return buscar.data.buscar
      } catch (error) {
        cargando.value=true
        console.log(error);
      }finally{
        cargando.value=false
      }
        }
        
        const buscarRutaId = async (codigo) => {
          try {
            let response = await axios.get(`https://empresa-transporte.onrender.com/api/ruta/${codigo}`, {
              params: { codigo:codigo },
            });
            return response.data;
          } catch (error) {
            throw error
          }
        };
        const editarRuta = async (id,codigo, origen, destino, hora_salida) => {
          try {
            const response = await axios.put(`https://empresa-transporte.onrender.com/api/ruta/${id}`, {
              codigo:codigo,
              origen:origen,
              destino:destino,
              hora_salida
            });
            return response.data;
          } catch (error) {
            throw error;
          }
        };

        const cambiarEstado= async (id,estado)=>{
          try {
            let res= await axios.patch(`https://empresa-transporte.onrender.com/api/ruta/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }
    return{
      cargando,
        registrarRuta,
        buscarRuta,
        buscarRutaId,
        editarRuta,
        cambiarEstado
    }
})