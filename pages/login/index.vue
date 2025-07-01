<script setup lang="ts">
import { AuthRepository, type LoginForm } from '~/repositories/authRepository'

useSeoMeta({
    title: 'Entrar | RecordaMe',
    description: 'Login page for RecordaMe application',
})

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
})

const form = ref<LoginForm>({
  email: 'test@example.com',
  password: 'password',
})

const handleLogin = async () => {
  try {
    await AuthRepository.login(form.value)

  } catch (error) {
    console.error('Login failed:', error);
  }
}

</script>

<template>
  <div class="bg-[#F5F5F5] min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-8">RecordaMe</h1>
      <form @submit.prevent="handleLogin">

        <FormGroup label="Email">
          <FormInput
            id="email"
            v-model="form.email"
            type="email"
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite seu email"
          />
        </FormGroup>

        <FormGroup label="Senha">
          <FormInput
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Digite sua senha"
          />
        </FormGroup>

        <div class="flex items-center justify-between mb-6">
          <LinksLinkBtn text="Esqueceu a senha?" />
        </div>

        <ButtonsBtn text="Entrar" type="submit" />
      </form>
    </div>
  </div>
</template>
