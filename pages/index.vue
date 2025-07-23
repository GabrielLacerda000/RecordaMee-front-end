<script setup lang="ts">
import { ExpenseRepository } from '~/repositories/expense/ExpenseRepository';
import { useExpenseStore } from '~/store/useExpenseStore';

useSeoMeta({
    title: 'Home | RecordaMe',
    description: 'Página inicial do aplicativo RecordaMe',
})

definePageMeta({
  middleware: ['auth']
})

await ExpenseRepository.getExpenses()

const expenseStore = useExpenseStore();

const expenses = computed(() => expenseStore.expenses);

</script>

<template> 
  <div>
    <div class="flex items-center justify-between mb-4 mx-4">
      <div>
        <h1 class="text-2xl font-bold text-white">RecordaMe</h1>
        <p class="text-md text-white">Suas despesas</p>
      </div>

      <div>
        <FormAddExpenseForm />
      </div>
    </div>
    <div v-for="expense in expenses" :key="expense.id">
      <CardExpenseCard 
        :id="expense.id"
        :name="expense.name"
        :createdAt="expense.created_at"
        :value="expense.amount"
        :dueDate="expense.due_date"
        :category="expense.category.name"
        :paid="!!expense.payment_date"
        :status="expense.status"
      />
    </div>
  </div>
</template>