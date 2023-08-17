<template>
  <div>
      <div class="q-pa-md mt-2" v-if="useRevision.cargando == true">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div style=" text-align: center; margin-top: 20%;">
            <q-spinner color="secondary" size="7em" :thickness="10" v-if="useRevision.cargando == true" />
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
    <div v-if="useRevision.cargando===false">
    <div class="q-pa-md mt-2">
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
          <button @click="buscarRevisionId()" :disabled="id === ''">
            <i
              class="fa-solid fa-magnifying-glass"
              style="color: #ffffff; font-size: 3.8vh"
            ></i>
          </button>
          <input type="text" v-model="id" placeholder="Buscar Tecnomecanica" />
          <div class="alert error" v-if="alert === true">
            <span>{{ erroresBuscar }}</span>
          </div>
        </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h6 id="tituloTabla">Control Revisiones Autos</h6>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Tecnomecanica</th>
                  <th>Fecha revisión</th>
                  <th>Fecha proxima revisión</th>
                  <th>Descripción</th>
                  <th>Editar</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in revisiones" :key="p">
                  <td>{{ p.tecnomecanica }}</td>
                  <td>{{ p.fecha_revision }}</td>
                  <td>{{ p.fecha_proxima_revision }}</td>
                  <td>{{ p.descripcion }}</td>
                  <td
                    class="icon-edit"
                    @click="editarRevision(p)"
                  ></td>
                  <div
                    @click="cambiarEstado(p)"
                    style="text-align: center; cursor: pointer; margin-top: 10%"
                  >
                    <td
                      v-if="p.estado === 1"
                      style="
                        text-align: center;
                        margin: auto;
                        color: green;
                        font-weight: bold;
                      "
                    >
                      Activo
                    </td>
                    <td v-else style="color: red; font-weight: bold">
                      Inactivo
                    </td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- modal buscar por tecnmecanica -->
    <div class="modal-bg" id="modal" v-if="modalBuscar === true">
      <div class="modal-content">
        <div class="modal-body" v-for="p in buscar" :key="p">
          <p id="tituloTabla">Cliente {{ p.nombre }}</p>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Tecnomecanica</th>
                  <th>Fecha revisión</th>
                  <th>Fecha proxima revisión</th>
                  <th>Descripción</th>
                  <th>Editar</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ p.tecnomecanica }}</td>
                  <td>{{ p.fecha_revision }}</td>
                  <td>{{ p.fecha_proxima_revision }}</td>
                  <td>{{ p.descripcion }}</td>
                  <td>
                    <i
                      class="fa-regular fa-pen-to-square"
                      @click="editarRevision(p)"
                      id="editar"
                    ></i>
                  </td>
                  <div
                    @click="cambiarEstado(p)"
                    style="text-align: center; cursor: pointer; margin-top: 10%"
                  >
                    <td
                      v-if="p.estado === 1"
                      style="
                        text-align: center;
                        margin: auto;
                        color: rgb(22, 75, 199);
                        font-weight: bold;
                      "
                    >
                      Activo
                    </td>
                    <td v-else style="color: red; font-weight: bold">
                      Inactivo
                    </td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="(modalBuscar = false), (cc = '')">
            Cerrar
          </button>
        </div>
      </div>
    </div>
    <!-- ------------------------------------------------ -->
    <!-- ............................................ -->

    <!-- ...................REGISTRAR REVISION......................... -->

    <div class="modal-bg" id="modal" v-if="modalRegistrar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Registrar revisión</h2>
          <div class="alert error" v-if="alert === true">
            <td class="icon-editt"></td>
            {{ errores }}
          </div>
        </div>
        <div class="modal-body">
          <span>Tecnomecanica</span>
          <input
            type="text"
            v-model="tecnomecanica"
            placeholder="Tecnomecanica"
          />
          <span>Fecha de la revision</span>
          <input
            type="date"
            v-model="fecha_revision"
            placeholder="Fecha revisión"
          />
          <span>Fecha proxima revision</span>
          <input
            type="date"
            v-model="fecha_proxima_revision"
            placeholder="Fecha de la siguiente revisión"
          />
          <span>Descripcion</span>
          <input type="text" v-model="descripcion" placeholder="" />
        </div>
        <div class="modal-buttons">
          <button
            id="closeModalBtn"
            @click="(modalRegistrar = false), limpiarCampos()"
          >
            Cerrar
          </button>
          <button id="saveBtn" @click="registrarRevision()">Guardar</button>
        </div>
      </div>
    </div>
    <!-- MODAL EDITAR REVISION -->
    <div class="modal-bg" id="modal" v-if="modalEditar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar revision</h2>
          <div class="alert error" v-if="alert === true">
            <td class="icon-editt"></td>
            {{ errores }}
          </div>
        </div>
        <div class="modal-body">
          <span>Tecnomecanica</span>
          <input type="text" v-model="tecnomecanica" />
          <span>Fecha de la revision</span>
          <input
            type="date"
            v-model="fecha_revision"
            placeholder="Fecha revisión"
          />
          <span>Fecha proxima revision</span>
          <input
            type="date"
            v-model="fecha_proxima_revision"
            placeholder="Fecha de la siguiente revisión"
          />
          <span>Descripcion</span>
          <input type="text" v-model="descripcion" placeholder="" />
        </div>
        <div class="modal-buttons">
          <button
            id="closeModalBtn"
            @click="(modalEditar = false), limpiarCampos()"
          >
            Cerrar
          </button>
          <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
        </div>
      </div>
    </div>
    <!-- MODAL BUSCAR REVISION -->
    <div class="modal-bg" id="modal" v-if="modalBuscar === true">
      <div class="modal-content">
        <div class="modal-body" v-for="p in buscar" :key="p">
          <p id="tituloTabla">Ultima revision {{ p.fecha_revision }}</p>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Tecnomecanica</th>
                  <th>Fecha Revision</th>
                  <th>Fecha Proxima revision</th>
                  <th>Descripción</th>
                  <th>Editar</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ p.tecnomecanica }}</td>
                  <td>{{ p.fecha_revision }}</td>
                  <td>{{ p.fecha_proxima_revision }}</td>
                  <td>{{ p.descripcion }}</td>
                  <td
                    class="icon-edit"
                    @click="editarRevision(p)"
                  ></td>
                  <div
                    @click="cambiarEstado(p)"
                    style="
                      margin: auto;
                      text-align: center;
                      margin-left: 25%;
                      border-bottom: 1px;
                    "
                  >
                    <td
                      v-if="p.estado === 1"
                      style="
                        text-align: center;
                        margin: auto;
                        color: green;
                        font-weight: bold;
                      "
                    >
                      Activo
                    </td>
                    <td v-else style="color: red; font-weight: bold">
                      Inactivo
                    </td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="(modalBuscar = false), (id = '')">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import { ref } from "vue";
