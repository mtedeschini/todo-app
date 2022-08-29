import { ref } from 'vue'
import {database, marcaTiempo} from '../firebase'
import { useAuth } from '@vueuse/firebase';

export const useDb = () => {
    
    const referencia = database.collection('todos');
    const loading = ref(false)
    const adding = ref(false)
    const {user} = useAuth()


    const getTodos = async () => {
        try {
            loading.value = true
            const res = await referencia
            .where('uid', '==', user.value.uid)
            .get()
            return res.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

        } catch (error) {
            return{
                error,
                res: true
            }
        } finally { 
            loading.value = false
        }

    }

    const agregarTodo = async (texto) =>{
        try {
            adding.value = true
            const todo = {
                texto: texto,
                fecha: marcaTiempo(),
                estado: false,
                uid: user.value.uid
            }
            const res = await referencia.add(todo)
            
            return{
                id: res.id,
                ...todo
            }
        } catch (error) {
            return{
                error,
                res: true
            }
        } finally { 
            adding.value = false
        }
    }

    const eliminarTodo = async(id)=>{
        try {
            await referencia.doc(id).delete()
            return{
                res: false
            }
            
        } catch (error) {
            return{
                error,
                res: true
            }
        }
    }

    const modificarTodo = async(todo) =>{
        try {
            await referencia.doc(todo.id).update({
                estado: !todo.estado,
            })

            return {
                res: false
            }
        } catch (error) {
            return{
                error,
                res: true
            }
        }
    }
 
    return { getTodos, loading, agregarTodo, eliminarTodo, adding, modificarTodo }
}
