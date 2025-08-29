<template>
  <div class="page">
    <Title />
    <Counter />
  </div>
</template>

<script setup>
import Counter from '@/components/Counter.vue'
import Title from '@/components/Title.vue'
import { useGlobalStore } from '@/stores/global';
import { onMounted } from 'vue';

const globalStore = useGlobalStore();
globalStore.loading = true;

onMounted(() => {
  setTimeout(() => {
    globalStore.loading = false;
  }, 1000);
});


</script>

<style scoped>
.page {
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center;
    gap: 24px;
}
@media (max-width: 780px) {
  .page {
    gap: 48px;
  }
}
</style>
