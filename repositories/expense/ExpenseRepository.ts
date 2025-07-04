import { useExpenseStore } from "~/store/useExpenseStore";
import type { ApiResponse } from "~/types/api/api";
import type { Expense } from "~/types/expense/Expense";
import type { Summary } from "~/types/expense/Sumary";

export const ExpenseRepository = {
    async getExpenses() {
        try {
            const { data, error } = await useGet<ApiResponse<Expense[]>>('/expenses');

            if (error.value) {
                throw new Error(error.value.message || 'Erro na requisição');
            }

            if (data.value?.status === 'error') {
                throw new Error(data.value.message || 'Erro na requisição ao buscar despesas');
            }
            
            const expenseStore = useExpenseStore();
            expenseStore.setExpenses(data.value?.data || []);
            console.log('Dados das despesas da store:', useExpenseStore().expenses);

        } catch (error: any) {
            console.error('Erro ao buscar despesas:', error);
            catchRepositoryExceptions(error, 'Erro ao buscar despesas. Por favor, tente novamente.')

        }
    },

    async getSummary() {
        try {
            const { data, error } = await useGet<ApiResponse<Summary>>('/expenses/summary');

            if (error.value) {
                throw new Error(error.value.message || 'Erro na requisição');
            }

            if (data.value?.status === 'error') {
                throw new Error(data.value.message || 'Erro na requisição ao buscar o resumo');
            }

            return data.value?.data;

        } catch (error: any) {
            console.error('Erro ao buscar o resumo:', error);
            catchRepositoryExceptions(error, 'Erro ao buscar sumário. Por favor, tente novamente.')

        }
    }
}