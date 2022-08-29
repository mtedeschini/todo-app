<template>
<div class="logout" @click="signOut">
   <i  class="fa-solid fa-arrow-right-from-bracket"></i>
</div>
  <div class="content">
    <div class="cont col-md-8 col-sm-10 col-xl-7 col-10">
      <div v-if="isAuthenticated" class="col-md-8 col-sm-10 col-xl-7  col-10">
        <h2 class="mt-4">TODO</h2>
        <SpinnerWait v-if="loading"/>
        <div v-else class="list">
          <TodoForm />
          <div class="nothing" v-if="todos.length === 0">
            <p> ¡Sin nada que hacer!  </p>
          </div>
          <div class="lista" v-else>
            <TodoItem 
              :key="todo.id"
              :todo='todo'
              :orden='index' 
              v-for="(todo, index) in todos.slice().reverse()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useAuth} from '@vueuse/firebase'
import {useDb} from '../composables/useDb'
import SpinnerWait from '../components/SpinnerWait'
import TodoItem from '../components/TodoItem.vue'
import { computed, onMounted, provide, ref } from 'vue-demi'
import TodoForm from '../components/TodoForm.vue'
import {useUser} from '../composables/useUser'


export default {
components: { SpinnerWait, TodoForm, TodoItem },
setup(){
  
  const {signOut} = useUser()
  const {isAuthenticated} = useAuth()
  const {getTodos, loading} = useDb()
  const todos = ref([])
  const error = ref(null)

  provide('error', error)
  provide('todos', todos)

  const showError = computed(()=>{
    error.value ? true : false
  })

  onMounted(async() =>{
    todos.value = await getTodos()
    todos.value.res && (error.value = todos.value.error)
  })

  return { isAuthenticated, todos, loading, showError, error, signOut }

}
}
</script>

<style>

h2{
  padding-bottom: 50px;
  letter-spacing: 12px;
  font-weight: bold;
  align-items: left;
  color: #ffffff;
}


.content{
  background-image: linear-gradient(to right, rgba(209, 32, 94, 0.655), rgba(113, 56, 199, 0.73)),
  url('../assets/background.jpeg');
  background-color: #cccccc;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  display: flex;
  height: 500px;
}

.lista{
  background-color: rgba(255, 255, 255, 0);
  -webkit-box-shadow: 0px 7px 22px 6px rgba(255,255,255,0.72); 
  box-shadow: 0px 7px 22px 3px rgba(73, 73, 73, 0.201);
  border-radius: 0px 0px 10px 10px; 

}

.item:first-of-type{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.item:last-of-type{
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.cont{
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0;
  margin: 150px 0 0 0 ;
}

.logout{
  position: absolute;
  top: 15px;
  right: 30px;
  font-size: 20px;
}

.logout:hover{
  cursor: pointer;
}

.fa-arrow-right-from-bracket{
  color: white;
}


.nothing{
  color: white;
  height: 80px;
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.nothing p{
  margin: 0px
}


</style>