import { useRevisionStore } from "../stores/revision.js";
let modalEditar = ref(false);
let modalRegistrar = ref(false);
let modalBuscar = ref(false);
let errores = ref("");
let idEditar = ref("");
let revisiones = ref([]);
let tecnomecanica = ref("");
let fecha_revision = ref("");
let fecha_proxima_revision = ref("");
let descripcion = ref("");
let id = ref("");
let buscar = ref([]);
let alert = ref(false);
let alertE = ref(false);
let erroresBuscar = ref("");

const useRevision = useRevisionStore();

function registrarRevision() {
  useRevision
    .registrarRevision({
      tecnomecanica: tecnomecanica.value,
      fecha_revision: fecha_revision.value,
      fecha_proxima_revision: fecha_proxima_revision.value,
      descripcion: descripcion.value,
    })
    .then((res) => {
      errores.value = "";
      console.log(res);
      buscarRevision();
      limpiarCampos();
      modalRegistrar.value = false;
      Swal.fire({
        icon: "success",
        title: "Registro Exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      if (error.response && error.response.data.errors) {
        alert.value = true;
        errores.value = error.response.data.errors[0].msg;
        alerta();
      }else if(error.response && error.response.data){
        alert.value = true;
        errores.value = error.response.data.msg;
        alerta();
      } else {
        console.log(error);
      }
    });
}
function limpiarCampos() {
  (tecnomecanica.value = ""),
    (fecha_revision.value = ""),
    (fecha_proxima_revision.value = ""),
    (descripcion.value = "");
}
async function buscarRevision() {
  revisiones.value = await useRevision.buscarRevision();
  console.log(revisiones.value);
}
buscarRevision();

async function buscarRevisionId() {
  await useRevision
    .buscarRevisionId(id.value)
    .then((res) => {
      buscar.value = res;
      modalBuscar.value = true;
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        alert.value = true;
        erroresBuscar.value = error.response.data.msg;
        erroresBuscar.value = error.response.data.errors[0].msg;
        alerta();
      } else {
        console.log(error);
      }
    });
}

async function editarRevision(p) {
  modalEditar.value = true;
  idEditar.value = p._id;
  tecnomecanica.value = p.tecnomecanica;
  fecha_proxima_revision.value = p.fecha_proxima_revision;
  fecha_revision.value = p.fecha_revision;
  descripcion.value = p.descripcion;
  modalEditar.value=true
  modalRegistrar.value=false
  modalBuscar.value=false
}

function guardarEdicion() {
  useRevision
    .editarRevision(
      idEditar.value,
      tecnomecanica.value,
      fecha_revision.value,
      fecha_proxima_revision.value,
      descripcion.value
    )
    .then((res) => {
      console.log(res);
      buscarRevision();
      modalEditar.value = false;
      modalRegistrar.value=false;
      modalBuscar.value=false
      Swal.fire({
        icon: "success",
        title: "Edicion completada con Exito",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      errores.value = "";
      if (error.response && error.response.data) {
        alert.value = true;
        errores.value = error.response.data.errors[0].msg;
        alerta();
      } else {
        console.log(error);
      }
    });
}
async function cambiarEstado(b) {
  if (b.estado === 1) {
    b.estado = 0;
  } else {
    b.estado = 1;
  }
  const res = await useRevision.cambiarEstado(p._id, p.estado);
  console.log(res);
  buscarRevision();
}

function alerta() {
  setTimeout(() => {
    alertE.value = false;
    alert.value = false;
    errores.value = "";
    erroresBuscar.value = "";
  }, 3000);
}
</script>