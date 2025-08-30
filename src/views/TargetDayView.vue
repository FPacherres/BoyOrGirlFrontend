<template>
  <div class="date">
    <h1>Establecer Fecha Objetivo</h1>
    <input type="datetime-local" v-model="fecha" />
    <button @click="guardar">
      Guardar
    </button>
    <p v-if="mensaje">{{ mensaje }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore();


onMounted(() => {
  globalStore.loading = false;
});

const fecha = ref('')
const mensaje = ref('')
const error = ref('')

const guardar = async () => {
  mensaje.value = ''
  error.value = ''

  try {
    if (!fecha.value) {
      error.value = 'Selecciona una fecha válida'
      return
    }

    const fechaISO = new Date(fecha.value).toISOString()

    const res = await fetch('faint-merrile-fabdev-6e8e60db.koyeb.app/fecha-objetivo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fecha: fechaISO }),
    })

    const data = await res.json()
    if (!res.ok) {
      error.value = data.mensaje || 'Error al guardar'
    } else {
      mensaje.value = data.mensaje
    }
  } catch (err) {
    error.value = 'Error de conexión'
  }
}
</script>

<style scoped>
.date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  width: 100vw;
  height: 100vh;
}
.date h1 {
  font-size: var(--font-size-3);
  font-family: var(--font-rubik);
  margin-bottom: 16px;
  font-weight: 500;
  color: var(--text-main);
}
.date button {
  background-color: var(--bg-neutral);
  height: 40px;
  width: 350px;
  border-radius: var(--radius-1);
  color: var(--text-white);
  font-weight: 500;
  font-size: var(--font-size-5);
  text-transform: uppercase;
}
</style>