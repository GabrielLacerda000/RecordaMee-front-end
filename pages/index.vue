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

await Promise.all([
  ExpenseRepository.getExpenses(),
  ExpenseRepository.getUpcomingExpenses(),
])

const expenseStore = useExpenseStore();

const expenses = computed(() => expenseStore.expenses);
const upcomingExpenses = computed(() => expenseStore.upcomingExpenses);

const activeTab = ref('myExpenses');

const displayedExpenses = computed(() => {
  return activeTab.value === 'myExpenses' ? expenses.value : upcomingExpenses.value;
});

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

    <div class="flex gap-4 mx-4 mb-4">
      <ButtonsBtn
        text="Minhas despesas"
        @click="activeTab = 'myExpenses'"
        :variant="activeTab === 'myExpenses' ? 'primary' : 'secondary'"
      />
      <ButtonsBtn
        text="Próximas despesas"
        @click="activeTab = 'upcomingExpenses'"
        :variant="activeTab === 'upcomingExpenses' ? 'primary' : 'secondary'"
      />
    </div>

    <div v-for="expense in displayedExpenses" :key="expense.id">
      <CardExpenseCard 
        :id="expense.id"
        :name="expense.name"
        :createdAt="expense.created_at"
        :value="expense.amount"
        :dueDate="expense.due_date"
        :category="expense.category.name"
        :paid="!!expense.payment_date"
        :status="expense.status"
        :show-actions="activeTab === 'myExpenses'"
      />
    </div>
  </div>
</template>
