<script setup lang="ts">
import { AuthRepository } from '~/repositories/authRepository';
</script>

<template>
  <aside class="w-64 p-4 border-r border-[#2e2f2f]">
    <ButtonsOptionBtn icon="ic:baseline-log-out" text="Sair" @click="AuthRepository.logout" />
  </aside>
</template>
