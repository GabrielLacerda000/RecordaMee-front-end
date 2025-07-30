import { useExpenseStore } from "~/store/useExpenseStore";
import type { ApiResponse } from "~/types/api/api";
import type { AddExpensePayload, Expense } from "~/types/expense/Expense";
import type { Summary } from "~/types/expense/Sumary";

const toast = useToast()


export const ExpenseRepository = {
    async getExpenses(page: number = 1) {
        try {
            const { data, error } = await useGet<ApiResponse<Expense[]>>(`/expenses?page=${page}`);

            if (error.value) {
                throw new Error(error.value.message || 'Erro na requisição');
            }

            if (data.value?.status === 'error') {
                throw new Error(data.value.message || 'Erro na requisição ao buscar despesas');
            }
            
            const expenseStore = useExpenseStore();
            expenseStore.addExpenses(data.value?.data || []);

            return data.value;

        } catch (error: any) {
            console.error('Erro ao buscar despesas:', error);
            catchRepositoryExceptions(error, 'Erro ao buscar despesas. Por favor, tente novamente.')

        }
    },
    async getExpense(id: number) {
        try {
            const { data, error } = await useGet<ApiResponse<Expense>>(`/expenses/show/${id}`);

            if (error.value) {
                throw new Error(error.value.message || 'Erro na requisição');
            }

            if (data.value?.status === 'error') {
                throw new Error(data.value.message || 'Erro na requisição ao buscar despesa');
            }
            
            const expenseStore = useExpenseStore();
            if (data.value?.data) {
                expenseStore.setExpense(data.value.data);
            }

        } catch (error: any) {
            console.error('Erro ao buscar despesa:', error);
            catchRepositoryExceptions(error, 'Erro ao buscar despesa. Por favor, tente novamente.')

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
            const expenseStore = useExpenseStore();

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
                expenseStore.addExpense(data.value.data);

                toast.add({
                  title: 'Despesa criada com sucesso!',
                  color: 'success',
                })
            }

        } catch (error: any) {
            console.error('Erro ao adicionar despesa:', error);
            catchRepositoryExceptions(error, 'Erro ao adicionar despesa. Por favor, tente novamente.')
        }
    },

    async updateExpense(id: number, payload: AddExpensePayload) {
        try {
            const { data, error } = await usePut<ApiResponse<Expense>>(`/expenses/update/${id}`, {
                body: payload
            });

            if (error.value) {
                toast.add({
                    title: 'Erro ao atualizar despesa',
                    description: error.value.message,
                    color: 'error',
                })
                throw new Error(error.value.message || 'Erro na requisição');
            }

            if (data.value?.status === 'error') {
                toast.add({
                    title: 'Erro ao atualizar despesa',
                    description: data.value.message,
                    color: 'error',
                })
                throw new Error(data.value.message || 'Erro na requisição ao atualizar despesa');
            }

            if (data.value?.data) {
                const expenseStore = useExpenseStore();
                expenseStore.setExpense(data.value.data);

                toast.add({
                    title: 'Despesa atualizada com sucesso!',
                    color: 'success',
                })
            }

        } catch (error: any) {
            console.error('Erro ao atualizar despesa:', error);
            catchRepositoryExceptions(error, 'Erro ao atualizar despesa. Por favor, tente novamente.')
        }
    },

    async deleteExpense(id: number) {
        try {
            const { data, error } = await useDelete<ApiResponse<null>>(`/expenses/delete/${id}`);

            if (error.value) {
                toast.add({
                  title: 'Erro ao deletar despesa',
                  description: error.value.message,
                  color: 'error',
                })
                throw new Error(error.value.message || 'Erro na requisição');
            }

            if (data.value?.status === 'error') {
                toast.add({
                  title: 'Erro ao deletar despesa',
                  description: data.value.message,
                  color: 'error',
                })
                throw new Error(data.value.message || 'Erro na requisição ao deletar despesa');
            }

            const expenseStore = useExpenseStore();
            expenseStore.removeExpense(id);

            toast.add({
              title: 'Despesa deletada com sucesso!',
              color: 'success',
            })

        } catch (error: any) {
            console.error('Erro ao deletar despesa:', error);
            catchRepositoryExceptions(error, 'Erro ao deletar despesa. Por favor, tente novamente.')
        }
    },

    async getUpcomingExpenses() {
        try {
            const { data, error } = await useGet<ApiResponse<Expense[]>>('/expenses/recurrences');

            if (error.value) {
                toast.add({
                  title: 'Erro ao deletar despesa',
                  description: error.value.message,
                  color: 'error',
                })
                throw new Error(error.value.message || 'Erro na requisição');
            }

            if (data.value?.status === 'error') {
                toast.add({
                  title: 'Erro ao deletar despesa',
                  description: data.value.message,
                  color: 'error',
                })
                throw new Error(data.value.message || 'Erro na requisição ao buscars despesas');
            }

            const expenseStore = useExpenseStore();
            expenseStore.setUpcomingExpenses(data.value?.data || []);

             toast.add({
              title: 'Despesas futuras buscadas com sucesso!',
              color: 'success',
            })

        } catch (error: any) {
            console.error('Erro ao buscar despesas por categoria:', error);
            catchRepositoryExceptions(error, 'Erro ao buscar próximas despesas. Por favor, tente novamente.')
        }
    }
}