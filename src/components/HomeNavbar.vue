<template>
  <nav class="navbar navbar-dark bg-dark">
      <div class="container">
          <router-link class="navbar-brand" to="/">
          <img v-if="isAuthenticated" :src="user?.photoURL" alt="photo" class="imgUser">
          {{userName}}
          </router-link>
          <div>
              <button v-if="!isAuthenticated" @click="signIn" class="btn btn-primary ">Acceder</button>
              <div v-if="isAuthenticated">
                <router-link to='/crud' class="btn btn-secondary mx-1"> CRUD </router-link>
                <router-link to='/perfil' class="btn btn-secondary mx-1"> Perfil </router-link>
                <button @click="signOut" class="btn btn-danger mx-1">Salir</button>
              </div>  
          </div>
      </div>
  </nav>
</template>

<script>

import {useUser} from '../composables/useUser'
import {useAuth} from '@vueuse/firebase' 
import { computed } from 'vue-demi'

export default {
    setup(){
        const {signIn, signOut} = useUser()
        const {user, isAuthenticated} = useAuth()

        const userName = computed(() => {
            return isAuthenticated.value ? user.value.displayName : "Bienvenido" 
        })
            
        return {signIn, signOut, user, isAuthenticated, userName}
    }
}
</script>

<style scoped>

.imgUser{
    width: 30px;
    margin-right: 10px;
    border-radius: 50px;
}
    .navbar{
        min-height: 60px;
    }

</style>