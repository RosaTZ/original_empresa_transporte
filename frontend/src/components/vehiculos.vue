<template>
  <div>
    <div class="q-pa-md mt-2">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-3">
          <q-btn id="nuevo"
            label="Registrar nuevo vehiculo"
            @click="(modalRegistrar = true)"
          />
          <div class="col"></div>
        </div>
        <div class="col-3">
          <div class="buscador mt-3">
            <button @click="buscarVehiculoId()" :disabled="id===''">
              buscar
            </button>
            <input type="text" placeholder="Placa del vehiculo" v-model="id" />
            <div class="alert error" v-if="alert===true">
                <span>{{ erroresBuscar }}</span>
              </div>
          </div>
        </div>
        <div class="col-3"></div>
      </div>

      <div class="row">
        <div class="col">
          <h6 id="tituloTabla">Vehiculos registrados</h6>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Placa</th>
                  <th>Número del vehiculo</th>
                  <th>Propietario</th>
                  <th>Puestos</th>
                  <th>Nombre conductor</th>
                  <th>tecnomecanica</th>
                  <th>Editar</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in vehiculos" :key="p">
                  <td>{{ p.placa }}</td>
                  <td>{{ p.num_vehiculo }}</td>
                  <td>{{ p.propietario }}</td>
                  <td>{{ p.puestos }}</td>
                  <td>{{ p.conductor_id.nombre }}</td>
                  <td>{{ p.revision_id.tecnomecanica }}</td>
                  <td><i  id="editar" class="fa-regular fa-pen-to-square" @click="editarVehiculo(p) "></i></td>
                <div @click="cambiarEstado(p)" style=" text-align: center; cursor: pointer ; margin-top: 10%;">
                <td v-if="p.estado===1" style="text-align: center; margin: auto; color: rgb(22, 75, 199); font-weight: bold;">Activo</td>
                <td v-else style="color: red; font-weight: bold ;">Inactivo</td>
                </div>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE BUSQUEDA -->
    <div class="modal-bg" id="modal" v-if="modalBuscar===true">
        <div class="modal-content">
            <div class="modal-body" v-for="b in buscar.vehiculo" :key="b">
              <h6 id="tituloTabla">Placa {{ b.placa }} </h6>
            <div class="table-container"  >
            <table class="custom-table">
               <thead>
                 <tr>
                   <th>Placa</th>
                   <th>Numero del vehiculo</th>
                   <th>Propietario</th>
                   <th>Numero puestos</th>
                   <th>Editar </th>
                   <th>Estado</th>
                 </tr>
               </thead>
              <tbody>
                 <tr>
                  <td>{{ b.placa }}</td>
                  <td>{{ b.num_vehiculo }}</td>
                  <td>{{ b.propietario }}</td>
                  <td>{{ b.puestos }}</td>
                  <td>                    <i
                      class="fa-regular fa-pen-to-square"
                      @click="modalEditar=true"
                      id="editar"
                    ></i></td>
                   <div @click="cambiarEstado(b)" style=" text-align: center; cursor: pointer ; margin-top: 10%;">
                <td v-if="b.estado===1" style="text-align: center; margin: auto; color: rgb(22, 75, 199); font-weight: bold;">Activo</td>
                <td v-else style="color: red; font-weight: bold ;">Inactivo</td>
                </div>
                  </tr>
              </tbody>
            </table>
          </div> 
            </div>
            <div class="modal-buttons">
                <button id="closeModalBtn" @click="modalBuscar=false, id=''">Cerrar</button>
            </div>
        </div>
    </div>
    
<!-- MODAL CON LOS CAMPOS PARA REGISTRAR UN NUEVO VEHICULO -->
    <div class="modal-bg" id="modal" v-if="modalRegistrar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Agregar vehiculo</h2>
          <div v-if="alertaError === true">
            {{ alerta }}
          </div>
        </div>
        <div class="modal-body">
          <!-- SELECT DE LOS CONDUCTORES -->
          <div>
            <select @click="idConductor($event)">
              <option value="">Conductores</option>
              <option :value="c._id" v-for="c in conductores" :key="c">
                {{ c.nombre }}
              </option>
            </select>
          </div>
          <!-- SELECT DE LA REVISION -->
          <div>
            <select @click="idRevision($event)">
              <option value="">Revisiones</option>
              <option :value="c._id" v-for="c in revisiones" :key="c">
                {{ c.tecnomecanica }}
              </option>
            </select>
          </div>
          <!-- INPUTS CON LOS CAMPOS A COMPLETAR PARA EL REGISTRO -->
          <input type="text" v-model="placa" placeholder="Placa del vehiculo">
          <input type="text" v-model="num_vehiculo" placeholder="Número del vehiculo" />
          <input type="text" v-model="propietario" placeholder="propietario" />
          <span>Número de puestos</span>
          <input type="number" v-model="puestos" placeholder="Número de puestos">
        </div>
        <!-- BOTON REGISTRAR NUEVO VEHICULO -->
        <div id="alertaError">
          <span>{{ errores }}</span>
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalRegistrar = false">
            Cerrar
          </button>
          <button id="saveBtn" @click="registrarVehiculo()">Guardar</button>
        </div>
      </div>
    </div>
