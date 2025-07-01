import { useAuthStore } from "~/store/useAuthStore"

export default defineNuxtRouteMiddleware(() => {

  const auth = useAuthStore()

  if (!auth.isLoggedIn) {
    console.log('Usuário não logado')
    return navigateTo('/login', {replace: true})
  }
  
})