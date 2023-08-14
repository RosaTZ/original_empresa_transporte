import { defineStore } from "pinia";
import axios from "axios";

export const useConductorStore = defineStore("conductor", () => {
  const registrarConductor = async (info) => {
    try {
      let datos = await axios.post("http://localhost:4000/api/conductor", info);
      return datos;
    } catch (error) {
      throw error;
    }
  };
  const buscarConductor = async () => {
    try {
      const buscar = await axios.get(`http://localhost:4000/api/conductor`);
      buscar.data.buscar.reverse()
      return buscar.data.buscar;
    } catch (error) {
      console.log(error);
    }
  };

  const buscarConductorCedula = async (cedula) => {
    try {
      let response = await axios.get(
        `http://localhost:4000/api/conductor/${cedula}`);
      return response.data;
    } catch (error) {
      throw error
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
      const response = await axios.put(
        `http://localhost:4000/api/conductor/${id}`,
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
      console.error("Error al editar el cliente:", error);
      throw error;
    }
  };
  const cambiarEstado = async (id, estado) => {
    try {
      let res = await axios.patch(`http://localhost:4000/api/conductor/${id}`, {
        estado: estado,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    registrarConductor,
    buscarConductor,
    buscarConductorCedula,
    editarConductor,
    cambiarEstado,
  };
});