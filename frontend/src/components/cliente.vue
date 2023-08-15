<!-- aaaaaayyyyyyyyyyyyyyyyyyyyyyy -->
<template>
    <!-- div del  spinner -->
    <div>
      <div class="q-pa-md mt-2" v-if="useCliente.cargando == true">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div style=" text-align: center; margin-top: 20%;">
            <q-spinner color="secondary" size="7em" :thickness="10" v-if="useCliente.cargando == true" />

          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>

    <!-- div toda la informacion -->
  <div v-if="useCliente.cargando ==false">
      <div class="q-pa-md mt-2 " >  
        <div class="row">
          <div class="col-3" ></div>
          <div class="col-2"  >
            <div class="Agregar"  >
              <button>
              <img src="../imagenes/AgregarPersona.svg" alt="" @click="(modalRegistrar=true)">
            </button>

            </div>
            <!-- <q-btn  label="Registrar nuevo cliente" @click="(modalRegistrar=true)" id="nuevo" /> -->
          </div>
          <div class="col-2"  >

          </div>
          <div class="col-3" >
            <div class="buscador" >
              <button @click="buscarClienteCedula()" :disabled="cc===''">
                <img src="../imagenes/persona.svg" alt="no">
              </button>
              <input type="text" v-model="cc" placeholder="Ingrese a buscar" >
              <div class="alert error" v-if="alert===true">
                <span>{{ erroresBuscar }}</span>
              </div>
              
          </div>
          </div>
          <div class="col-2"  ></div>
        </div>
        <div class="row">
          <div class="col">

      <h6 id="tituloTabla">Clientes </h6>
            <div class="table-container">
          <table class="custom-table">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Editar</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in clientes" :key="p">
            <td>{{ p.cedula }}</td>
            <td>{{ p.nombre }}</td>
            <td>{{ p.apellidos }}</td>
            <td>{{ p.telefono }}</td>
            <td class="icon-edit"  @click="editarCliente(p)"></td>
            <div @click="cambiarEstado(p)" style="margin: auto; text-align: center; margin-left: 25%; border-bottom: 1px;">
            <td v-if="p.estado===1" style="text-align: center; margin: auto; color: green; font-weight: bold;cursor: pointer;">Activo</td>
            <td v-else style="color: red; font-weight: bold ;">Inactivo</td>
          </div>
          </tr>
        </tbody>
      </table>
          </div> 
    </div>

        </div>


</div>
      <!-- modal registrar -->
      <div class="modal-bg" id="modal" v-if="modalRegistrar===true">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Agregar Cliente</h2>
                <div class="alert error" v-if="alert===true">
          <td class="icon-editt"></td>
              {{ errores }}
            </div>
            </div>
            <div class="modal-body">
              <input id="cedula" type="text" v-model="cedula" placeholder="cedula" />
              <input type="text" v-model="nombre" placeholder="nombres" />
              <input type="text" v-model="apellido" placeholder="apellidos" />
              <input type="text" v-model="telefono" placeholder="telefono" />
            </div>

            <div class="modal-buttons">
                <button id="closeModalBtn" @click="modalRegistrar=false,limpiarCampos()">Cerrar</button>
                <button id="saveBtn" @click="registrarCliente()">Guardar</button>
            </div>
        </div>
    </div>
    <!-- modal buscar cliente -->
    <div class="modal-bg" id="modal" v-if="modalBuscar===true">
        <div class="modal-content">
            <div class="modal-body" v-for="p in buscar.cliente" :key="p">
              <p id="tituloTabla">Cliente {{ p.nombre }} </p>
            <div class="table-container"  >
            <table class="custom-table">
               <thead>
                 <tr>
                   <th>Cedula</th>
                   <th>Nombre</th>
                   <th>Apellidos</th>
                   <th>Telefono</th>
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
                   <td class="icon-edit" @click="editarCliente(p)"></td>
                   <div @click="cambiarEstado(p)" style="margin: auto; text-align: center; margin-left: 25%; border-bottom: 1px;">
                  <td v-if="p.estado===1" style="text-align: center; margin: auto; color: green; font-weight: bold;">Activo</td>
                 <td v-else style="color: red; font-weight: bold ;">Inactivo</td>
               </div>
                  </tr>
              </tbody>
            </table>
          </div> 
            </div>
            <div class="modal-buttons">
                <button id="closeModalBtn" @click="modalBuscar=false, cc=''">Cerrar</button>
            </div>
        </div>
    </div>

    <!-- Editar cliente -->
    <div class="modal-bg" id="modal" v-if="modalEditar===true">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Editar cliente</h2>  
            </div>
            <div class="modal-body">
              <input type="text" v-model="cedula" placeholder="Cedula">
              <input type="text" v-model="nombre" placeholder="Nombre">
              <input type="text" v-model="apellido" placeholder="Apellidos">
              <input type="text" v-model="telefono" placeholder="telefono" />
            </div>
            <div class="alert error" v-if="alert===true">
              <span>{{ errores }}</span>
             </div>

        <div class="modal-buttons">
                <button id="closeModalBtn" @click="modalEditar=false,limpiarCampos()">Cerrar</button>
                <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
            </div>
    </div>
  </div>
