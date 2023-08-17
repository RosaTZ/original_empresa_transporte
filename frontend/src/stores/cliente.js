import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useClienteStore = defineStore("Cliente", () => {
  let cargando=ref(false)

  const registrarCliente = async (info) => {
    try {
      let datos = await axios.post("https://empresa-transporte.onrender.com/api/cliente", info);
      return datos;
    } catch (error) {
      throw error;
    }
  };
  const buscarCliente= async()=> {
    try {
    cargando.value=true
    const buscar= await axios.get(`https://empresa-transporte.onrender.com/api/cliente`)
    buscar.data.buscar.reverse()
     return buscar.data.buscar
    }catch (error) {
      cargando.value=true
      console.log("error");
      return error.response.data
    }finally{
      console.log("termino");
      cargando.value=false
    }
    }
    const buscarClienteCedula = async (cedula) => {
      try {
        let response = await axios.get(`https://empresa-transporte.onrender.com/api/cliente/cedula/${cedula}`);
        return response.data;
      } catch (error) {
       throw error
      }
    };
  
  const editarCliente = async (id,cedula,nombre, apellidos, telefono) => {
    try {
      const response = await axios.put(`https://empresa-transporte.onrender.com/api/cliente/${id}`, {
        cedula:cedula,
        nombre:nombre,
        apellidos:apellidos,
        telefono:telefono
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const cambiarEstado= async (id,estado)=>{
try {
  let res= await axios.patch(`https://empresa-transporte.onrender.com/api/cliente/${id}`,
  {estado:estado})
  console.log(res.data);
  return res.data
} catch (error) {
  return error.response.data
}
  }

  return {
    registrarCliente,
    buscarCliente,
    buscarClienteCedula,
    editarCliente,
    cambiarEstado,
    cargando
  };
});

