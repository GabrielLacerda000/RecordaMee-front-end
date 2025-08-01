<script setup lang="ts">
import { AuthRepository, type LoginForm } from '~/repositories/authRepository'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

useSeoMeta({
    title: 'Entrar | RecordaMe',
    description: 'Login page for RecordaMe application',
})

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
})

// const form = ref<LoginForm>({
//   email: 'test@example.com',
//   password: 'password',
// })

const schema = z.object({
  email: z.email('Insira um email válido'),
  password: z.string().min(8, 'a senha deve conter pelo menos 8 caracteres'),
})

type Schema = z.output<typeof schema>

const form = reactive<Partial<Schema>>({
  email: 'test@example.com',
  password: 'password'
})

const toast = useToast()

const handleLogin = async (event: FormSubmitEvent<Schema>) => {
  try {
    await AuthRepository.login(event.data)
    toast.add({
      title: 'Login realizado com sucesso!',
    })

  } catch (error) {

    toast.add({
      title: 'Erro ao entrar',
      description: 'Ocorreu um erro ao tentar entrar. Verifique suas credenciais e tente novamente.',
      color: 'error'
    })
    console.error('Login failed:', error);
  }
}

</script>

<template>
  <div class="bg-green-secondary min-h-screen flex items-center justify-center">
    <div class=" p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-8 text-[#F5F5F5]">RecordaMe</h1>

      <UForm :schema="schema" :state="form" @submit="handleLogin">
        <UFormField label="Email" name="email">
          <UInput 
            id="email"
            v-model="form.email"
            type="email"
            class="w-full py-2 px-3"
            placeholder="Digite seu email"
          />
        </UFormField>

        <UFormField label="Senha" name="password">
          <UInput 
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Digite sua senha"
            class="w-full py-2 px-3"
          />
        </UFormField>

        <div class="flex items-center justify-between mb-6">
          <LinksLinkBtn text="Esqueceu a senha?" />
        </div>

        <ButtonsBtn text="Entrar" type="submit" />

        <div class="text-center mt-4">
            <NuxtLink to="/register" class="text-sm text-blue-400 hover:underline">
                Não tem uma conta? Crie uma
            </NuxtLink>
        </div>
      </UForm>
    </div>
  </div>
</template>
