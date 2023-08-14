import {defineStore} from "pinia"
import axios from "axios"

export const useRutaStore = defineStore("ruta",()=>{

    const registrarRuta = async(info)=>{
        try {
            let datos = await axios.post("http://localhost:4000/api/ruta",info)
            return datos
        } catch (error) {
          throw error;
        }
    }

    const buscarRuta=async()=> {
      try {
        const buscar= await axios.get(`http://localhost:4000/api/ruta`)
         console.log(buscar.data.buscar);
         buscar.data.buscar.reverse()
         return buscar.data.buscar
      } catch (error) {
        console.log(error);
      }
        }
        
        const buscarRutaId = async (codigo) => {
          try {
            let response = await axios.get(`http://localhost:4000/api/ruta/${codigo}`, {
              params: { codigo:codigo },
            });
            return response.data;
          } catch (error) {
            throw error
          }
        };
        const editarRuta = async (id,codigo, origen, destino) => {
          try {
            const response = await axios.put(`http://localhost:4000/api/ruta/${id}`, {
              codigo:codigo,
              origen:origen,
              destino:destino,
            });
            return response.data;
          } catch (error) {
            throw error;
          }
        };

        const cambiarEstado= async (id,estado)=>{
          try {
            let res= await axios.patch(`http://localhost:4000/api/ruta/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }
    return{
        registrarRuta,
        buscarRuta,
        buscarRutaId,
        editarRuta,
        cambiarEstado
    }
})