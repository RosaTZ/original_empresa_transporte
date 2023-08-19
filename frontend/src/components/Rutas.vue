<template>
  <div>
    <div class="q-pa-md mt-2" v-if="useRuta.cargando == true">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div style=" text-align: center; margin-top: 20%;">
            <q-spinner color="secondary" size="7em" :thickness="10" v-if="useRuta.cargando == true" />
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
    <div v-if="useRuta.cargando===false">
    <div class="q-pa-md mt-2">
      <!-- BOTONES SUPERIORES AGREGAR Y BUSCAR -->
      <div class="row">
        <div class="col-3"></div>
        <div class="col-2">
          <div class="Agregar">
            <button>
              <p class="icon-rev" @click="modalRegistrar = true"></p>
            </button>
          </div>
        </div>
        <div class="col-2"></div>
        <div class="col-3">
          <div class="buscador">
          <button @click="buscarRutaId()" :disabled="id === ''">
            <i
              class="fa-solid fa-magnifying-glass"
              style="color: #ffffff; font-size: 3.8vh"
            ></i>
          </button>
          <input type="text" v-model="id" placeholder="Buscar Ruta por codigo" />

          <div class="alert error" v-if="alert === true">
            <span>{{ erroresBuscar }}</span>
          </div>
        </div>
        </div>
      </div>
<!-- TABLA PRINCIPAL DE LAS RUTAS -->
      <div class="row">
        <!-- TABLA -->
        <div class="col">
          <h6 id="tituloTabla">Rutas de la empresa</h6>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Hora salida</th>
                  <th>Editar</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in rutas" :key="p">
                  <td>{{ p.codigo }}</td>
                  <td>{{ p.origen }}</td>
                  <td>{{ p.destino }}</td>
                  <td>{{ p.hora_salida }}</td>
                  <!-- BOTON EDITAR RUTA -->
                  <td class="icon-edit" @click="editarRuta(p)" ></td>
                  <!-- CAMBIO DE ESTADO -->
                <div @click="cambiarEstado(p)" style=" margin: auto; display: flex; text-align: center; cursor: pointer">
                <td v-if="p.estado===1" style="text-align: center; margin: auto; color: green; font-weight: bold;">Activo</td>
                <td v-else style="color: red; font-weight: bold ;">Inactivo</td>
                </div>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
   
 <!-- INFORMACION DE LA RUTA BUSCADA POR ID -->
 <div class="modal-bg" id="modal" v-if="modalBuscar===true">
        <div class="modal-content" style="width: 100%;">
            <div id="modal-body" v-for="p in buscar.ruta" :key="p">
              <h6 id="tituloTabla">Cliente {{ p.codigo}} </h6>
            <div class="table-container"  >
          <table class="custom-table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Hora salida</th>
            <th>Editar</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ p.codigo }}</td>
            <td>{{ p.origen }}</td>
            <td>{{ p.destino }}</td>
            <td>{{ p.hora_salida }}</td>
            <td class="icon-edit" @click="editarRuta(p)"></td>
            <div @click="cambiarEstado(p)" style=" text-align: center; cursor: pointer">
                <td v-if="p.estado===1" style="text-align: center; margin: auto; color: green; font-weight: bold;">Activo</td>
                <td v-else style="color: red; font-weight: bold ;">Inactivo</td>
                </div>
          </tr>
        </tbody>
      </table>

          </div> 

            </div>
            <div class="modal-buttons">
                <button id="closeModalBtn" @click="modalBuscar=false,id=''">Cerrar</button>
            </div>
        </div>
    </div>
    <!-- MODAL REGISTRAR NUEVA RUTA-->
    <div class="modal-bg" id="modal" v-if="modalRegistrar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Registrar Ruta</h2>
          <div class="alert error" v-if="alert === true">
            <td class="icon-editt"></td>
            {{ errores }}
          </div>
        </div>
        <div class="modal-body">
          <span>Codigo</span>
          <input type="text" v-model="codigo" placeholder="Codigo" />
          <span>Origen</span>
          <input type="text" v-model="origen" placeholder="origen" />
          <span>Destino</span>
          <input type="text" v-model="destino" placeholder="Destino" />
          <span>Hora salida</span>
          <input type="time" v-model="hora_salida" placeholder="Hora salida">
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalRegistrar = false,limpiarCampos()">
            Cerrar
          </button>
          <button id="saveBtn" @click="registrarRuta()">Guardar</button>
        </div>
      </div>
    </div>
    
    <!-- MODAL EDITAR RUTAS -->
    <div class="modal-bg" id="modal" v-if="modalEditar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar ruta {{ name }}</h2>
        </div>
        <div class="alert error" v-if="alert === true">
            <td class="icon-editt"></td>
            {{ errores }}
          </div>

        <div class="modal-body">
          <span>Codigo</span>
          <input type="text" v-model="codigo" placeholder="Codigo" />
          <span>Origen</span>
          <input type="text" v-model="origen" placeholder="origen" />
          <span>Destino</span>
          <input type="text" v-model="destino" placeholder="Destino" />
          <span>Hora salida</span>
          <input type="time" v-model="hora_salida" placeholder="Hora salida">
        </div>


        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalEditar = false,limpiarCampos()">
            Cerrar
          </button>
          <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
        </div>
      </div>
    </div>
    <!-- FIN MODAL EDITAR RUTAS -->
    <!-- ................................. -->
  </div>
  </div>
