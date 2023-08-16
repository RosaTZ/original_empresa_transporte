<template>
  <div class="q-pa-md mt-2">
    <!--  -->
<div>
  <div>
    <button @click="cerrar=true">Nueva venta</button>
    <button @click="modalRenovar=true">Continuar venta</button>
  </div>
</div>
    <!--  -->
    <!-- seleccionar para renovar venta -->
    <div class="col"
        style="padding: 5%; margin-top: -5%" v-if="modalRenovar===true">
        <div class="modal-bg" id="modal">
          <div class="modal-content">
            <div class="modal-body">
      <div id="vehiculo">
        <div>
          <span>Seleccionar vehiculo</span>
          <select
            v-model="vehiculoId"
            @click="seleccionarVehiculo()"
          >
            <option v-for="(v, i) in vehiculos" :key="i" :value="v">
              {{ v.placa }}
            </option>
          </select>
        </div>
      </div>
      <div id="rutas">
        <div>
          <span>Seleccionar Ruta</span>
          <select v-model="rutaId" @click="seleccionarRuta()">
            <option v-for="(r, i) in rutas" :key="i" :value="r">
              {{ r.codigo }} {{ r.origen }} {{ r.destino }}
            </option>
          </select>
        </div>
      </div>
      <span>Fecha venta</span>
        <input type="date" v-model="fecha_venta" />
        <div class="alert error" v-if="alertRenovar===true">
          <span>{{ errores }}</span>
        </div>
        <div class="modal-buttons">
          <button id="saveBtn" @click="renovar()">Renovar Venta</button>
          <button id="closeModalBtn" @click="modalRenovar=false">Cancelar</button>
        </div>
      </div>
      </div>
      </div>
    </div>
<!-- ................................. -->
 <!-- sillas venta renovada -->
<div class="q row items-start q-gutter" v-if="(mostrarPuestos===true)" style="width: 40%;">
  <q-card class="my-card">
    <div class="text-h6" style="color: rgb(0, 0, 0)">
            <span>Conductor: {{ conductor }}</span>
          </div>
          <div class="text-subtitle2" style="color: rgb(0, 0, 0)">
            <span>Placa Vehiculo: {{ placa }}</span>
          </div>
          <q-card-section
            style="display: grid; grid-template-columns: repeat(3, 2fr)"
          >
      <div
        v-for="(s, i) in sillas"
        :key="i"
        @click="estado(i)"
      >
        <div
          :style="
            renovarPuestos.includes(i + 1) ? 'background:orange':s.estado === 1 ? 'background:orange' : 'background:beige'
          "
        >
          <img src="../imagenes/sila.png" @click="(mostrarCliente=true)"/>
          <button v-if="!renovarPuestos.includes(i + 1)">Vender</button>
          <span>{{ i+1 }}</span>
        </div>
      </div>
    </q-card-section>
    </q-card>
    </div>

      <!-- ------------------------------------ -->

    <div class="row">
      
      <!-- seleccionar para iniciar venta -->
      <div
        class="col"
        style="padding: 5%; margin-top: -5%"
        v-if="cerrar === true"
      >
        <div class="modal-bg" id="modal">
          <div class="modal-content">
            <div class="modal-body">
              <div id="vehiculo">
                <div>
                  <span>Seleccionar vehiculo</span>
                  <select
                    v-model="vehiculoId"
                    @click="seleccionarVehiculo(), (mostrarSillas = true),(mostrarPuestos=false)"
                  >
                    <option v-for="(v, i) in vehiculos" :key="i" :value="v">
                      {{ v.placa }}
                    </option>
                  </select>
                </div>
              </div>
              <div id="rutas">
                <div>
                  <span>Seleccionar Ruta</span>
                  <select v-model="rutaId" @click="seleccionarRuta()">
                    <option v-for="(r, i) in rutas" :key="i" :value="r">
                      {{ r.codigo }} {{ r.origen }} {{ r.destino }}
                    </option>
                  </select>
                </div>
              </div>
              <div id="fechas">
                <div>
                  <span>Fecha venta</span>
                  <input type="date" v-model="fecha_venta" />
                  <span>Fecha Salida</span>
                  <input type="date" v-model="fecha_salida" />
                  <span>Hora salida</span>
                  <input type="time" v-model="hora_salida" />
                  <div class="modal-buttons">
                  <button id="saveBtn" @click="cerrar = false">Continuar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- sillas inicio venta -->
      <div class="q row items-start q-gutter" v-if="mostrarSillas === true">
        <div>
        <button @click="cerrar = true">Iniciar venta</button>
      </div>
        <q-card class="my-card">
          <div class="text-h6" style="color: rgb(0, 0, 0)">
            <span>Conductor: {{ conductor }}</span>
          </div>
          <div class="text-subtitle2" style="color: rgb(0, 0, 0)">
            <span>Placa Vehiculo: {{ placa }}</span>
          </div>
          <q-card-section
            style="display: grid; grid-template-columns: repeat(3, 1fr)"
          >
            <div
              v-for="(s, i) in sillas"
              :key="i"
              :style="s.estado === 1 ? 'background:orange' : 'background:beige'"
            >
              <img
                src="../imagenes/sila.png"
                @click="estado(i), (mostrarCliente = true)"
              />
              <button v-if="s.estado===0">Vender</button>
              <span>{{ s.puesto }}</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- -------------------------- -->
      <!-- cliente tanto inicio venta como venta renovada -->
      <div class="col">
        <div class="formulario" v-if="mostrarCliente === true">
          <div id="cliente">
            <div class="row">
              <div class="col">
                <p class="resaltado">Asiento # {{ asiento+1 }}</p>
              </div>
            </div>
            <div class="col">
              <div class="alert error" v-if="alertCliente===true">
                <span>{{ errores }}</span>
              </div>
              <button @click="buscarCliente()">Buscar</button>
              <button @click="registrarCliente()">Guardar</button>
            </div>
            <div>
              <input type="text" placeholder="Cedula" v-model="cedula" />
              <input type="text" placeholder="Nombre" v-model="nombre" />
              <input type="text" placeholder="Apellidos" v-model="apellidos" />
              <input type="text" placeholder="Telefono" v-model="telefono" />
            </div>
            <div>
              <input type="number" placeholder="Costo del pasaje" v-model="precio">
            </div>
          </div>
          <div>
            <div class="alert error" v-if="alertTicket===true">
              <span>{{ errores1 }}</span>
            </div>
            <div class="botones">
              <button @click="registrarTicket()" id="ok">Vender</button>
              <button @click="mostrarCliente = false" id="no">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <!-- ---------------------------- -->
    </div>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useVehiculoStore } from "../stores/vehiculo";
