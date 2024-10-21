<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore';

const router = useRouter();

const userStore = useUserStore();
const email = ref('');
const password = ref('');
const loginError = ref(false);

const handleLogin = async () => {
  const success = await userStore.login(email.value, password.value);
  success ? router.push('/my-cart') : loginError.value = !success;
};
</script>

<template>
  <div class="container">
    <h1>Prijavi se na svoj nalog</h1>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email" :class="{ focused: email }">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="input-group">
        <label for="password" :class="{ focused: password }">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit" class="black-button hover-cursor">Prijavi se na nalog</button>   
    </form>
    <p v-if="loginError" class="warning-message">Prijavljivanje nije uspelo. Molimo pokušajte ponovo..</p>
  </div>
</template>


<style lang="scss" scoped>
.container {
  height: 70rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

form {
  width: 420px;
}

.input-group {
  position: relative;
  margin-bottom: 2rem;

  label {
    position: absolute;
    left: 10px;
    bottom: 10px;
    color: #757575;
    transition: 0.2s ease all;
    pointer-events: none;

    &.focused {
      bottom: 30px;
      font-size: 12px;
      color: black;
    }
  }

  input {
    border: none;
    border-bottom: 1px solid #757575;
    outline: none;
    width: 100%;
    padding: 10px 0;

    &:focus {
      border-bottom: 1px solid black;
    }
  }
}

button {
  margin-top: 1rem;
}
</style>
