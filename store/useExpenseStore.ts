import { defineStore } from 'pinia'
import type { Expense } from '~/types/expense/Expense'

export const useExpenseStore = defineStore('expense', () => {
    const expenses = ref<Expense[]>([])
    const expense = ref<Expense>()
    const upcomingExpenses = ref<Expense[]>([])

   const addExpense = (newExpense: Expense) => expenses.value.push(newExpense)

   const setExpense = (newExpense: Expense) => expense.value = newExpense

   const setExpenses = (newExpenses: Expense[]) => expenses.value = newExpenses

   const setUpcomingExpenses = (newUpcomingExpenses: Expense[]) => upcomingExpenses.value = newUpcomingExpenses

   const removeExpense = (id: number) => {
    expenses.value = expenses.value.filter(expense => expense.id !== id)
   }

  return {
    expenses,
    expense,
    upcomingExpenses,
    addExpense,
    setExpenses,
    setExpense,
    removeExpense,
    setUpcomingExpenses
  }

})
