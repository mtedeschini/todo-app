<template>

        <div
            @mouseover="hover = true"
            @mouseleave="hover = false"
            :class="'item '+ todo.estado" @click="editar(todo)">
            <h5 >{{todo.texto}}</h5>
                <div class="icons" v-if="todo.estado">
                    <i v-if="!hover" class="fa-solid fa-check"> </i>
                    <i v-else @click="eliminar(todo.id)" class="fa-solid fa-xmark"></i>
                </div>
                <button class="icons"  v-else @click="eliminar(todo.id)" :disabled='bloquear'><i class="fa-solid fa-xmark"></i></button>
        </div>
</template>

<script>
import { computed, inject, ref } from 'vue';
import {useDb} from '../composables/useDb'
export default {
    props: {
        todo: {
            type: Object,
        },
        orden: Number,
    },

    setup(props){

        const hover = ref(false)
        const {eliminarTodo, modificarTodo} = useDb()
        const error = inject('error')
        const todos = inject('todos')
        const bloquear = ref(false)
        const boton = computed(()=>{
            let done = {
                color: 'warning',
                text: 'Finalizar'
            }            
            let pending = {
                color: 'secondary',
                text: 'Reanudar'
            }
            return !props.todo.estado ? done : pending
        })

        const editar = async(todo) =>{
            bloquear.value = true
            const respuesta = await modificarTodo(todo)

            if (respuesta.res){
                bloquear.value = false
                error.value = respuesta.error
                return
            }

            todos.value = todos.value.map(item =>(
                item.id === todo.id ? {...item, estado: !todo.estado} : item
            ))

            bloquear.value = false

        }

        const eliminar = async(id) =>{
            bloquear.value = true
            const respuesta = await eliminarTodo(id)
    
            if (respuesta.res){
                bloquear.value = false
                error.value = respuesta.error
                return
            }
            todos.value = todos.value.filter((item) => item.id !== id)
            bloquear.value = false
        }
        
        const formato = computed(()=>{
            return !props.todo.estado ? "Activo" : "Finalizado"
        })
        
        return {eliminar, formato, bloquear, editar, boton, hover}
    }

}
</script>

<style>

.item{
    cursor:pointer;
    border-bottom: 1px rgb(209, 209, 209) solid;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    align-items: center;
    background-color: white;

}

.item:hover{
    background-color: rgb(220, 220, 220);
}

.item:hover button{
    display: inline;
}

button:hover{
    font-weight: bold;
}

button{
    display: none;
    background-color: rgba(255, 255, 255, 0);
    border: none
}

.icons{
        padding-right: 0px;

}

.fa-check{
    padding-right: 25px
}
.fa-xmark{
    padding-right: 25px
}

h5{
    padding-left: 35px;
    margin: 0;
    font-size: 18px;
}

i{
    color: grey;
}

i:hover{
    color: black;
}

.true{
  background-image: repeating-linear-gradient(-45deg,
      transparent,
      transparent 2px,
      rgb(209, 209, 209) 2px,
      rgb(209, 209, 209) 4px);
      color: grey;
      text-decoration: line-through;
}
.truetitle{
    text-decoration: line-through;
    color: grey;
}

</style>