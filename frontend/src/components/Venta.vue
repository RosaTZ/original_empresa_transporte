<template>
  <div class="q-pa-md mt-2">
    <!-- row pa los botones -->
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <q-btn color="secondary" label="Nueva Venta" @click="cerrar=true,botonNuevaVenta=true,mostrarFecha=true,limpiarCampos()" />
      </div>
      <!-- <div class="col">
        <q-btn color="secondary" label="Iniciar Venta" @click="cerrar = true" v-if="mostrarSillas===true" />

      </div> -->
      <div class="col">
        <q-btn color="secondary" label="Continuar  Venta"  @click="cerrar=true,botonNuevaVenta=false,mostrarFecha=false,limpiarCampos()" />
      </div>
      <div class="col"></div>

    </div>
    <!-- row para la pantalla -->
    <div class="row" style="margin-top: 4%;">
      <div class="col-1"></div>
            <!-- Sillas a la venta-->
      <div class="col-6">
        <div class="q row items-start q-gutter" v-if="mostrarSillas === true">
        <div class="my-card">
          <div class="info-bus">
            <div class="row">
              <div class="col">
                <div class="pp">
            <span>Ruta </span>
            <small>{{ origen }} - {{ destino }}</small>
            </div>
              </div>
              <div class="col">
                <div class="pp">
            <span>Conductor</span>
            <small>{{ conductor }} </small>
            </div>
              </div>
              <div class="col">
                <div class="pp">
            <span>Placa vehiculo</span>
            <small>{{ placa }} </small>
            </div>
              </div>
            </div>

          </div>
          <q-card-section
            style=" display: grid; grid-template-columns: repeat(3, 1fr) "
          >
            <div id="img"
              v-for="(s, i) in sillas"
              :key="i"
              :style="
            s.estado === 1 ? 'color:orange' : 'color:whith'">
              <span>{{ s.puesto }}</span>
              <i  class="fa-solid fa-couch" @click="estado(i), (mostrarCliente = true)" id="mueble"> 
              </i>

            </div>
          </q-card-section>
        </div>
      </div>
      </div>
      <!-- Informacion al momento de vender -->
      <div class="col-4" style="margin-top: -3%;">
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
              <div class="botonesasiento">
                <button @click="buscarCliente()" id="buscarU">Buscar Cliente</button>
                <button @click="registrarCliente()" id="guardarC">Guardar Cliente</button>
              </div>

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
      <div class="col-1"></div>

            <!-- seleccionar para iniciar venta -->
      <div
        class="col" style="padding: 5%; margin-top: -5%" v-if="cerrar === true" >
        <div class="modal-bgG" id="modal">
          <div class="modal-contentT">
            <div class="modal-bodyy">
              <div id="vehiculo">
                <div class="row" id="prueba">
                  <div class="col"><p>Completa la información</p></div>
                  <div class="col">
                    <div class="alert error" v-if="alert === true">
                      <td class="icon-editt"></td>
                        {{ errores }}
                      </div>
                  </div>
                </div>
                <div class="vh">
                  <span>Selecciona Vehiculo</span>
                  <select
                    v-model="vehiculoId"
                    @click="buscarVehiculosRutas(),seleccionarVehiculo(),(mostrarSillas = true),(mostrarPuestos=false)"
                  >
                    <option v-for="(v, i) in vehiculoFiltrados" :key="i" :value="v">
                      {{ v.placa }}
                    </option>
                  </select>
                </div>
              </div>

              <div id="rutas">
                <div>
                  <span>Seleccionar Ruta</span>
                  <select v-model="rutaId" @click="buscarVehiculosRutas(),seleccionarRuta()">
                    <option v-for="(r, i) in rutaFiltrada" :key="i" :value="r">
                      {{ r.codigo }} {{ r.origen }} {{ r.destino }}
                    </option>
                  </select>
                </div>
              </div>

              <div id="fechas">
                <div>
                  <span>Fecha venta</span>
                  <input type="datetime-local" v-model="fecha_venta" />
                  <div v-if="mostrarFecha===true">
                    <span>Fecha Salida</span>
                  <input type="date" v-model="fecha_salida" />
                  </div>
                  
                </div>
              </div>
              
              <div class="modal-buttons" v-if="botonNuevaVenta===false">
                    <!-- <button id="saveBtn" @click="continuar(),renovar()">Continuar</button> -->
                    <button id="no" @click="cerrar=false,limpiarCampos()">Cancelar</button>
                  <button id="saveBtn" @click="renovar()">Renovar venta</button>
                  </div>
                  <div class="modal-buttons" v-if="botonNuevaVenta===true">
                    <button id="no" @click="cerrar=false,limpiarCampos()">Cancelar</button>
                    <button id="saveBtn" @click="continuar()">Nueva venta</button>
                  </div>
            </div>
          </div>
        </div>
        <!-- FIN DE MODAL DE SELECCIONAR LA INFORMACION DEL BUS -->

      </div>



              <!-- Boleto final -->
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
        <span>{{ v.fecha_salida }} / {{ hora_salida }}</span>
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
let precio = ref(0);
let sillas = ref([]);
let asiento = ref(null);
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
let errores1 = ref("");
let numAleatorio = ref(0);
let cerrar = ref(false);
let mostrarCliente = ref(false);
let mostrarSillas = ref(false);
let placa = ref("");
let conductor = ref("");
let origen = ref("");
let destino = ref("");
let renovarVenta = ref([]);
let renovarPuestos = ref([]);
let mostrarPuestos = ref(false);
let boleto = ref([]);
let modalBoleto = ref(false);
let alertCliente = ref(false);
let alertTicket = ref(false);
let modalRenovar = ref(false);
let estadoCliente = ref(null);
let mostrarFecha = ref(false);
let alert = ref(false);
let botonNuevaVenta = ref(false);
let vehiculoFiltrados = ref([]);
let rutaFiltrada = ref([]);

