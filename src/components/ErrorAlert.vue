<template>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Ocurrió un error!</strong> 
        {{error}}
        <button type="button" 
        class="btn-close" 
        data-bs-dismiss="alert" 
        @click="error=null"
        aria-label="Close"></button>
    </div>
</template>

<script>
import { inject } from 'vue-demi'
export default {
    name: 'ErrorAlert', 
setup(){
    const error = inject('error')
    return {error}
    }
}
</script>

<style>

</style>