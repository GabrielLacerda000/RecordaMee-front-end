<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { ExpenseRepository } from '~/repositories/expense/ExpenseRepository'
import { useExpenseStore } from '~/store/useExpenseStore';

const route = useRoute();
const expenseStore = useExpenseStore();
const id = Number(route.params.id);

await ExpenseRepository.getExpense(id);

const expense = computed(() => expenseStore.expense);

const categories = [
  { value: 1, label: 'Moradia' },
  { value: 2, label: 'Serviços' },
  { value: 3, label: 'Alimentação' },
  { value: 4, label: 'Transporte' },
  { value: 5, label: 'Lazer' },
  { value: 6, label: 'Saúde' },
  { value: 7, label: 'Educação' },
  { value: 8, label: 'Outros' }
]

const statuses = [
  { value: 1, label: 'pago' },
  { value: 2, label: 'pendente' },
  { value: 3, label: 'vencido' }
]

const recurrences = [
  { value: 1, label: 'único' },
  { value: 2, label: 'diário' },
  { value: 3, label: 'semanal' },
  { value: 4, label: 'mensal' },
  { value: 5, label: 'bimestral' },
  { value: 6, label: 'semestral' }
]

const schema = z.object({
  name: z.string('O campo nome é obrigatório').min(3, 'O campo nome deve conter pelo menos 3 caracteres'),
  amount: z.number('O campo valor é obrigatório').positive('O campo valor deve ser positivo'),
  due_date: z.string('O campo data é obrigatório'),
  category_id: z.number('O campo categoria é obrigatório'),
  status_id: z.number('O campo status é obrigatório'),
  recurrence_id: z.number('O campo recorrência é obrigatório'),
})

type Schema = z.output<typeof schema>

const form = reactive({
  name: expense.value?.name,
  amount: expense.value?.amount,
  due_date: expense.value?.due_date.split('T')[0],
  category_id: expense.value?.category.id,
  status_id: expense.value?.status.id,
  recurrence_id: expense.value?.recurrence.id,
})


async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  await ExpenseRepository.updateExpense(id, data)
  navigateTo('/')
}
</script>

<template>
    <div class="flex items-center justify-center relative p-4">
        <NuxtLink to="/" class="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 rounded-full p-2 transition-colors hover:bg-gray-700 flex items-center justify-center w-10 h-10">
            <Icon name="material-symbols:arrow-back" class="text-white" size="1.5em" />
        </NuxtLink>
        <h1 class="text-2xl text-white">Editar Despesa</h1>
    </div>
    <div class="flex justify-center items-center h-full p-7">
        <div class="w-full max-w-2xl">
            <UForm :schema="schema" :state="form" @submit="onSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField label="Nome" name="name" >
                        <UInput v-model="form.name" class="w-full"/>
                    </UFormField>
                    <UFormField label="Valor" name="amount">
                        <UInput v-model="form.amount" type="number" class="w-full" />
                    </UFormField>
                    <UFormField label="Data de Vencimento" name="due_date">
                        <UInput v-model="form.due_date" type="date" class="w-full" />
                    </UFormField>
                    <UFormField label="Categoria" name="category_id">
                        <USelect v-model="form.category_id" :items="categories" class="w-full" />
                    </UFormField>
                    <UFormField label="Status" name="status_id">
                        <USelect v-model="form.status_id" :items="statuses" class="w-full" />
                    </UFormField>
                    <UFormField label="Recorrência" name="recurrence_id">
                        <USelect v-model="form.recurrence_id" :items="recurrences" class="w-full" />
                    </UFormField>
                </div>
                <div class="flex justify-end">
                    <ButtonsBtn type="submit" text="Salvar" />
                </div>
            </UForm>
        </div>
    </div>
</template>
