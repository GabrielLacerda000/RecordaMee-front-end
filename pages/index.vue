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
  <div class="p-4">
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