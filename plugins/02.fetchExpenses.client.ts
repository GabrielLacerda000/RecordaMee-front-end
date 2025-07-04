
import { AuthRepository } from '~/repositories/authRepository'
import { ExpenseRepository } from '~/repositories/expense/ExpenseRepository'
import { useAuthStore } from '~/store/useAuthStore'
import { useExpenseStore } from '~/store/useExpenseStore'

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()

  if (auth.user) {
    try {
      await ExpenseRepository.getExpenses()
    } catch (e) {
      console.error('Erro ao buscar despesas:', e)
    }
  }
})
