<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ExpenseRepository } from '~/repositories/expense/ExpenseRepository';
import type { Summary } from '~/types/expense/Sumary';

const summary = ref<Summary | null>(null);

onMounted(async () => {
  summary.value = await ExpenseRepository.getSummary();
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
</script>

<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="flex space-x-4">
      <div>
        <span>Total de Despesas:</span>
        <span>{{ formatCurrency(summary?.total || 0) }}</span>
      </div>
      <div>
        <span>Total Pago:</span>
        <span>{{ formatCurrency(summary?.totalPaid || 0) }}</span>
      </div>
      <div>
        <span>Total Restante:</span>
        <span>{{ formatCurrency(summary?.totalPending || 0) }}</span>
      </div>
    </div>
    <InputsSearchInput />
  </header>
</template>