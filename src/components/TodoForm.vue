<template>
  <form @submit.prevent='procesarForm'>
        <input type="text" 
        placeholder="Enter para agregar ToDo" 
        class="form-control"
        v-model.trim="texto"
        :disabled="adding">
  </form>
</template>

<script>
import { inject, ref } from 'vue-demi'
import { useDb } from '../composables/useDb'
export default {
    setup(){

        const {agregarTodo, adding} = useDb()
        const texto = ref('')
        const todos = inject('todos')
        const error = inject('error')

        const procesarForm = async() =>{
            if(texto.value === '') { 
                console.log('Texto Vacío')
                return} 
               
            const todo = await agregarTodo(texto.value)
            todos.value = [...todos.value, todo]
            texto.value = ''

        }

        return { texto, procesarForm, error, adding}
    }

}
</script>

<style scoped>


input{
    margin-bottom: 20px;
    border-radius: 10px;
    height: 55px;
    border-radius: 10px;   
    border: 0px;
    padding-left: 40px !important;
}

</style>