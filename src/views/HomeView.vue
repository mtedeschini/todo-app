<template>
  <div class="content"> 
     <div class="title">
    <h1>To-do List </h1>
    <button  @click="signIn">Acceder
      <div class="icon">
        <i class="fa-brands fa-google"></i>
      </div>
    </button>
  </div>
  </div>

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

button {
  width: 200px;
  letter-spacing: 3px;
  height: 50px;
  border: 0px;
  border-radius: 38px;
  background: #e0e0e0;     
  transition: 0.3s;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.icon{
  width: 30px;
  height: 30px;
  background-color: rgb(103, 103, 103);
  padding: 0px;
  border-radius: 20px;
  color: #e0e0e0;
  margin: 0px;
}

.fa-brands{
  margin-top: 7px;
  margin-left: 2px;
}

button:hover{
  box-shadow:  1px 1px 6px #b3b3b3,
             -1px -1px 6px #e0e0e0;
}

.title{
    height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e0e0e0;
    flex-direction: column;
}

h1{
    letter-spacing: 10px;
    text-decoration: none;
    position: relative;
    padding-bottom: 40px;
}

h1:after {
    content: '';
    width: 80%;
    position: absolute;
    left: 25px;
    bottom: 25px;
    border-width: 0 0 2px;
    border-style: solid;
    border-color: rgb(255, 0, 89);
}


.content{
  background-image: linear-gradient(to right, rgba(209, 32, 94, 0.655), rgba(113, 56, 199, 0.73)),
  url('../assets/background.jpeg');
  background-color: #cccccc;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>