import { useRutaStore } from "../stores/rutas";
import { useEmpresaStore } from "../stores/empresa";
import { useClienteStore } from "../stores/cliente";
import { useTicketStore } from "../stores/ticket";

const useVehiculo = useVehiculoStore();
const useRuta = useRutaStore();
const useEmpresa = useEmpresaStore();
const useCliente = useClienteStore();
const useTicket = useTicketStore();
let vehiculos = ref([]);
let rutas = ref([]);
let empresa = ref([]);
let vehiculoId = ref([]);
let rutaId = ref([]);
let puestos = ref(0);
let precio=ref(0)
let sillas = ref([]);
let asiento = ref(0);
let cedula = ref("");
let nombre = ref("");
let apellidos = ref("");
let telefono = ref("");
let vehiculo_id = ref("");
let cliente_id = ref("");
let ruta_id = ref("");
let fecha_venta = ref("");
let fecha_salida = ref("");
let hora_salida = ref("");
let errores = ref("");
let errores1=ref('')
let numAleatorio = ref(0);
let cerrar = ref(false);
let mostrarCliente = ref(false);
let mostrarSillas = ref(false);
let placa = ref("");
let conductor = ref("");
let renovarVenta = ref([]);
let renovarPuestos=ref([])
let mostrarPuestos=ref(false)
let boleto=ref([])
let modalBoleto=ref(false)
let alertCliente=ref(false)
let alertRenovar=ref(false)
let alertTicket=ref(false)
let modalRenovar=ref(false)

