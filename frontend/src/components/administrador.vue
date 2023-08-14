<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card login-container">
            <div class="card-body">
              <div class="profile-image">
                <img src="../imagenes/perfil.png" alt="Imagen de perfil">
              </div>
              <h3 class="text-center mb-2">Iniciar sesión Administrador</h3>
              <form>
                <div class="mb-3">
                  <label for="username" class="form-label ">Usuario</label>
                  <input type="text" v-model="usuario" class="form-control" required placeholder="User">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input type="password" v-model="clave" class="form-control" required placeholder="Password">
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-info" >
                    <router-link :to="ruta" @click="inicioAdmin()" >Iniciar sesión</router-link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </template>
  <script setup>
  import {ref} from 'vue'
  import { useRouter } from 'vue-router';
  import {useAdminStore} from "../stores/administrador.js"
  
  const useAdmin=useAdminStore()
  
  const router = useRouter();
  let ruta = ref("")
  let usuario=ref('')
  let clave =ref('')
  let array = [
    { usuario : "juanvega", clave : "123"}
  ]
  
  function inicioAdmin() {
    console.log("entre");
    for (let i = 0; i < array.length; i++) {
      if (array[i].usuario ===usuario.value && array[i].clave=== clave.value) {
        console.log("user is correct");
        ruta.value="/inicio"
        router.push(ruta.value);
  
      }
      else{
        console.log("user invalid");
      }
      
    }
    
  }
  
  </script>
  
  
    <style>
      .login-container {
        max-width: 400px;
        margin: 0 auto;
        margin-top: 100px;
      }
  
      .profile-image {
        display: flex;
        justify-content: center;
        margin-top: -50px;
      }
  
      .profile-image img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
      }
    </style>