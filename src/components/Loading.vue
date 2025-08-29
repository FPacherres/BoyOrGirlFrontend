<template>
    <div class="loading">
        <div class="loading__box">
            <div class="loading__box-load loading__box-boy"></div>
            <div class="loading__box-load loading__box-girl"></div>
        </div>
    </div>
</template>

<script setup>
import { useGlobalStore } from '@/stores/global';
const globalStore = useGlobalStore();

</script>

<style scoped>
.loading {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size-4);
    color: var(--text-main);
    background-color: var(--text-white);
    position: absolute;
    z-index: 999;
    top: 0;
    transform: scale(v-bind("globalStore.loading ? 1 : 0"));
    opacity: v-bind("globalStore.loading ? 1 : 0");
    transition: 0.4s ease-in-out transform, 0.2s ease-in opacity;
}
.loading__box {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: spin 1s linear infinite;
}
.loading__box-load {
    width: 18px;
    height: 18px;
    border-radius: 50%;
}
.loading__box-boy {
    background-color: var(--bg-boy);
}
.loading__box-girl {
    background-color: var(--bg-girl);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>