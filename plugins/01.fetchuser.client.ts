
import { AuthRepository } from '~/repositories/authRepository'
import { useAuthStore } from '~/store/useAuthStore'

export default defineNuxtPlugin(async () => {
  const token = useCookie('auth_token').value
  const auth = useAuthStore()

  if (token && !auth.user) {
    try {
      await AuthRepository.fetchUser()
      
    } catch (e) {
      console.error('Erro ao restaurar autenticação:', e)
      useCookie('auth_token').value = null
    }
  }
})
