<script setup lang="ts">
import { AuthRepository } from '~/repositories/authRepository'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

useSeoMeta({
    title: 'Crie sua conta | RecordaMe',
    description: 'Crie sua conta no RecordaMe',
})

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
})

const schema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.email('Insira um email válido'),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
})

type Schema = z.output<typeof schema>

const form = reactive<Partial<Schema>>({
  name: '',
  email: '',
  password: ''
})

const toast = useToast()

const handleRegister = async (event: FormSubmitEvent<Schema>) => {
  try {
    await AuthRepository.register(event.data)
    toast.add({
      title: 'Conta criada com sucesso!',
    })

  } catch (error) {
    toast.add({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      color: 'error'
    })
    console.error('Register failed:', error);
  }
}

</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full px-6 py-8 bg-gray-800 rounded-lg shadow-md">
            <h2 class="text-3xl font-bold text-center text-white">Crie sua conta</h2>
            <p class="text-center text-gray-400 mt-2">Crie sua conta para começar a usar o RecordaMe</p>

            <UForm :schema="schema" :state="form" @submit="handleRegister" class="mt-8 space-y-6">
                <UFormField label="Nome" name="name">
                    <Input v-model="form.name" type="text" placeholder="Seu nome" />
                </UFormField>

                <UFormField label="Email" name="email">
                    <Input v-model="form.email" type="email" placeholder="seuemail@email.com" />
                </UFormField>

                <UFormField label="Senha" name="password">
                    <Input v-model="form.password" type="password" placeholder="Sua senha" />
                </UFormField>

                <ButtonsBtn type="submit" text="Criar conta" />

                <div class="text-center mt-4">
                    <NuxtLink to="/login" class="text-sm text-blue-400 hover:underline">
                        Já tem uma conta? Faça login
                    </NuxtLink>
                </div>
            </UForm>
        </div>
    </div>
</template>