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
  <header class="p-4 flex justify-between items-center">
    <div class="flex space-x-4 flex-grow justify-center">
      <div class="flex justify-between items-center p-3 rounded-lg bg-[#262626] shadow-md min-w-[250px]">
        <div class="flex flex-col text-white">
          <p class="text-md">Total de despesas:</p>
          <span class="text-xl font-bold">{{ formatCurrency(summary?.total || 0) }}</span>
        </div>

        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#1DFEAD] to-[#1DFE69] flex items-center justify-center">
          <Icon name="material-symbols:attach-money" class="text-black" size="2em" />
        </div>
      </div>
      
      <div class="flex justify-between items-center p-3 rounded-lg bg-[#262626] shadow-md min-w-[250px]">
        <div class="flex flex-col text-white">
          <p class="text-md">Total Pago:</p>
          <span class="text-xl font-bold">{{ formatCurrency(summary?.totalPaid || 0) }}</span>
        </div>
        <div class="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
          <Icon name="material-symbols:check" class="text-green-600" size="2em" />
        </div>
      </div>

      <div class="flex justify-between items-center p-3 rounded-lg bg-[#262626] shadow-md min-w-[250px]">
        <div class="flex flex-col text-white">
          <p class="text-md">Total Pendente:</p>
          <span class="text-xl font-bold">{{ formatCurrency(summary?.totalPending || 0) }}</span>
        </div>
        <div class="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center">
          <Icon name="material-symbols:calendar-today-outline" class="text-yellow-600" size="2em" />
        </div>
      </div>

      <div class="flex justify-between items-center p-3 rounded-lg bg-[#262626] shadow-md min-w-[250px]">
        <div class="flex flex-col text-white">
          <p class="text-md">Total Vencido:</p>
          <span class="text-xl font-bold">{{ formatCurrency(summary?.totalOverdue || 0) }}</span>
        </div>
        <div class="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center">
          <Icon name="tabler:calendar-clock" class="text-red-600" size="2em" />
        </div>
      </div>
    </div>
    <!-- <InputsSearchInput /> -->
  </header>
</template>