async function buscarVehiculosRutas() {
  vehiculos.value = await useVehiculo.buscarVehiculo();
  rutas.value = await useRuta.buscarRuta();
  empresa.value = await useEmpresa.buscarEmpresa();
}
buscarVehiculosRutas();
function seleccionarVehiculo() {
  puestos.value = vehiculoId.value.puestos;
  vehiculo_id.value = vehiculoId.value._id;
  placa.value = vehiculoId.value.placa;
  conductor.value = vehiculoId.value.conductor_id.nombre;
  sillas.value=[]
  for (let i = 0; i < puestos.value; i++) {
    sillas.value.push({
      puesto: i + 1,
      estado: 0,
    });
  }
}
function seleccionarRuta() {
  ruta_id.value = rutaId.value._id;
}
function estado(i) {
  asiento.value = i;
  sillas.value[asiento.value].estado = 1;
}
function buscarCliente() {
  useCliente.buscarClienteCedula(cedula.value).then((res) => {
    cliente_id.value = res.cliente[0]._id;
    nombre.value = res.cliente[0].nombre;
    apellidos.value = res.cliente[0].apellidos;
    telefono.value = res.cliente[0].telefono;
  });
}
function registrarCliente() {
  useCliente
    .registrarCliente({
      cedula: cedula.value,
      nombre: nombre.value,
      apellidos: apellidos.value,
      telefono: telefono.value,
    }).then((res) => {
      console.log(res);
      Swal.fire({
    icon: 'success',
    title: 'Registro Exitoso',
    showConfirmButton: false,
    timer: 1500
   })
   buscarCliente()
    }).catch((error) => {
      if (error.response && error.response.data.errors) {
        alertCliente.value=true
      errores.value=error.response.data.errors[0].msg
      alerta()
      }else if(error.response && error.response.data){
        alertCliente.value=true
        errores.value = error.response.data.msg;
        alerta()
      } else {
        console.log(error);
      }
    });
}
function buscarTicket() {
  useTicket.buscarTicket().then((res) => {
    numAleatorio.value = res.length+1;
  });
}
buscarTicket();
function registrarTicket() {
  useTicket
    .registrarTicket({
      codigo: numAleatorio.value,
      fecha_venta: fecha_venta.value,
      fecha_salida: fecha_salida.value,
      numero_puesto: asiento.value,
      hora_salida: hora_salida.value,
      precio:precio.value,
      estado: 1,
      cliente: cliente_id.value,
      vehiculo: vehiculo_id.value,
      ruta: ruta_id.value,
      empresa: empresa.value[0]._id,
    })
    .then((res) => {
      console.log(res);
      buscarTicketId()
      modalBoleto.value=true
    })
    .catch((error) => {
      if (error.response && error.response.data.errors) {
        alertTicket.value=true
        errores1.value = error.response.data.errors[0].msg;
        alerta()
      }else if(error.response && error.response.data){
        alertTicket.value=true
        errores1.value = error.response.data.msg;
        alerta()
      } else {
        console.log(error);
      }
    });
}
async function buscarTicketId(){
  await useTicket.buscarTicketId(numAleatorio.value).then((res)=>{
boleto.value=res.ticket
console.log(boleto.value);
  })
}
async function renovar() {
 useTicket.buscarTicketRenovar( 
  rutaId.value._id,
  vehiculoId.value._id,
  fecha_venta.value).then((res)=>{
    renovarVenta.value=res.ticket
    renovarPuestos.value=res.puestos
    mostrarPuestos.value=true
    mostrarSillas.value=false
    mostrarCliente.value=false
  }).catch((error)=>{
    if (error.response && error.response.data) {
      alertRenovar.value=true
        errores.value = error.response.data.msg;
        alerta()
      } else {
        console.log(error);
      }
  }) 
}

function alerta() {
  setTimeout(() => {
    alertCliente.value=false
    alertRenovar.value =false
    alertTicket.value=false
    errores.value=''
    errores1.value=''
  }, 3000);
 }
</script>

<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }

  .ticket {
    width: 30%;
    /* margin: 50px auto; */
    margin: auto;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .ticket-header {
    text-align: center;
    margin-bottom: 5%;
    background-color: #336699;
    color: #fff;
    padding: 1%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .ticket-info {
    display: grid;
    padding: 5%;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 2%;
  }

  .ticket-info label {
    font-weight: bold;
    color: #333;
  }

  .ticket-info span {
    display: block;
    color: #666;
  }

  .ticket-footer {
    text-align: center;
    margin-top: 1%;
    background-color: #f0f0f0;
    padding: 10px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .ticket-footer p {
    color: #333;
    font-size: 18px;
  }
</style>