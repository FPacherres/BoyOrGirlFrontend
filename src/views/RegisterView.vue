<!-- src/views/Registro.vue -->
<template>
  <div class="register">
    <h1>Seleccione el género</h1>
    <div class="register__confirm" v-if="confirm">
      <p>Estas seguro de registrar este género?</p>
      <div class="register__confirm-buttons">
        <button :class="gender === 'niño' ? 'boy' : 'girl'" @click="save(gender)">
          <span v-text="`Si, el bebé es ${gender}!`"></span>
        </button>  
        <button class="not" @click="cancel">
          <span v-text="'Opps! regresar'"></span>
        </button> 
      </div> 
    </div>
    <div class="register__form" v-else>
      <button @click="register('niño')" class="boy">
        <span>Niño</span>
      </button>
      <button @click="register('niña')" class="girl">
        <span>Niña</span>
      </button>
    </div>
    <div class="register__texts">
      <p v-if="message" class="register__texts-message">{{ message }}</p>
      <p v-if="error" class="register__error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from '@/stores/global';
import { useRouter } from 'vue-router';

const globalStore = useGlobalStore();
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    globalStore.loading = false;
  }, 1000);
});

const message = ref("");
const error = ref("");
const confirm = ref(false);
const gender = ref("");

const register = (genero) => {
  gender.value = genero;
  confirm.value = true;
  message.value = "";
  error.value = "";
}

const cancel = () => {
  confirm.value = false;  
  gender.value = "";
  message.value = "";
  error.value = "";
}

const save = async (genero) => {
  message.value = "";
  error.value = "";
  let success = false;

  try {
    globalStore.loading = true;
    const res = await fetch("https://boyorgirlbackend.onrender.com/registrar-genero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genero }),
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.message;
      success = false;
    } else {
      message.value = data.message;
      success = true;
    }
  } catch (err) {
    error.value = "Error de conexión";
  } finally {
    setTimeout(() => {
      if (success) {
        router.push('/')
      } else {
        confirm.value = false
      }
      globalStore.loading = false;
    }, 1000);
  }
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  width: 100vw;
  height: 100vh;
}
.register h1 {
  font-size: var(--font-size-3);
  font-family: var(--font-rubik);
  margin-bottom: 16px;
  font-weight: 500;
  color: var(--text-main);
}
.register__confirm {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.register__confirm p {
  font-size: var(--font-size-4);
  font-family: var(--font-rubik);
  color: var(--text-main);
  margin-bottom: 20px;
}
.register__confirm-buttons {
  display: flex;
  gap: 16px;  
}
.register__confirm-buttons button {
  width: 300px;
  height: 50px;
  border-radius: var(--radius-2);
  color: var(--text-white);
  font-size: var(--font-size-4);
}
.register__confirm-buttons button.not {
  background-color: var(--text-main);
}
.register__confirm-buttons button.boy {
  background-color: var(--bg-boy);
}
.register__confirm-buttons button.girl {
  background-color: var(--bg-girl);
}
.register__form {
  height: 200px;
  display: flex;
  gap: 0px;  
}
.register__form button {
  width: 300px;
  height: 200px;
  border-radius: var(--radius-2);
  color: var(--text-white);
  font-size: var(--font-size-2);
  transform: scale(0.9);
  transition: transform 0.2s ease-in-out;
}
.register__form button:hover {
  transform: scale(1);
  box-shadow: var(--shadow-1);
}
.register__form button.boy {
  background: var(--bg-boy);
}
.register__form button.girl {
  background: var(--bg-girl);
}
.register__texts {
  height: 18px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.register__texts p {
  margin: 0px;
  font-size: var(--font-size-5);
  font-family: var(--font-rubik);
}
.register__texts p.register__texts-message {
  color: var(--text-main);
}
.register__texts p.register__error {
  color: var(--text-error);
}
p {
  text-align: center;
}

@media (max-width: 780px) {
  .register__form {
    flex-direction: column;
    height: 400px;
  }
  .register__confirm-buttons {
    flex-direction: column;
  }
}
</style>