</template>
 
 <script setup>
import { ref } from "vue";
import { useRutaStore } from "../stores/rutas.js";

let idEditar = ref("");
let modalEditar = ref(false);
let modalRegistrar = ref(false);
let modalBuscar = ref(false);
let errores=ref('');
let rutas = ref();
let codigo = ref("");
let origen = ref("");
let destino = ref("");
let hora_salida=ref('')
let id = ref("");
let buscar = ref([]);
let alert=ref(false)
let alertE=ref(false)
let erroresBuscar=ref('')
const useRuta = useRutaStore();

function registrarRuta(){
  useRuta.registrarRuta({
    codigo: codigo.value,
    origen: origen.value,
    destino: destino.value,
    hora_salida: hora_salida.value,
    estado:1
  }).then((res)=>{
console.log(res);
buscarRuta()
limpiarCampos()
modalRegistrar.value=false
Swal.fire({
        icon: "success",
        title: "Nueva Ruta Agregada Exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
  }).catch((error)=>{
if(error.response && error.response.data.errors){
  alert.value=true
  errores.value=error.response.data.errors[0].msg
  alerta()
}else if(error.response && error.response.data){
  alert.value=true
  errores.value=error.response.data.msg
  alerta()
}else{
console.log(error);
}
  })
}
function limpiarCampos(){
  codigo.value='',
  origen.value='',
  destino.value=''
  hora_salida.value=''
}
async function buscarRuta() {
  rutas.value = await useRuta.buscarRuta();
  console.log(rutas.value);
}
buscarRuta();

async function buscarRutaId() {
  await useRuta.buscarRutaId(id.value).then((res)=>{
    modalBuscar.value=true
    buscar.value=res
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

async function editarRuta(p) {
  idEditar.value = p._id;
  codigo.value=p.codigo;
  origen.value = p.origen;
  destino.value = p.destino;
  hora_salida.value=p.hora_salida;
  modalEditar.value = true;
  modalRegistrar.value = false;
  modalBuscar.value=false
  console.log(idEditar.value);
}
function guardarEdicion(){
  useRuta.editarRuta(
    idEditar.value,
    codigo.value,
    origen.value,
    destino.value,
    hora_salida.value
  ).then((res)=>{
    console.log(res);
    buscarRuta()
    modalEditar.value=false
    modalBuscar.value=false
    modalRegistrar.value=false
    Swal.fire({
        icon: "success",
        title: "Ruta Editada Correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
  }).catch((error)=>{
    errores.value=''
    if(error.response && error.response.data){
      alert.value=true
      errores.value=error.response.data.errors[0].msg
      alerta()
}else{
console.log(error);
}
  })
}
async function cambiarEstado(p) {
  if (p.estado === 1) {
    p.estado = 0;
  } else {
    p.estado = 1;
  }
  const res = await useRuta.cambiarEstado(p._id, p.estado);
  console.log(res.data);
  buscarRuta();
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
<style>
#modalBuscar span {
  display: block;
}
</style>