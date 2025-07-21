<script setup lang="ts">
import { AuthRepository } from '~/repositories/authRepository';
</script>

<template>
  <aside class="w-64 bg-green-primary p-4 border-r border-gray-200">
    <ButtonsOptionBtn icon="ic:baseline-log-out" text="Sair" @click="AuthRepository.logout" />
  </aside>
</template>
