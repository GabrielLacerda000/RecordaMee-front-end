<template>
  <div class="bg-[#F5F5F5] rounded-md p-4 border border-gray-300 flex items-center justify-between">
    <div class="flex items-center">
      <div :class="`bg-${categoryColor}-100 p-3 rounded-md`">
        <Icon :name="categoryIcon" :class="`text-${categoryColor}-500`" size="2em" />
      </div>
      <div class="ml-4">
        <p class="font-bold">{{ name }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(createdAt) }}</p>
      </div>
    </div>
    <div class="flex items-center">
      <div class="text-right mr-4">
        <p class="font-bold text-lg">{{ formatCurrency(value) }}</p>
        <p class="text-sm text-gray-500">Vence em: {{ formatDate(dueDate) }}</p>
      </div>
      <div class="flex flex-col">
        <button class="mb-2">
          <Icon name="uil:edit" class="text-gray-500 hover:text-gray-700" size="1.5em" />
        </button>
        <button>
          <Icon name="uil:trash-alt" class="text-gray-500 hover:text-red-500" size="1.5em" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const categoryMap: { [key: string]: { icon: string; color: string } } = {
  housing: { icon: 'uil:home-alt', color: 'green' },
  utilities: { icon: 'uil:bolt-alt', color: 'yellow' },
  food: { icon: 'uil:crockery', color: 'red' },
  transport: { icon: 'uil:car-sideview', color: 'blue' },
  entertainment: { icon: 'uil:ticket', color: 'purple' },
  health: { icon: 'uil:heart-medical', color: 'pink' },
  education: { icon: 'uil:book-open', color: 'indigo' },
  other: { icon: 'uil:tag-alt', color: 'gray' },
};

const categoryIcon = computed(() => {
  return categoryMap[props.category]?.icon || 'uil:tag-alt';
});

const categoryColor = computed(() => {
  return categoryMap[props.category]?.color || 'gray';
});

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
</script>

<style scoped>
/* Adicionando as cores de fundo e texto dinamicamente para o Tailwind CSS */
.bg-green-100 { background-color: #D1FAE5; }
.text-green-500 { color: #10B981; }
.bg-yellow-100 { background-color: #FEF3C7; }
.text-yellow-500 { color: #F59E0B; }
.bg-red-100 { background-color: #FEE2E2; }
.text-red-500 { color: #EF4444; }
.bg-blue-100 { background-color: #DBEAFE; }
.text-blue-500 { color: #3B82F6; }
.bg-purple-100 { background-color: #E9D5FF; }
.text-purple-500 { color: #8B5CF6; }
.bg-pink-100 { background-color: #FCE7F3; }
.text-pink-500 { color: #EC4899; }
.bg-indigo-100 { background-color: #E0E7FF; }
.text-indigo-500 { color: #6366F1; }
.bg-gray-100 { background-color: #F3F4F6; }
.text-gray-500 { color: #6B7280; }
</style>
