<template>
  <div class="app">
    <router-view />
    <Loading />
  </div>
</template>

<script setup>
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { watch } from 'vue';
import Loading from '@/components/Loading.vue';

const route = useRoute()

const updateBodyClass = (path) => {
  document.body.className = '';
  if (path === '/') {
    document.body.classList.add('bg-page-home')
  } else if (path === '/resultado') {
    
  } else if (path === '/registrar') {
    document.body.classList.add('bg-page-register')
  } else if (path === '/fecha-objetivo') {
    document.body.classList.add('bg-page-date')
  }
}

// Detectar ruta inicial
updateBodyClass(route.path)

// Detectar cambios de ruta
watch(() => route.path, (newPath) => {
  updateBodyClass(newPath)
})
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
