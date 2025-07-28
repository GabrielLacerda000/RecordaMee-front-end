<script setup lang="ts">
import { ExpenseRepository } from '~/repositories/expense/ExpenseRepository';
import { useExpenseStore } from '~/store/useExpenseStore';

const expenseStore = useExpenseStore();

await ExpenseRepository.getUpcomingExpenses();

const upcomingExpenses = computed(() => expenseStore.upcomingExpenses);
</script>

<template>
  <div>
    <div v-for="expense in upcomingExpenses" :key="expense.id">
      <CardExpenseCard
        v-if="expense && expense.name && expense.category && expense.category.name"
        :id="expense.id"
        :name="expense.name"
        :createdAt="expense.created_at"
        :value="expense.amount"
        :dueDate="expense.due_date"
        :category="expense.category.name"
        :paid="!!expense.payment_date"
        :status="expense.status"
        :show-actions="false"
      />
    </div>
  </div>
</template>
