<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "../stores/administrador.js";
import axios from "axios"
let alert=ref(false)
let email = ref("");
let password = ref("");
let ruta = ref("");
let errores=ref('')
let msg=ref('')
const useAdmin = useAdminStore();
const router = useRouter();

function inicioAdmin() {
 useAdmin.inicio(email.value, password.value)
 .then((res)=>{
  const token = res.data.token;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        ruta.value = "/infoEmpresa";
      router.push(ruta.value);
      limpiar()
  }).catch((error) => {
      if (error.response && error.response.data.errors) {
        alert.value=true
        errores.value=error.response.data.errors[0].msg
        alerta()
      }else if(error.response && error.response.data.msg){
        alert.value=true
        errores.value=error.response.data.msg
        alerta()
      }else {
        console.log(error);
      }
    });
 }
 function limpiar(){
  email.value='';
  password.value=''
  errores.value=''
 }

 function alerta() {
  setTimeout(() => {
    alert.value =false
    errores.value=''
  }, 1600);

 }
   

</script>

<template>
  <q-layout>
    <q-row class="q-mb-md q-pa-md">
      <q-col cols="12" md="6" offset-md="3">
        <div class="login-box">
          <div id="avatar">
            <img
              src="../imagenes/administracion(1).png"
              id="avatar-image"
              alt="Avatar Image"
            />
          </div>
          <div id="tituloLogin">
            <p>Iniciar Sesión</p>
          </div>

          <div class="info">
            <label for="username">Usuario</label>
            <input type="text" v-model="email" placeholder="Ingrese el usuario" />
            <label for="password">clave</label>
            <input
              type="password"
              v-model="password"
              placeholder="Ingrese la contraseña"
            />
          </div>

          <div class="AlertaLogin error" v-if="alert===true">
            <div class="icon-editt">{{ errores }}</div>
          </div>
          
          <div class="button-container">
            <router-link :to="ruta" @click="inicioAdmin()" id="boton">
              <q-spinner
                color="white"
                size="3em"
                :thickness="10"
                v-if="useAdmin.loading == true"
              />
              <q-btn label="Continuar" id="btn" v-else />
            </router-link>
          </div>
        </div>
      </q-col>
    </q-row>
  </q-layout>
</template>

<style>
/* Estilos generales */
.login-box {
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  background: #131a40;
  color: #ffffff;
  box-sizing: border-box;
  padding: 5% 3%;
  border-radius: 5px;
  box-shadow: 1px 1px 10px 4px rgba(0, 0, 0, 0.3);
  margin-top: 3%;
}


#avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 20%;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: -7%;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 5%;
}

#avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

#tituloLogin {
  text-align: center;
  margin-top: 15px;
}

#tituloLogin p {
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;
}

.info {
  margin-top: 20px;
}

.info label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.info input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: transparent;
  color: #ffffff;
  border-radius: 10px ;
  font-size: 16px;
  border: 2px solid transparent;
  border-bottom: 1px solid white;
}

.info input:hover{
  cursor: pointer;
}

.info input:focus{
  font-weight: 600;
  border: white solid;


}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

#btn {
  background-color: #d68d0f;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

#btn:hover {
  background-color: #ec9b0f;
  box-shadow: 1px 1px 10px 4px rgba(255, 239, 215, 0.607);
}

.AlertaLogin {
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  background-color: #ca4f46cc;
  color: #f7d3d3;
  border: solid 2px #f78880;
  text-transform: capitalize;
  font-weight: 800;
}

.icon-editt {
  display: inline-block;
  font-size: 15px;
}
.icon-editt::before {
    padding-right: 5px;
    content: "\f06a"; 
    font-family: "Font Awesome 5 Free"; 
    font-size: 18px;
  }

/* Estilos para pantallas más pequeñas */
@media (max-width: 768px) {
  .login-box {
    width: 90%;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .avatar-image {
    width: 50px;
    height: 50px;
  }
}

</style>
