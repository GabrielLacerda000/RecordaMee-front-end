<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const categories = [
  { value: 1, label: 'Housing' },
  { value: 2, label: 'Utilities' },
  { value: 3, label: 'Food' },
  { value: 4, label: 'Transport' },
  { value: 5, label: 'Entertainment' },
  { value: 6, label: 'Health' },
  { value: 7, label: 'Education' },
  { value: 8, label: 'Other' }
]

const statuses = [
  { value: 1, label: 'paid' },
  { value: 2, label: 'pending' },
  { value: 3, label: 'overdue' }
]

const recurrences = [
  { value: 1, label: 'daily' },
  { value: 2, label: 'weekly' },
  { value: 3, label: 'monthly' },
  { value: 4, label: 'bianual' },
  { value: 5, label: 'semester' }
]


const schema = z.object({
  name: z.string().min(3, 'Must be at least 3 characters'),
  amount: z.number().positive('Must be a positive number'),
  due_date: z.string(),
  category_id: z.number(),
  status_id: z.number(),
  recurrence_id: z.number(),
})

type Schema = z.output<typeof schema>

const form = reactive({
  name: undefined,
  amount: undefined,
  due_date: undefined,
  category_id: undefined,
  status_id: undefined,
  recurrence_id: undefined,
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
<UModal>
        <ButtonsBtn text="Adicionar despesa" type="submit" icon="tabler:circle-plus"/>

        <template #content>
            <div class="max-h-[80vh] overflow-y-auto p-7">
                <h2 class="text-lg font-bold mb-4 text-white">Adicionar Nova Despesa</h2>
                <UForm :schema="schema" :state="form" class="space-y-4" @submit="onSubmit">
                    <UFormField label="Nome" name="name">
                        <UInput v-model="form.name" />
                    </UFormField>
    
                    <UFormField label="Valor" name="amount">
                        <UInput v-model="form.amount" type="number" />
                    </UFormField>
    
                    <UFormField label="Data de Vencimento" name="due_date">
                        <UInput v-model="form.due_date" type="date" />
                    </UFormField>
    
                    <UFormField label="Categoria" name="category_id">
                        <USelect v-model="form.category_id" :options="categories" />
                    </UFormField>
    
                    <UFormField label="Status" name="status_id">
                        <USelect v-model="form.status_id" :options="statuses" />
                    </UFormField>
    
                    <UFormField label="Recorrência" name="recurrence_id">
                        <USelect v-model="form.recurrence_id" :options="recurrences" />
                    </UFormField>
    
                    <ButtonsBtn type="submit" text="Salvar" />
                </UForm>
            </div>
        </template>
</UModal>
</template>