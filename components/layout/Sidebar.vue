<script setup lang="ts">
import { AuthRepository } from '~/repositories/authRepository';


</script>

<template>
  <aside class="w-64 bg-gray-100 p-4">
    <ButtonsOptionBtn icon="ic:baseline-log-out" text="Sair" @click="AuthRepository.logout" />
  </aside>
</template>
