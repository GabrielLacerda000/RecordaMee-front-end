import { useAuthStore } from "~/store/useAuthStore"

export default defineNuxtRouteMiddleware(() => {

  const auth = useAuthStore()

  if (!auth.isLoggedIn) {
    return navigateTo('/login', {replace: true})
  }
  
})