import { useExpenseStore } from "~/store/useExpenseStore";
import type { ApiResponse } from "~/types/api/api";
import type { AddExpensePayload, Expense } from "~/types/expense/Expense";
import type { Summary } from "~/types/expense/Sumary";

const toast = useToast()

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
    },

    async addExpense(payload: AddExpensePayload) {
        try {
            const { data, error } = await usePost<ApiResponse<Expense>>('/expenses/create', {
                body: payload
            });

            if (error.value) {
                toast.add({
                  title: 'Erro ao criar despesa',
                  description: error.value.message,
                  color: 'error',
                })
                throw new Error(error.value.message || 'Erro na requisição');
            }

            if (data.value?.status === 'error') {
                toast.add({
                  title: 'Erro ao criar despesa',
                  description: data.value.message,
                  color: 'error',
                })
                throw new Error(data.value.message || 'Erro na requisição ao adicionar despesa');
            }

            if (data.value?.data) {
                const expenseStore = useExpenseStore();

                expenseStore.addExpense(data.value.data);

                toast.add({
                  title: 'Despesa criada com sucesso!',
                })
            }

        } catch (error: any) {
            console.error('Erro ao adicionar despesa:', error);
            catchRepositoryExceptions(error, 'Erro ao adicionar despesa. Por favor, tente novamente.')
        }
    }
}