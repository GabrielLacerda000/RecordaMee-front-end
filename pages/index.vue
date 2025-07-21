<script setup lang="ts">
import { useExpenseStore } from '~/store/useExpenseStore';

useSeoMeta({
    title: 'Home | RecordaMe',
    description: 'Página inicial do aplicativo RecordaMe',
})

definePageMeta({
  middleware: ['auth']
})

const expenseStore = useExpenseStore();

const expenses = computed(() => expenseStore.expenses);
</script>

<template>
  <div class="border border-[#2e2f2f] rounded-xl p-4">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-2xl font-bold text-white">RecordaMe</h1>
        <p class="text-md text-white">Suas despesas</p>
      </div>

      <div>
        <ButtonsBtn text="Adicionar despesa" type="submit" icon="tabler:circle-plus"/>
      </div>
    </div>
    <div v-for="expense in expenses" :key="expense.id">
      <CardExpenseCard 
        :name="expense.name"
        :createdAt="expense.created_at"
        :value="expense.amount"
        :dueDate="expense.due_date"
        :category="expense.category.name"
        :paid="!!expense.payment_date"
      />
    </div>
  </div>
</template>