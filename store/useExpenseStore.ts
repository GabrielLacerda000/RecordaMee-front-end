import { defineStore } from 'pinia'
import type { Expense } from '~/types/expense/Expense'

export const useExpenseStore = defineStore('expense', () => {
    const expenses = ref<Expense[]>([])
    const expense = ref<Expense>()

   const addExpense = (newExpense: Expense) => expenses.value.push(newExpense)

   const setExpense = (newExpense: Expense) => expense.value = newExpense

   const setExpenses = (newExpenses: Expense[]) => expenses.value = newExpenses

  return {
    expenses,
    expense,
    addExpense,
    setExpenses,
    setExpense,
  }

})
