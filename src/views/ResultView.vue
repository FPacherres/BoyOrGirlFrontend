<template>
  <div class="result" :style="`background-color: var(${screenColor});`">
    <h1 v-if="genero">{{ genero }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore();

const genero = ref(null)

onMounted(() => {
  globalStore.loading = false;
  const evtSource = new EventSource('faint-merrile-fabdev-6e8e60db.koyeb.app/eventos')
  evtSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    genero.value = data.genero
  }
});

const screenColor = computed(() => {
  const genders = {
    "niña": "--bg-girl",
    "niño": "--bg-boy",
  };
  const result = genders?.[genero.value] || "--bg-linear";
  return result;
});
</script>

<style scoped>
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  width: 100vw;
  height: 100vh;
}
.result h1 {
  font-size: var(--font-size-1);
  font-family: var(--font-luckiest-guy);
  font-weight: 500;
  color: var(--text-main);
  text-transform: uppercase;
  color: var(--text-white);
  transform: scale(2);
}
</style>
