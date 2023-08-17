import {defineStore} from "pinia"
import axios from "axios"

export const useEmpresaStore = defineStore("empresa",()=>{
   const buscarEmpresa= async()=> {
    try {
      const buscar= await axios.get(`https://empresa-transporte.onrender.com/api/empresa`)
      console.log(buscar.data.buscar);
      return buscar.data.buscar
    } catch (error) {
      console.log(error);
    } 
        }
        

        return{
            buscarEmpresa
        }
})