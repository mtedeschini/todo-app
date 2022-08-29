<template>
      <router-view/>
      <p class="copy">Created by Matias Tedeschini</p>
</template>

<script>
import { onMounted, ref } from 'vue-demi';
import {firebase} from './firebase'

export default {

  setup() {
    const loading = ref(false);

    onMounted(async () => {
      loading.value = true
      await firebase.getCurrentUser()
      loading.value = false
    })
    
    return {loading}
  },
}
</script>

<style >

@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500&display=swap');

*{
  font-family: 'Quicksand', sans-serif;
}

html{
      background-color: #f4f4f4;
}

.copy{
  position: absolute;
  bottom: 0px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  color: grey;
}



</style>