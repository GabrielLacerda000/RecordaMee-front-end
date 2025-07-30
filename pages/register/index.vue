<script setup lang="ts">
import { AuthRepository, type RegisterForm } from '~/repositories/authRepository';

useSeoMeta({
    title: 'Crie sua conta | RecordaMe',
    description: 'Crie sua conta no RecordaMe',
})

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
})

const form = ref<RegisterForm>({
    name: '',
    email: '',
    password: ''
})

const loading = ref(false)

const onSubmit = async () => {
    loading.value = true
    try {
        await AuthRepository.register(form.value)
    } catch (error) {
        console.error('Erro ao criar conta:', error)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full px-6 py-8 bg-gray-800 rounded-lg shadow-md">
            <h2 class="text-3xl font-bold text-center text-white">Crie sua conta</h2>
            <p class="text-center text-gray-400 mt-2">Crie sua conta para começar a usar o RecordaMe</p>

            <form @submit.prevent="onSubmit" class="mt-8 space-y-6">
                <FormGroup label="Nome">
                    <Input v-model="form.name" type="text" placeholder="Seu nome" />
                </FormGroup>

                <FormGroup label="Email">
                    <Input v-model="form.email" type="email" placeholder="seuemail@email.com" />
                </FormGroup>

                <FormGroup label="Senha">
                    <Input v-model="form.password" type="password" placeholder="Sua senha" />
                </FormGroup>

                <ButtonsBtn :loading="loading" type="submit" text="Criar conta" />

                <div class="text-center mt-4">
                    <NuxtLink to="/login" class="text-sm text-blue-400 hover:underline">
                        Já tem uma conta? Faça login
                    </NuxtLink>
                </div>
            </form>
        </div>
    </div>
</template>