async function buscarVehiculosRutas() {
  vehiculos.value = await useVehiculo.buscarVehiculo();
  vehiculoFiltrados.value = vehiculos.value.filter((v) => v.estado === 1);
  rutas.value = await useRuta.buscarRuta();
  rutaFiltrada.value = rutas.value.filter((r) => r.estado === 1);
  empresa.value = await useEmpresa.buscarEmpresa();
}
buscarVehiculosRutas();

function seleccionarVehiculo() {
  vehiculo_id.value = vehiculoId.value._id;
  if (vehiculo_id.value === undefined) {
    errores.value = "Complete todos los campos";
  } else {
    puestos.value = vehiculoId.value.puestos;
    placa.value = vehiculoId.value.placa;
    conductor.value = vehiculoId.value.conductor_id.nombre;
    sillas.value = [];
    for (let i = 0; i < puestos.value; i++) {
      sillas.value.push({
        puesto: i + 1,
        estado: 0,
      });
    }
    return true;
  }
}
function seleccionarRuta() {
  ruta_id.value = rutaId.value._id;
  hora_salida.value = rutaId.value.hora_salida;
  origen.value = rutaId.value.origen;
  destino.value = rutaId.value.destino;
  if (ruta_id.value === undefined) {
    errores.value = "Complete todos los campos";
  } else {
    return true;
  }
}
function continuar() {
  if (fecha_salida.value === "") {
    alert.value = true;
    errores.value = "Complete todos los campos";
    alerta();
  } else if (fecha_venta.value === "") {
    alert.value = true;
    errores.value = "Complete todos los campos";
    alerta();
  } else if (seleccionarVehiculo() === true && seleccionarRuta() === true) {
    cerrar.value = false;
  }
}
function estado(i) {
  asiento.value = i;
}
function buscarCliente() {
  useCliente
    .buscarClienteCedula(cedula.value)
    .then((res) => {
      estadoCliente.value = res.cliente[0].estado;
      if (estadoCliente.value == 0) {
        alertCliente.value = true;
        errores.value = "Cliente inactivo";
        alerta();
      } else {
        cliente_id.value = res.cliente[0]._id;
        nombre.value = res.cliente[0].nombre;
        apellidos.value = res.cliente[0].apellidos;
        telefono.value = res.cliente[0].telefono;
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        alertCliente.value = true;
        errores.value = error.response.data.msg;
        alerta();
      }
    });
}
function registrarCliente() {
  useCliente
    .registrarCliente({
      cedula: cedula.value,
      nombre: nombre.value,
      apellidos: apellidos.value,
      telefono: telefono.value,
    })
    .then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Registro Exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      registrarTicket();
    })
    .catch((error) => {
      if (error.response && error.response.data.errors) {
        alertCliente.value = true;
        errores.value = error.response.data.errors[0].msg;
        alerta();
      } else if (error.response && error.response.data) {
        alertCliente.value = true;
        errores.value = error.response.data.msg;
        alerta();
      } else {
        console.log(error);
      }
    });
}
function buscarTicket() {
  useTicket.buscarTicket().then((res) => {
    numAleatorio.value = res.length;
  });
}
async function renovar() {
  useTicket
    .buscarTicketRenovar(
      rutaId.value._id,
      vehiculoId.value._id,
      fecha_venta.value
    )
    .then((res) => {
      fecha_salida.value = res.ticket[0].fecha_salida;
      renovarVenta.value = res.ticket;
      renovarPuestos.value = res.puestos;
      renovarPuestos.value.forEach((n) => {
        sillas.value[n - 1].estado = 1;
      });
      mostrarPuestos.value = true;
      mostrarSillas.value = true;
      mostrarCliente.value = false;
      modalRenovar.value = false;
      cerrar.value = false;
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        alert.value = true;
        errores.value = error.response.data.msg;
        alerta();
        if (errores.value === "Venta sin iniciar") {
          console.log(errores.value);
          mostrarFecha.value = true;
          botonNuevaVenta.value = true;
        }
      } else {
        console.log(error);
      }
    });
}
buscarTicket();
function registrarTicket() {
  numAleatorio.value + 1;
  useTicket
    .registrarTicket({
      codigo: numAleatorio.value,
      fecha_venta: fecha_venta.value,
      fecha_salida: fecha_salida.value,
      numero_puesto: asiento.value + 1,
      precio: precio.value,
      estado: 1,
      cliente: cliente_id.value,
      vehiculo: vehiculo_id.value,
      ruta: ruta_id.value,
      empresa: empresa.value[0]._id,
    })
    .then((res) => {
      console.log(res);
      buscarTicketId();
      modalBoleto.value = true;
      limpiarCampos();
      sillas.value[asiento.value].estado = 1;
      buscarTicket();
    })
    .catch((error) => {
      if (error.response && error.response.data.errors) {
        alertTicket.value = true;
        errores1.value = error.response.data.errors[0].msg;
        console.log(errores1.value);
        alerta();
      } else if (error.response && error.response.data) {
        console.log(error.response);
        alertTicket.value = true;
        errores1.value = error.response.data.msg;
        alerta();
      } else {
        console.log(error);
      }
    });
}
async function buscarTicketId() {
  await useTicket.buscarTicketId(numAleatorio.value).then((res) => {
    console.log();
    boleto.value = res.ticket;
  });
}

