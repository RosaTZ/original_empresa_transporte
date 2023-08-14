import {defineStore} from "pinia"
import axios from "axios"

export const useRevisionStore = defineStore("revision",()=>{
    let data= ""

    const registrarRevision = async(info)=>{
        try {
            let datos = await axios.post("http://localhost:4000/api/revision",info)
            return datos
        } catch (error) {
          throw error;
        }
    }

    const buscarRevision= async()=> {
      try {
        const buscar= await axios.get(`http://localhost:4000/api/revision`)
        console.log(buscar.data.buscar);
        return buscar.data.buscar
      } catch (error) {
        console.log(error);
      }
        }
        
        const buscarRevisionId = async (tecnomecanica) => {
          try {
            let response = await axios.get(`http://localhost:4000/api/revision/${tecnomecanica}`, {
              params: { tecnomecanica:tecnomecanica }
            });
            return response.data.revision;
          } catch (error) {
            throw error
          }
        };

        const editarRevision = async (id, tecnomecanica,fecha_revision, fecha_proxima_revision,descripcion) => {
          try {
            const response = await axios.put(`http://localhost:4000/api/revision/${id}`, {
              tecnomecanica:tecnomecanica,
              fecha_revision:fecha_revision,
              fecha_proxima_revision:fecha_proxima_revision,
              descripcion:descripcion
            });
            return response.data;
          } catch (error) {
            throw error;
          }
        };
        const cambiarEstado= async (id,estado)=>{
          try {
            let res= await axios.patch(`http://localhost:4000/api/revision/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }

    return{
        registrarRevision,
        buscarRevision,
        buscarRevisionId,
        editarRevision,
        cambiarEstado
    }
})