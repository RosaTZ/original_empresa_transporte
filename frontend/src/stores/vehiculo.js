import {defineStore} from "pinia"
import axios from "axios"
import {ref} from "vue"

export const useVehiculoStore = defineStore("vehiculo",()=>{
let cargando=ref(false)
    const registrarVehiculo = async(info)=>{
        try {
            const datos = await axios.post("https://empresa-transporte.onrender.com/api/vehiculo",info)
            return datos
        } catch (error) {
          throw error;
        }
    }

    const buscarVehiculo= async () => {
      try {
        cargando.value=true
        const buscar= await axios.get(`https://empresa-transporte.onrender.com/api/vehiculo`)
        return buscar.data
      } catch (error) {
        cargando.value=true
        console.log(error);
      }finally{
        cargando.value=false
      }
        }
        
        const buscarVehiculoId = async (placa) => {
          try {
            let response = await axios.get(`https://empresa-transporte.onrender.com/api/vehiculo/${placa}`);
            return response.data;
          } catch (error) {
            throw error
          }
        };

        const editarVehiculo = async (id,
          placa,
          num_vehiculo,
          propietario,
          puestos,
          conductor_id,
          revision_id  ) => {
          try {
            const response = await axios.put(`https://empresa-transporte.onrender.com/api/vehiculo/${id}`, {
              placa:placa,
              num_vehiculo:num_vehiculo,
              propietario:propietario,
              puestos:puestos,
              conductor_id:conductor_id,
              revision_id:revision_id
            });
            return response;
          } catch (error) {
            throw error;
          }
        };

        const cambiarEstado= async (id,estado)=>{
          try {
            let res= await axios.patch(`https://empresa-transporte.onrender.com/api/vehiculo/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }

    return{
      cargando,
        registrarVehiculo,
        buscarVehiculo,
        buscarVehiculoId,
        editarVehiculo,
        cambiarEstado
    }
})