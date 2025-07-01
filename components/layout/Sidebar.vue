<script setup lang="ts">
import OptionBtn from '../Buttons/OptionBtn.vue';
</script>

<template>
  <aside class="w-64 bg-gray-100 p-4">
    <ButtonsOptionBtn icon="uil:dashboard" text="Dashboard" />
    <OptionBtn icon="uil:bill" text="Despesas" />
    <OptionBtn icon="uil:chart-line" text="Relatórios" />
    <OptionBtn icon="uil:setting" text="Configurações" />
  </aside>
</template>
