import { defineStore } from 'pinia'
import type { User } from '~/types/user/User'

export const useAuthStore = defineStore('auth', () => {

  const user = ref<User | null>(null)

  const isLoggedIn = computed(() => !!user.value)

  const isLoading = ref(true)

  const setUser = (newUser: User | null) =>  {
    user.value = newUser
    isLoading.value = false
  }

  async function logout() {

    await useApi('/logout', { method: 'POST' })

    user.value = null

  }

  return {
    logout,
    setUser,
    user,
    isLoggedIn,
  }

})