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
                <th>Boleto</th>
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
                <td @click="Buscarboleto(t)">🖨️</td>
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
        <div class="modal-body" v-for="t in buscarTick" :key="t">
          <p id="tituloTabla">Ticket # {{ t.codigo }}</p>
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
                  <th>Boleto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(t, i) in buscarTick" :key="i">
                  <td>{{ t.codigo }}</td>
                  <td>{{ t.cliente.cedula }}</td>
                  <td>{{ t.cliente.nomre }} {{ t.cliente.apellidos }}</td>
                  <td>{{ t.ruta.origen }}</td>
                  <td>{{ t.ruta.destino }}</td>
                  <td>{{ t.vehiculo.num_vehiculo }} {{ t.vehiculo.placa }}</td>
                  <td>{{ t.numero_puesto }}</td>
                  <td>{{ t.precio }}</td>
                  <td @click="Buscarboleto(t)">🖨️</td>
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
     <!-- Boleto -->
<div v-if="modalBoleto===true">
    <div class="ticket" v-for="v in boleto" :key="v">
    <div class="ticket-header">
      <h4>{{ v.empresa.nombre }}</h4>
      <p>{{ v.empresa.nit }}</p>
      <p>{{ v.empresa.direccion }}</p>
      <p>{{ v.empresa.telefono }}</p>
    </div>
    <div class="ticket-info">
      <div>
        <label>Fecha de Venta:</label>
        <span> {{ v.fecha_venta }}</span>
      </div>
      <div>
        <label>Fecha de Salida:</label>
        <span>{{ v.fecha_salida }}/{{ v.hora_salida }}</span>
      </div>
      <div>
        <label>Cédula del Pasajero:</label>
        <span>{{ v.cliente.cedula }}</span>
      </div>
      <div>
        <label>Nombre del Pasajero:</label>
        <span>{{ v.cliente.nombre }} {{ v.cliente.apellidos }}</span>
      </div>
      <div>
        <label>Teléfono:</label>
        <span>{{ v.cliente.telefono }}</span>
      </div>
      <div>
        <label>Vehículo:</label>
        <span>{{ v.vehiculo.placa }}/{{ v.vehiculo.num_vehiculo }}</span>
      </div>
      <div>
        <label>Origen:</label>
        <span>{{ v.ruta.origen }}</span>
      </div>
      <div>
        <label>Destino:</label>
        <span>{{ v.ruta.destino }}</span>
      </div>
      <div>
        <label>Número de Ticket:</label>
        <span>{{ v.codigo }}</span>
      </div>
      <div>
        <label>Silla:</label>
        <span>{{ v.numero_puesto }}</span>
      </div>
      <div>
        <label>Valor del Ticket:</label>
        <span>{{ v.precio }}</span>
      </div>
    </div>
    <div class="ticket-footer">
      <p>¡Gracias por su compra!</p>
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
let codigoBoleto=ref('')
let boleto=ref([])
let modalBoleto=ref(false)

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
async function Buscarboleto(t){
codigoBoleto.value=t.codigo
await useTicket.buscarTicketId(codigoBoleto.value).then((res)=>{
boleto.value=res.ticket
modalBoleto.value=true
  })
}
function alerta() {
  setTimeout(() => {
    alertE.value=false
    alert.value =false
    errores.value=''
  }, 1600);
 }
</script>