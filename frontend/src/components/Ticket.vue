<template>
  <div>
    <!--  -->
    <div class="col-2"></div>
    <div class="col-3">
      <div class="buscador">
        <button @click="buscarTicketCodigo()" :disabled="codigo===''">
          <img src="../imagenes/persona.svg" alt="no" />
        </button>
        <input type="text" v-model="codigo" placeholder="Ingrese a buscar" />
        <div class="alert error" v-if="alert===true">
                <span>{{ errores }}</span>
              </div>
      </div>
    </div>
    <div class="col-2"></div>
    <!--  -->
    <!--  -->
    <div class="row">
      <div class="col">
        <h6 id="tituloTabla">Tickets</h6>
        <div class="table-container">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Cedula</th>
                <th>Cliente</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Vehiculo</th>
                <th>Puesto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, i) in tickets" :key="i">
                <td>{{ t.codigo }}</td>
                <td>{{ t.cliente.cedula }}</td>
                <td>{{ t.cliente.nombre }} {{ t.cliente.apellidos }}</td>
                <td>{{ t.ruta.origen }}</td>
                <td>{{ t.ruta.destino }}</td>
                <td>{{ t.vehiculo.num_vehiculo }} {{ t.vehiculo.placa }}</td>
                <td>{{ t.numero_puesto }}</td>
                <td>{{ t.precio }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--  -->

    <!--  -->
    <div class="modal-bg" id="modal" v-if="modalBuscar === true">
      <div class="modal-content">
        <div class="modal-body" v-for="bt in buscarTick" :key="bt">
          <p id="tituloTabla">Ticket # {{ bt.codigo }}</p>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Cedula</th>
                  <th>Cliente</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Vehiculo</th>
                  <th>Puesto</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(bt, i) in buscarTick" :key="i">
                  <td>{{ bt.codigo }}</td>
                  <td>{{ bt.cliente.cedula }}</td>
                  <td>{{ bt.cliente.nombre }} {{ bt.cliente.apellidos }}</td>
                  <td>{{ bt.ruta.origen }}</td>
                  <td>{{ bt.ruta.destino }}</td>
                  <td>{{ bt.vehiculo.num_vehiculo }} {{ bt.vehiculo.placa }}</td>
                  <td>{{ bt.numero_puesto }}</td>
                  <td>{{ bt.precio }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="(modalBuscar = false)">
            Cerrar
          </button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTicketStore } from "../stores/ticket";
const useTicket = useTicketStore();

let tickets = ref([]);
let codigo = ref("");
let errores = ref("");
let buscarTick = ref([]);
let modalBuscar = ref(false);
let alert=ref(false)
let alertE=ref(false)

async function buscarTicket() {
  tickets.value = await useTicket.buscarTicket();
  console.log(tickets.value);
}
buscarTicket();

async function buscarTicketCodigo() {
await useTicket
    .buscarTicketId(codigo.value)
    .then((res) => {
      buscarTick.value = res.ticket;
      modalBuscar.value = true;
    })
    .catch((error) => {
      if (error.response && error.response.data) {
      alert.value=true
      errores.value=error.response.data.msg
      alerta()
      }else {
        console.log(error);
      }
    });
}
function alerta() {
  setTimeout(() => {
    alertE.value=false
    alert.value =false
    errores.value=''
  }, 1600);
 }
</script>