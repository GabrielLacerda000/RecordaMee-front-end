<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ExpenseRepository } from '~/repositories/expense/ExpenseRepository';
import type { Summary } from '~/types/expense/Sumary';

const summary = ref<Summary | null>(null);

try {
  const fetchedSummary = await ExpenseRepository.getSummary();
  summary.value = fetchedSummary || null;
} catch (error) {
  console.error('Error ao buscar o sumario:', error);
  summary.value = null;
}
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
</script>

<template>
  <header class="bg-[#01C38D] p-4 flex justify-between items-center">
    <div class="flex space-x-4 flex-grow justify-center">
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