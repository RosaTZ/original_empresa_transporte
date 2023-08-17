import { defineStore } from "pinia";
import axios from "axios";
import {ref} from "vue"

export const useConductorStore = defineStore("conductor", () => {
  let cargando=ref(false)
  const registrarConductor = async (info) => {
    try {
      cargando.value=true
      let datos = await axios.post("https://empresa-transporte.onrender.com/api/conductor", info);
      return datos;
    } catch (error) {
      cargando.value=false
      throw error;
    }finally{
      cargando.value=false
    }
  };
  const buscarConductor = async () => {
    try {
      cargando.value=true
      const buscar = await axios.get(`https://empresa-transporte.onrender.com/api/conductor`);
      buscar.data.buscar.reverse()
      return buscar.data.buscar;
    } catch (error) {
      cargando.value=false
      console.log(error);
    }finally{
      cargando.value=false
    }
  };

  const buscarConductorCedula = async (cedula) => {
    try {
      cargando.value=true
      let response = await axios.get(
        `https://empresa-transporte.onrender.com/api/conductor/${cedula}`);
      return response.data;
    } catch (error) {
      cargando.value=false
      throw error
    }finally{
      cargando.value=false
    }
  };
  const editarConductor = async (
    id,
    cedula,
    nombre,
    apellidos,
    telefono,
    licencia,
    categoria_licencia,
    fecha_vencimiento,
    fecha_nacimiento,
    direccion,
    estado_civil
  ) => {
    try {
      cargando.value=true
      const response = await axios.put(
        `https://empresa-transporte.onrender.com/api/conductor/${id}`,
        {
          cedula:cedula,
          nombre:nombre,
          apellidos:apellidos,
          telefono: telefono,
          licencia: licencia,
          categoria_licencia: categoria_licencia,
          fecha_vencimiento:fecha_vencimiento,
          fecha_nacimiento:fecha_nacimiento,
          direccion: direccion,
          estado_civil: estado_civil
        }
      );
      return response.data;
    } catch (error) {
      cargando.value=false
      throw error;
    }finally{
      cargando.value=false
    }
  };
  const cambiarEstado = async (id, estado) => {
    try {
      let res = await axios.patch(`https://empresa-transporte.onrender.com/api/conductor/${id}`, {
        estado: estado,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    cargando,
    registrarConductor,
    buscarConductor,
    buscarConductorCedula,
    editarConductor,
    cambiarEstado,
  };
});