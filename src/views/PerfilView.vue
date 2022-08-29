<template>
    <div class="col-12 col-md-8 ">
      <pre v-if="isAuthenticated">{{user}}</pre>
    </div>
</template>

<script>
import {useAuth} from '@vueuse/firebase'
export default {
    setup(){
        const {user, isAuthenticated} = useAuth()

        return {user, isAuthenticated}
    }
}
</script>

<style>

</style>