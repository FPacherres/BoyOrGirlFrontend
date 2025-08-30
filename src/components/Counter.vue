<template>
  <div class="counter">
    <div class="counter__container" v-for="(item, index) in counter" :key="index">
      <div class="counter__container-box">
        <span v-text="item.value"></span>
      </div>
      <span class="counter__container-label" v-text="item.label"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const dias = ref(0);
const horas = ref(0);
const minutos = ref(0);
const segundos = ref(0);

const counter = computed(() => {
  return [
    { label: 'Días', value: dias.value },
    { label: 'Horas', value: horas.value },
    { label: 'Minutos', value: minutos.value },
    { label: 'Segundos', value: segundos }
  ]
});

let intervalo = null

const calcularDiferencia = (fechaObjetivo) => {
  const ahora = new Date()
  const diferencia = new Date(fechaObjetivo) - ahora

  if (diferencia <= 0) {
    return null
  }

  const d = Math.floor(diferencia / (1000 * 60 * 60 * 24))
  const h = Math.floor((diferencia / (1000 * 60 * 60)) % 24)
  const m = Math.floor((diferencia / (1000 * 60)) % 60)
  const s = Math.floor((diferencia / 1000) % 60)

  return { d, h, m, s }
}

onMounted(async () => {
  const res = await axios.get('https://boyorgirlbackend.onrender.com/fecha-objetivo')
  const fechaObjetivo = res.data.fecha

  intervalo = setInterval(() => {
    const diferencia = calcularDiferencia(fechaObjetivo)

    if (!diferencia) {
      clearInterval(intervalo)
      router.push('/resultado') // Redirección al finalizar
      return
    }

    dias.value = diferencia.d
    horas.value = diferencia.h
    minutos.value = diferencia.m
    segundos.value = diferencia.s
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalo)
})
</script>

<style scoped>
.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-family: var(--font-rubik);
}
.counter__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.counter__container-box {
  width: 80px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: var(--bg-linear-second);
  background: var(--bg-linear-gradient-second);
}
.counter__container-box span {
  font-size: var(--font-size-2);
  font-weight: 700;
  color: var(--text-main);
}
.counter__container-label {
  margin-top: 10px;
  font-size: var(--font-size-5);
  color: var(--text-main);
  font-family: var(--font-rubik);
  text-transform: uppercase;
}

@media (max-width: 780px) {
  .counter__container-box {
    width: 60px;
    height: 60px;
  }
  .counter__container-box span {
    font-size: var(--font-size-3);
  }
  .counter__container-label {
    font-size: var(--font-size-6);
  }
}
</style>