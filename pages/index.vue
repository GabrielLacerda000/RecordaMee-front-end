<script setup lang="ts">
import MyExpenses from '~/components/Expenses/MyExpenses.vue';
import UpcomingExpenses from '~/components/Expenses/UpcomingExpenses.vue';

useSeoMeta({
    title: 'Home | RecordaMe',
    description: 'Página inicial do aplicativo RecordaMe',
})

definePageMeta({
  middleware: ['auth']
})

const activeTab = ref('myExpenses');

const tabs = {
  myExpenses: MyExpenses,
  upcomingExpenses: UpcomingExpenses
}

const activeComponent = computed(() => tabs[activeTab.value]);

</script>

<template> 
  <div>
    <div class="flex items-center justify-between mb-4 mx-4">
      <div>
        <h1 class="text-2xl font-bold text-white">RecordaMe</h1>
        <p class="text-md text-white">Suas despesas</p>
      </div>

      <div>
        <FormAddExpenseForm />
      </div>
    </div>

    <div class="flex gap-4 mx-4 mb-4">
      <ButtonsTabButton
        text="Minhas despesas"
        @click="activeTab = 'myExpenses'"
        :is-active="activeTab === 'myExpenses'"
      />
      <ButtonsTabButton
        text="Próximas despesas"
        @click="activeTab = 'upcomingExpenses'"
        :is-active="activeTab === 'upcomingExpenses'"
      />
    </div>

    <keep-alive>
        <component :is="activeComponent" />
    </keep-alive>
  </div>
</template>