function alerta() {
  setTimeout(() => {
    alertCliente.value = false;
    alertTicket.value = false;
    alert.value = false;
    errores.value = "";
    errores1.value = "";
  }, 3000);
}

function limpiarCampos() {
  (cedula.value = ""),
    (nombre.value = ""),
    (apellidos.value = ""),
    (telefono.value = ""),
    (precio.value = ""),
    (puestos.value = null);
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


  /* MY CARD DE SILLAS */

  .my-card{
    text-align: center;
    width: 60vh;
    border-radius:7px 7px 7px 7px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.456);
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    color: green;
  }
  .info-bus{
    background-color: #273273;
    border-radius:7px 7px 0px 0px;

  }

  .my-card .pp {
    padding: 5%;
    display: flex;
    flex-direction: column;
    color: white;

  }

  .my-card .pp span{
    font-size: 15px;
    font-weight: 600;

  }
  #img{
    padding: 3%;

  }

#img #mueble{
  font-size: 36px;
  margin : 10% auto;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: inline-block; /* Para que los elementos estén en línea */
  margin-right: 4vh; /* Agrega espacio entre los elementos */
}

#img:hover{
  /* box-shadow: 0px 0px 10px 1px gray; */
}

/* modal  -----------------------------------------*/
.modal-bgG {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-contentT {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    width: 50%;
    max-width: 60%;
    padding: 4%;
    margin: auto;


}


#prueba{
  margin-bottom: 5%;
}


.modal-bodyy{
  cursor: pointer;
  height: 94%;
  text-align: center;
  max-height: 95%; 
  overflow-y: auto; 
  margin-top: -3%;
  border-radius: 10px;
}

.modal-bodyy input {
  cursor: pointer;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    margin-bottom: 15px;

}

.modal-bodyy select{
  margin-bottom: 2%;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  color: rgba(128, 128, 128, 0.596);
}


#prueba p{
  font-size: 20px;
  font-weight: bold;
}

.modal-bodyy span{
  font-weight: bold;
}




</style>