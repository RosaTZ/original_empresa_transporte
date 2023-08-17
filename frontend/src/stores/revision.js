import {defineStore} from "pinia"
import axios from "axios"
import {ref} from "vue"

export const useRevisionStore = defineStore("revision",()=>{
    let cargando=ref(false)

    const registrarRevision = async(info)=>{
        try {
            let datos = await axios.post("https://empresa-transporte.onrender.com/api/revision",info)
            return datos
        } catch (error) {
          throw error;
        }
    }

    const buscarRevision= async()=> {
      try {
        cargando.value=true
        const buscar= await axios.get(`https://empresa-transporte.onrender.com/api/revision`)
        console.log(buscar.data.buscar);
        return buscar.data.buscar
      } catch (error) {
        cargando.value=true
        console.log(error);
      }finally{
        cargando.value=false
      }
        }
        
        const buscarRevisionId = async (tecnomecanica) => {
          try {
            let response = await axios.get(`https://empresa-transporte.onrender.com/api/revision/${tecnomecanica}`, {
              params: { tecnomecanica:tecnomecanica }
            });
            return response.data.revision;
          } catch (error) {
            throw error
          }
        };

        const editarRevision = async (id, tecnomecanica,fecha_revision, fecha_proxima_revision,descripcion) => {
          try {
            const response = await axios.put(`https://empresa-transporte.onrender.com/api/revision/${id}`, {
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
            let res= await axios.patch(`https://empresa-transporte.onrender.com/api/revision/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }

    return{
      cargando,
        registrarRevision,
        buscarRevision,
        buscarRevisionId,
        editarRevision,
        cambiarEstado
    }
})