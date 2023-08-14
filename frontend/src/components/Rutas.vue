<template>
  <div>
    <div class="q-pa-md mt-2">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-3">
          <q-btn
            label="Registrar nueva ruta"
            @click="modalRegistrar=true
            "
            id="nuevo"
          />
        </div>
        <div class="col-3">
          <div class="buscador mt-3">
            <button @click="buscarRutaId()" :disabled="id===''">buscar</button>
            <input type="text" placeholder="Ruta a buscar" v-model="id"/>
            <div class="alert error" v-if="alert===true">
                <span>{{ erroresBuscar }}</span>
              </div>
          </div>
        </div>
        <div class="col-3"></div>
      </div>

      <div class="row">
        <div class="col">
          <h6 id="tituloTabla">Rutas de la empresa</h6>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Editar</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in rutas" :key="p">
                  <td>{{ p.codigo }}</td>
                  <td>{{ p.origen }}</td>
                  <td>{{ p.destino }}</td>
                  <!-- BOTON EDITAR RUTA -->
                  <td>
                    <i
                      class="fa-regular fa-pen-to-square"
                      @click="editarRuta(p)"
                      id="editar"
                    ></i>
                  </td>
                  <!-- CAMBIO DE ESTADO -->
                <div @click="cambiarEstado(p)" style=" text-align: center; cursor: pointer">
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
   
 <!-- INFORMACION DE LA RUTA BUSCADA POR ID -->
 <div class="modal-bg" id="modal" v-if="modalBuscar===true">
        <div class="modal-content">
            <div id="modal-body" v-for="b in buscar.ruta" :key="b">
              <h6 id="tituloTabla">Cliente {{ b.codigo}} </h6>
            <div class="table-container"  >

           
          <table class="custom-table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Editar</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ b.codigo }}</td>
            <td>{{ b.origen }}</td>
            <td>{{ b.destino }}</td>
            <td><button @click="editarCliente(b)">Editar</button></td>
            <div @click="cambiarEstado(b)">
                    <td v-if="b.estado === 1"><button>Activo</button></td>
                    <td v-else><button>Inactivo</button></td>
                  </div>
          </tr>
        </tbody>
      </table>

          </div> 

            </div>
            <div class="modal-buttons">
                <button id="closeModalBtn" @click="modalBuscar=false , id=''">Cerrar</button>
            </div>
        </div>
    </div>
        <!-- FIN DE LA INFORMACION RUTA -->
    <!-- MODAL REGISTRAR NUEVA RUTA-->
    <div class="modal-bg" id="modal" v-if="modalRegistrar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Registrar Ruta</h2>
          <div v-if="alertaError === true">
            {{ alerta }}
          </div>
        </div>
        <div class="modal-body">
          <input type="text" v-model="codigo" placeholder="Codigo" />
          <input type="text" v-model="origen" placeholder="origen" />
          <input type="text" v-model="destino" placeholder="Destino" />
        </div>
        <div id="alertaError">
<span>{{ errores }}</span>
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalRegistrar = false">
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
        <div class="modal-body">
          <input type="text" v-model="codigo" placeholder="Codigo" />
          <input type="text" v-model="origen" placeholder="Origen" />
          <input type="text" v-model="destino" placeholder="Destino" />
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
    <!-- FIN MODAL EDITAR RUTAS -->
    <!-- ................................. -->
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
    estado:1
  }).then((res)=>{
console.log(res);
buscarRuta()
limpiarCampos()
modalRegistrar.value=false
  }).catch((error)=>{
if(error.response && error.response.data){
  errores.value=error.response.data.errors[0].msg
}else{
console.log(error);
}
  })
}
function limpiarCampos(){
  codigo.value='',
  origen.value='',
  destino.value=''
}
async function buscarRuta() {
  rutas.value = await useRuta.buscarRuta();
  console.log(rutas.value);
}
buscarRuta();

async function buscarRutaId() {
  await useRuta.buscarRutaId(id.value).then((res)=>{
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

async function editarRuta(p) {
  idEditar.value = p._id;
  codigo.value=p.codigo;
  origen.value = p.origen;
  destino.value = p.destino;
  modalEditar.value = true;
  modalRegistrar.value = false;
  console.log(idEditar.value);
}
function guardarEdicion(){
  useRuta.editarRuta(
    idEditar.value,
    codigo.value,
    origen.value,
    destino.value
  ).then((res)=>{
    console.log(res);
    buscarRuta()
    modalEditar.value=false
  }).catch((error)=>{
    errores.value=''
    if(error.response && error.response.data){
  errores.value=error.response.data.errors[0].msg
  console.log(errores);
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