<template>
  <div class="q-pa-md mt-2">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-3">
          <div class="col-3" ></div>
          <div class="col-2"  >
            <div class="Agregar"  >
              <button @click="
            (modalRegistrar = true),
              (modalEditar = false),
              (modalBuscar = false)
          ">
              <img src="../imagenes/AgregarPersona.svg" alt="">
            </button>
          </div>
          <div class="col-2"  >
          </div>
          <!--  -->
          <div class="col-2"  ></div>
        </div>
      </div>
      <div class="col-3" >
            <div class="buscador" >
              <button @click="buscarConductorCedula()" :disabled="cc===''">
                <img src="../imagenes/persona.svg" alt="no"  >
              </button>
              <input type="text" v-model="cc" placeholder="Ingrese a Cedula" >
              <div class="alert error" v-if="alert===true">
                <span>{{ erroresBuscar }}</span>
              </div>
          </div>
          </div>
    </div>
        <!-- TABLA PRINCIPAL INMOBIL -->

    <div class="row">
      <div class="col">
        <h6 id="tituloTabla">Conductores</h6>
        <div class="table-container">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Fecha de nacimiento</th>
                <th>Direccion</th>
                <th>Estado civil</th>
                <th>Telefono</th>
                <th>Licencia</th>
                <th>Categoria Licencia</th>
                <th>Fecha de vencimiento</th>
                <th>Editar</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in conductores" :key="p">
                <td>{{ p.cedula }}</td>
                <td>{{ p.nombre }}</td>
                <td>{{ p.apellidos }}</td>
                <td>{{ p.fecha_nacimiento }}</td>
                <td>{{ p.direccion }}</td>
                <td>{{ p.estado_civil }}</td>
                <td>{{ p.telefono }}</td>
                <td>{{ p.licencia }}</td>
                <td>{{ p.categoria_licencia }}</td>
                <td>{{ p.fecha_vencimiento }}</td>
                <td  class="icon-edit" @click="modalEditar=true, editarConductor(p)"></td>
                <div @click="cambiarEstado(p)" style=" text-align: center; cursor: pointer; margin-top: 10%;">
                <td v-if="p.estado===1" style="text-align: center; margin: auto; color: green; font-weight: bold;">Activo</td>
                <td v-else style="color: red; font-weight: bold ;">Inactivo</td>
                </div>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL BUSCAR CONDUCTOR -->
    <div id="modalBuscar" v-if="modalBuscar === true">
      <div class="modal-bg" id="modal">
        <div class="modal-content">
          <div class="modal-body" v-for="p in buscar" :key="p">
            <h6 id="tituloTabla">Conductor {{ p.nombre }}</h6>
            <div class="table-container">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>Cedula</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Telefono</th>
                    <th>Direccion</th>
                    <th>Editar</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ p.cedula }}</td>
                    <td>{{ p.nombre }}</td>
                    <td>{{ p.apellidos }}</td>
                    <td>{{ p.telefono }}</td>
                    <td>{{ p.direccion }}</td>
                    <td  class="icon-edit" @click="modalEditar=true, editarConductor(p)"></td>
                <div @click="cambiarEstado(p)" style=" text-align: center; cursor: pointer; margin-top: 10%;">
                <td v-if="p.estado===1" style="text-align: center; margin: auto; color: green; font-weight: bold;">Activo</td>
                <td v-else style="color: red; font-weight: bold ;">Inactivo</td>
                </div>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-buttons">
            <button
              id="closeModalBtn"
              @click="(modalBuscar = false), (cc = '')">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL AGREGAR UN CONDUCTOR -->
    <div class="modal-bg" id="modal" v-if="modalRegistrar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Agregar Nuevo Conductor</h2>
        </div>
        <div class="alert error" v-if="alert===true">
          <td class="icon-editt"></td>
              {{ errores }}
            </div>
        <div class="modal-body">
          <input type="text" v-model="cedula" placeholder="cedula" />
          <input type="text" v-model="nombre" placeholder="nombres" />
          <input type="text" v-model="apellidos" placeholder="apellidos" />
          <input
            type="date"
            v-model="fecha_nacimiento"
            placeholder="Fecha Nacimiento"
          />
          <input type="text" v-model="direccion" placeholder="direccion" />
          <input type="text" v-model="telefono" placeholder="telefono" />
          <input
            type="text"
            v-model="estado_civil"
            placeholder="Estado civil"
          />
          <input type="text" v-model="licencia" placeholder="licencia" />
          <input
            type="text"
            v-model="categoria_licencia"
            placeholder="Categoria de la licencia"
          />
          <input
            type="date"
            v-model="fecha_vencimiento"
            placeholder="Fecha de vencimiento de la licencia"
          />

          
        </div>


        
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalRegistrar = false">
            Cerrar
          </button>
          <button id="saveBtn" @click="registrarConductor()">Guardar</button>
        </div>
      </div>
    </div>
