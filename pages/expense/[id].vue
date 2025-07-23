<script setup lanf="ts">



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
                <UInput v-model="form.amount" type="number" class="w-full" />
            </UFormField>
            
            <UFormField label="Data de Vencimento" name="due_date">
                <UInput v-model="form.due_date" type="date" class="w-full" />
            </UFormField>
            
            <UFormField label="Categoria" name="category_id">
              <USelect v-model="form.category_id" :items="categories" class="w-full"/>
            </UFormField>

            <UFormField label="Status" name="status_id">
              <USelect v-model="form.status_id" :items="statuses" class="w-full"/>
            </UFormField>

            <UFormField label="Recorrência" name="recurrence_id">
              <USelect v-model="form.recurrence_id" :items="recurrences" class="w-full"/>
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