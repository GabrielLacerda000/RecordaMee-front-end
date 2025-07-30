import { useAuthStore } from "~/store/useAuthStore"
import type { ApiResponse, genericApiResponse } from "~/types/api/api"
import type { User } from "~/types/user/User"

export type LoginForm = {
    email: string
    password: string
}

export type RegisterForm = {
    name: string
    email: string
    password: string
}

export type LoginResponse = {
    user: User
    token: string
}

export type RegisterResponse = {
    message: string
}

export type UserRepsonse = {
    user: User
}

export const AuthRepository = {
    async register(form: RegisterForm) {
        try {
            const { data, error } = await usePost<ApiResponse<RegisterResponse>>('/register', { body: form })

            if (error.value) {
                throw new Error(error.value.message || 'Erro na requisição')
            }

            if (data.value?.status === 'error') {
                throw new Error(data.value.message || 'Erro na requisição')
            }

            const toast = useToast()

            toast.add({
                title: 'Sucesso',
                description: data.value?.message || 'Usuário cadastrado com sucesso!',
                color: 'success',
            })

            navigateTo('/login')
        } catch (error: any) {
            console.error('Erro ao cadastrar usuário:', error)

            catchRepositoryExceptions(error, 'Erro ao cadastrar usuário. Por favor, tente novamente.')
        }
    },

     async login(form: LoginForm) {
        
        try {
        const { data, error } = await usePost<ApiResponse<LoginResponse>>('/login', {body: form}) 

        if (error.value) {
            throw new Error(error.value.message || 'Erro na requisição')
        }

        if(data.value?.status === 'error') {
            throw new Error(data.value.message || 'Erro na requisição')
        }

        useCookie('auth_token', {
            maxAge: 60 * 60 * 24 * 7,
        }).value = data.value?.data?.token

        const userStore = useAuthStore()
        userStore.setUser(data.value?.data?.user || null)

        navigateTo('/')

        } catch (error: any) {
        console.error('Erro ao fazer login:', error)

        catchRepositoryExceptions(error, 'Erro ao fazer login. Por favor, tente novamente.')
        }
    },

    async logout() {
        try {
        const { data, error } = await usePost<ApiResponse<genericApiResponse>>('/logout') 

        if (error.value) {
          console.error('Erro na requisição:', error.value)
          throw new Error(error.value.message || 'Erro na requisição')
        }

        if(data.value?.status === 'error') {
          console.error('Erro ao deslogar:', data.value.message)
          throw new Error(data.value.message || 'Erro ao deslogar')
        }

        useCookie('auth_token').value = null

        const userStore = useAuthStore()
        userStore.setUser(null)

        const toast = useToast()

        toast.add({
          title: 'Logout realizado com sucesso!',
          color: 'success',
        })

        navigateTo('/login')

        } catch (error: any) {
        console.error('Erro ao fazer login:', error)

        catchRepositoryExceptions(error, 'Erro ao deslogar. Por favor, tente novamente.')
        }
    },

    async fetchUser() {
    try {
      const { data, error } = await useGet<ApiResponse<UserRepsonse>>('/user')

      if (error.value) {
        throw new Error(error.value.message || 'Erro ao buscar usuário')
      }

      if (data.value?.status === 'error') {
        throw new Error(data.value.message)
      }

      const userStore = useAuthStore()
      userStore.setUser(data?.value?.data || null)

    } catch (err: any) {
      console.error('Erro ao buscar usuário:', err)
      useCookie('auth_token').value = null
    }
  }
}