import { useAuthStore } from "~/store/useAuthStore"
import type { ApiResponse } from "~/types/api/api"
import type { User } from "~/types/user/User"

export type LoginForm = {
    email: string
    password: string
}

export type LoginResponse = {
    user: User
    token: string
}

export const AuthRepository = {
     async login(form: LoginForm) {
        
        try {
        const { data, error } = await usePost<ApiResponse<LoginResponse>>('/api/login', {body: form}) 

        if (error.value) {
            throw new Error(error.value.message || 'Erro na requisição')
        }

        if(data.value?.status === 'error') {
            throw new Error(data.value.message || 'Erro na requisição')
        }

        useCookie('token', {
            maxAge: 60 * 60 * 24 * 7,
        }).value = data.value?.data?.token

        const userStore = useAuthStore()
        userStore.setUser(data.value?.data?.user || null)
        console.log('Usuário::',userStore.user)
        console.log('Usuário logado:', userStore.isLoggedIn)

        navigateTo('/')

        } catch (error: any) {
        console.error('Erro ao fazer login:', error)
        throw error
        }
    }
}