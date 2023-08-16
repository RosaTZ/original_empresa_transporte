<template>
  <div>

    <div class="q-pa-md mt-2" v-if="useTicket.cargando == true">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div style=" text-align: center; margin-top: 20%;">
            <q-spinner color="secondary" size="7em" :thickness="10" v-if="useTicket.cargando == true" />

          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
    <!--  -->
    <div v-if="useTicket.cargando===false">
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

    <!-- modal buscar -->
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
  <div class="modalPrincipal">
    <div class="modal-contenido">
    <div class="ticket" v-for="v in boleto" :key="v">
    <div class="ticket-empre">
      <smoll>{{ v.empresa.nombre }}</smoll>
      <p>{{ v.empresa.nit }}</p>
      <p>{{ v.empresa.direccion }}</p>
      <p>{{ v.empresa.telefono }}</p>
    </div>
    <div class="ticket-info">
      <div class="cont">
        <label>Fecha de Venta:</label>
        <span> {{ v.fecha_venta }}</span>
      </div>
      <div class="cont">
        <label>Fecha de Salida:</label>
        <span>{{ v.fecha_salida }}/{{ v.hora_salida }}</span>
      </div>
      <div class="cont">
        <label>Cédula del Pasajero:</label>
        <span>{{ v.cliente.cedula }}</span>
      </div>
      <div class="cont">
        <label>Nombre del Pasajero:</label>
        <span>{{ v.cliente.nombre }} {{ v.cliente.apellidos }}</span>
      </div>
      <div class="cont">
        <label>Teléfono:</label>
        <span>{{ v.cliente.telefono }}</span>
      </div>
      <div class="cont">
        <label>Vehículo:</label>
        <span>{{ v.vehiculo.placa }}/{{ v.vehiculo.num_vehiculo }}</span>
      </div>
      <div class="cont">
        <label>Origen:</label>
        <span>{{ v.ruta.origen }}</span>
      </div>
      <div class="cont">
        <label>Destino:</label>
        <span>{{ v.ruta.destino }}</span>
      </div>
      <div class="cont">
        <label>Número de Ticket:</label>
        <span>{{ v.codigo }}</span>
      </div>
      <div class="cont">
        <label>Silla:</label>
        <span>{{ v.numero_puesto }}</span>
      </div>
      <div class="cont">
        <label>Valor del Ticket:</label>
        <span>{{ v.precio }}</span>
      </div>
    </div>
    <div class="ticket-footerr">
      <p>¡Gracias por su compra!</p>
    </div>
    
  </div>
  <button class="close" @click="modalBoleto=false, codigoBoleto=''">
    <i class="fa-solid fa-xmark" ></i>
  </button>

  </div>
>
</div>

</div>
<!-- prueba -->
</div>
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

<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  /* Fondo gris del modal */
  .modalPrincipal{
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.71);
  }
/* contenido de la factura */
  .modal-contenido{
    padding-top: 2vh;
    background-color: rgb(255, 255, 255);
    /* padding: 20px; */
    border-radius: 5px;
    position: relative;
    margin: 6% auto;
    top: -1%;
    width: 53%;
    padding-bottom: 5vh;
    
  }

  /*  */
  .modal-contenido .ticket{
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.411);
    width: 60%;
  }
  .modal-contenido .ticket-empre{
    background-color: #273273;
    text-align: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: #f4f4f4;
  }

  .modal-contenido .ticket-empre smoll{
    text-align: center;
    font-size: 4vh;
    padding: 1%;
    font-weight: 800;
  }

  .modal-contenido .ticket-empre p{
    text-align: center;
    color: rgb(255, 255, 255);    
  }


  .modal-contenido .ticket-info span{
    text-align: center;
    color: rgb(108, 97, 97);    
  }
  .modal-contenido .ticket-info .cont{
    text-align: center;
    color: rgb(196, 40, 40);
    margin-bottom: 4px;
  }
  .modal-contenido .ticket-footerr{
    text-align: center;
    padding: 2px;

  }
  .modal-contenido .ticket-footerr p {
    color: #333;
    font-size: 16px;
    font-weight: 600;
  } 


  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 4vh;
    width: 6vh;
    font-weight: bold;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    background: #d70f01;
    color: white;
  }
  .close:hover{
    box-shadow: 0 0 20px 1px #d70f01;

  }

</style>