<!-- MODAL PARA EDITAR EL VEHICULO -->
    <div class="modal-bg" id="modal" v-if="modalEditar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar vehiculo</h2>
        </div>
        <div class="modal-body">
          <div>
            <select @click="idConductor($event)">
              <option value="">Conductores</option>
              <option :value="c._id" v-for="c in conductores" :key="c">
                {{ c.nombre }}
              </option>
            </select>
          </div>
          <div>
            <select @click="idRevision($event)">
              <option value="">Revisiones</option>
              <option :value="c._id" v-for="c in revisiones" :key="c">
                {{ c.tecnomecanica }}
              </option>
            </select>
          </div>
          <input type="text" v-model="placa" placeholder="Placa del vehiculo">
          <input type="text" v-model="num_vehiculo" placeholder="Número del vehiculo" />
          <input type="text" v-model="propietario" placeholder="propietario" />
          <input type="number" v-model="puestos" placeholder="Número de puestos">
        </div>
        <div>
          <span>{{ errores }}</span>
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalEditar = false">
            Cerrar
          </button>
          <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import { useVehiculoStore } from "../stores/vehiculo.js";
import { useConductorStore } from "../stores/conductor";
import { useRevisionStore } from "../stores/revision";

let idEditar = ref("");
let modalEditar = ref(false);
let modalRegistrar = ref(false);
let modalBuscar=ref(false)
let errores=ref('')
let vehiculos = ref([]);
let placa=ref('')
let num_vehiculo = ref("");
let propietario = ref("");
let puestos=ref(0)
let conductorId=ref('')
let revisionId=ref('')
let id = ref("");
let buscar=ref([])
let conductores=ref([])
let revisiones=ref([])
let alert=ref(false)
let alertE=ref(false)
let erroresBuscar=ref('')
const useVehiculo = useVehiculoStore();
const useConductor=useConductorStore();
const useRevision=useRevisionStore()

async function traerConductor() {
  conductores.value = await useConductor.buscarConductor();
}
async function traerRevision() {
  revisiones.value = await useRevision.buscarRevision();
}
async function idConductor(e){
conductorId.value=e.target.value
console.log('conductor '+conductorId.value);
}
async function idRevision(e){
revisionId.value=e.target.value
console.log('revision '+revisionId.value);
}

function registrarVehiculo(){
  useVehiculo.registrarVehiculo({
    placa:placa.value,
    num_vehiculo: num_vehiculo.value,
    propietario: propietario.value,
    puestos:puestos.value,
    conductor_id: conductorId.value,
    revision_id: revisionId.value,
    estado:1
  }).then((res)=>{
    console.log(res);
    buscarVehiculo()
    limpiarCampos()
    modalRegistrar.value=false
  }).catch((error)=>{
    if (error.response && error.response.data.errors) {
      errores.value=error.response.data.errors[0].msg
      }else if(error.response && error.response.data){
        errores.value=error.response.data.msg
      } else {
        console.log(error);
      }
  })
}
function limpiarCampos() {
  idEditar.value=''
  placa.value=''
  num_vehiculo.value=''
  propietario.value=''
  puestos.value=''
  conductorId.value=''
  revisionId.value=''
  }
async function buscarVehiculo() {
  vehiculos.value = await useVehiculo.buscarVehiculo();
  console.log(vehiculos.value);
  traerConductor() 
  traerRevision()
}
buscarVehiculo();
async function buscarVehiculoId() {
  await useVehiculo.buscarVehiculoId(id.value).then((res)=>{
    buscar.value=res
    modalBuscar.value=true
  }).catch((error)=>{
    if (error.response && error.response.data) {
      alert.value=true
      erroresBuscar.value=error.response.data.msg
      erroresBuscar.value=error.response.data.errors[0].msg
      alerta()
      }else {
        console.log(error);
      }
  })
}
async function editarVehiculo(p) {
  idEditar.value = p._id;
  placa.value=p.placa,
  num_vehiculo.value=p.num_vehiculo,
  propietario.value=p.propietario,
  puestos.value=p.puestos,
  conductorId.value=p.conductor_id.nombre,
  revisionId.value=p.revision_id.tecnomecanica,
  modalEditar.value = true;
  modalRegistrar.value = false;
  modalBuscar.value=false
  console.log(idEditar.value);
}

function guardarEdicion(){
  useVehiculo.editarVehiculo(
    idEditar.value,
    placa.value,
    num_vehiculo.value,
    propietario.value,
    puestos.value,
    conductorId.value,
    revisionId.value
  ).then((res)=>{
    console.log(res);
    buscarVehiculo()
    modalEditar.value=false
  }).then((error)=>{
    errores.value=''
    if (error.response && error.response.data) {
      errores.value=error.response.data.errors[0].msg
      } else {
        console.log(error);
      }
  })
}
async function cambiarEstado(p){
  if(p.estado===1){
    p.estado=0
  }else{
    p.estado=1
  }
  const res= await useVehiculo.cambiarEstado(p._id,p.estado)
  console.log(res.data);
  buscarVehiculo()
}

function alerta() {
  setTimeout(() => {
    alertE.value=false
    alert.value =false
    errores.value=''
    erroresBuscar.value=''
  }, 1600);
 }
</script>