<!-- MODAL EDITAR CONDUCTOR-->
    <div class="modal-bg" id="modal" v-if="modalEditar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar conductor</h2>
        </div>
        <div class="modal-body">
          <input type="text" v-model="cedula" placeholder="cedula" />
          <input type="text" v-model="nombre" placeholder="nombres" />
          <input type="text" v-model="apellidos" placeholder="apellidos" />
          <input
            type="date"
            v-model="fecha_nacimiento"
            placeholder="Fecha Nacimiento"
          />
          <input type="text" v-model="direccion" placeholder="direccion" />
          <input type="text" v-model="telefono" placeholder="telefono" />
          <input
            type="text"
            v-model="estado_civil"
            placeholder="Estado civil"
          />
          <input type="text" v-model="licencia" placeholder="licencia" />
          <input
            type="text"
            v-model="categoria_licencia"
            placeholder="Categoria de la licencia"
          />
          <input
            type="date"
            v-model="fecha_vencimiento"
            placeholder="Fecha de vencimiento de la licencia"
          />
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
import { ref } from "vue";
import { useConductorStore } from "../stores/conductor.js";
let modalRegistrar = ref(false);
let modalEditar = ref(false);
let modalBuscar = ref(false);
let errores = ref('');
let erroresBuscar=ref('')
let idEditar = ref("");
let cedula = ref("");
let nombre = ref("");
let apellidos = ref("");
let telefono = ref("");
let licencia = ref("");
let categoria_licencia = ref("");
let fecha_vencimiento = ref("");
let fecha_nacimiento = ref("");
let estado_civil = ref("");
let direccion = ref("");
let cc = ref("");
let conductores = ref([]);
let buscar = ref([]);

let alert=ref(false)
let alertE=ref(false)

const useConductor = useConductorStore();

function registrarConductor() {
  useConductor
    .registrarConductor({
      cedula: cedula.value,
      nombre: nombre.value,
      apellidos: apellidos.value,
      fecha_nacimiento: fecha_nacimiento.value,
      direccion: direccion.value,
      telefono: telefono.value,
      estado_civil: estado_civil.value,
      licencia: licencia.value,
      categoria_licencia: categoria_licencia.value,
      fecha_vencimiento: fecha_vencimiento.value,
      estado: 1,
    })
    .then((res) => {
      // modalRegistrar.value=true
      console.log(res);
      limpiarCampos()
      alerta()
      buscarConductor()
      Swal.fire({
      icon: 'success',
      title: 'Registro Exitoso',
      showConfirmButton: false,
       timer: 1500})
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        alert.value=true
      errores.value=error.response.data.errors[0].msg
      alerta()
      } else {
        console.log(error);
      }
    });
}

function limpiarCampos(){
  cedula.value='',
      nombre.value= '',
      apellidos.value= '',
      fecha_nacimiento.value='',
      direccion.value='',
      telefono.value='',
      estado_civil.value='',
      licencia.value= '',
      categoria_licencia.value='',
      fecha_vencimiento.value=''
}
async function buscarConductor() {
  conductores.value = await useConductor.buscarConductor();
  console.log(conductores.value);
}
buscarConductor();

async function buscarConductorCedula() {
  await useConductor.buscarConductorCedula(cc.value).then((res)=>{
    buscar.value=res.conductor
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

async function editarConductor(p) {
  idEditar.value = p._id;
  cedula.value = p.cedula;
  nombre.value = p.nombre, 
  apellidos.value = p.apellidos;
  telefono.value = p.telefono;
  licencia.value = p.licencia;
  categoria_licencia.value = p.categoria_licencia;
  fecha_vencimiento.value = p.fecha_vencimiento,
  fecha_nacimiento.value = p.fecha_nacimiento
  direccion.value = p.direccion;
  estado_civil.value = p.estado_civil;
  modalEditar.value = true;
  modalRegistrar.value = false;
}

function guardarEdicion(){
  useConductor.editarConductor(
    idEditar.value,
    cedula.value,
    nombre.value,
    apellidos.value,
    telefono.value,
    licencia.value,
    categoria_licencia.value,
    fecha_vencimiento.value,
    fecha_nacimiento.value,
    direccion.value,
    estado_civil.value
  ).then((res)=>{
    limpiarCampos()
    alerta()
    modalRegistrar.value=false
    buscarConductor()
    modalEditar.value=false
    Swal.fire({
      icon: 'success',
      title: 'Edicion Exitosa',
      showConfirmButton: false,
       timer: 1500})
    }) 
    .catch((error)=>{
    errores.value=''
    if (error.response && error.response.data) {
      alert.value=true
      errores.value=error.response.data.errors[0].msg
      alerta()
      } else {
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
  const res = await useConductor.cambiarEstado(p._id, p.estado);
  console.log(res.data);
  buscarConductor();
}

function alerta() {
  setTimeout(() => {
    alertE.value=false
    alert.value =false
    errores.value=''
    erroresBuscar.value=''
  }, 3000);
}



</script>