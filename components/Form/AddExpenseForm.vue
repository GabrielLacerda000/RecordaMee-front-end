<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { ExpenseRepository } from '~/repositories/expense/ExpenseRepository'

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
  name: undefined,
  amount: undefined,
  due_date: undefined,
  category_id: undefined,
  status_id: undefined,
  recurrence_id: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await ExpenseRepository.addExpense(event.data)
}
</script>

<template>
  <UModal title="Adicionar Nova Despesa">
    <ButtonsBtn text="Adicionar despesa" type="subtle" icon="tabler:circle-plus" />

    <template #body>
      <div class="max-h-[80vh] overflow-y-auto p-7">

        <UForm :schema="schema" :state="form" @submit="onSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Nome" name="name">
              <UInput v-model="form.name" />
            </UFormField>

            
            <UFormField label="Valor" name="amount">
                <UInput v-model="form.amount" type="number" class="w-40" />
            </UFormField>
            
            <UFormField label="Data de Vencimento" name="due_date">
                <UInput v-model="form.due_date" type="date" class="w-40" />
            </UFormField>
            
            <UFormField label="Categoria" name="category_id">
              <USelect v-model="form.category_id" :items="categories" class="w-40"/>
            </UFormField>

            <UFormField label="Status" name="status_id">
              <USelect v-model="form.status_id" :items="statuses" class="w-40"/>
            </UFormField>

            <UFormField label="Recorrência" name="recurrence_id">
              <USelect v-model="form.recurrence_id" :items="recurrences" class="w-40"/>
            </UFormField>
          </div>

          <div class="flex justify-end">
            <ButtonsBtn type="submit" text="Salvar" />
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
