<script setup lang="ts">
import FormGroup from '@/components/Form/FormGroup.vue'

useSeoMeta({
    title: 'Entrar | RecordaMe',
    description: 'Login page for RecordaMe application',
})

const email = ref('');
const password = ref('');
</script>

<template>
  <div class="bg-[#F5F5F5] min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-8">RecordaMe</h1>
      <form @submit.prevent="">

        <FormGroup label="Email">
          <FormInput
            id="email"
            v-model="email"
            type="email"
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite seu email"
          />
        </FormGroup>

        <FormGroup label="Senha">
          <FormInput
            id="password"
            v-model="password"
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