</div>
</div>
  </template>
  
  <script setup>
import { ref } from "vue";
import { useClienteStore } from "../stores/cliente.js"
  
  let cedula = ref("");
  let nombre = ref("");
  let apellido = ref("");
  let telefono = ref("");
  let idEditar=ref('')
  let modalEditar=ref(false)
  let modalRegistrar=ref(false)
  let modalBuscar=ref(false)
  let clientes=ref([])
  let cc=ref('')
  let buscar=ref([])
  let errores=ref('')
  let erroresBuscar=ref('')
  let alert=ref(false)
  let alertE =ref(false)
  const useCliente = useClienteStore();

function registrarCliente(){
  useCliente.registrarCliente({
    cedula: cedula.value,
   nombre: nombre.value,
   apellidos: apellido.value,
   telefono: telefono.value,
  }).then( (res)=>{
    limpiarCampos()
    alerta()
    modalRegistrar.value=false
    Swal.fire({
    icon: 'success',
    title: 'Registro Exitoso',
    showConfirmButton: false,
    timer: 1500
   })
  }).catch((error)=>{
    useCliente.cargando=false
    if (error.response && error.response.data) {
      alert.value=true
      errores.value=error.response.data.errors[0].msg
      alerta()
      } else {
        console.log(error);
      }
    });
    buscarCliente()
}
  function limpiarCampos() {
    cedula.value=''
    nombre.value=''
    apellido.value=''
    telefono.value=''
    errores.value=''
  }
  
  async function buscarCliente(){
    clientes.value= await useCliente.buscarCliente()
  }
  buscarCliente()

  async function buscarClienteCedula() {
    await useCliente.buscarClienteCedula(cc.value).then((res)=>{
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
  
  async function editarCliente(p){
  idEditar.value=p._id
  cedula.value=p.cedula
  nombre.value=p.nombre
  apellido.value=p.apellidos
  telefono.value=p.telefono
  modalEditar.value=true
  modalRegistrar.value=false
  console.log(idEditar.value);
}

  function guardarEdicion(){
    useCliente.editarCliente(
      idEditar.value,
      cedula.value,
      nombre.value,
      apellido.value,
      telefono.value
    ).then((res)=>{
      limpiarCampos()
    alerta()
    modalRegistrar.value=false
    modalEditar.value=false
    Swal.fire({
      icon: 'success',
      title: 'Edicion Exitosa',
      showConfirmButton: false,
       timer: 1500})
       buscarCliente()
    }).catch((error)=>{
      if (error.response && error.response.data) {
        alert.value=true
        errores.value=error.response.data.errors[0].msg
        alerta()
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
  const res= await useCliente.cambiarEstado(p._id,p.estado)
  console.log(res.data);
  buscarCliente()
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