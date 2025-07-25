<script setup lang="ts">
import { computed } from 'vue';
import formatCurrency from '~/utils/format/formatCurrency';
import formatDate from '~/utils/format/formatDate';
import { ExpenseRepository } from '~/repositories/expense/ExpenseRepository';
import { string } from 'zod';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
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
  paid: {
    type: Boolean,
    required: true,
  },
  status: {
    type: Object as PropType<{ id: number; name: string }>,
    required: true,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
});

const categoryMap: { [key: string]: { icon: string; color: string , bgColor: string } } = {
  housing: { icon: 'material-symbols:house-rounded', color: 'text-green-500', bgColor: 'bg-green-100' },
  utilities: { icon: 'tabler:tool', color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
  food: { icon: 'uil:crockery', color: 'text-red-500', bgColor: 'bg-red-100' },
  transport: { icon: 'uil:car-sideview', color: 'text-blue-500', bgColor: 'bg-blue-100' },
  entertainment: { icon: 'uil:ticket', color: 'text-purple-500', bgColor: 'bg-purple-100' },
  health: { icon: 'uil:heart-medical', color: 'text-pink-500', bgColor: 'bg-pink-100' },
  education: { icon: 'uil:book-open', color: 'text-indigo-500', bgColor: 'bg-indigo-100' },
  other: { icon: 'uil:tag-alt', color: 'text-gray-500', bgColor: 'bg-gray-200' },
};

const categoryKey = computed(() => props.category.toLowerCase())

const categoryIcon = computed(() => {
  return categoryMap[categoryKey.value]?.icon || 'uil:tag-alt';
});

const categoryColor = computed(() => {
  return categoryMap[categoryKey.value]?.color || 'gray';
});

const categoryBgColor = computed(() => {
  return categoryMap[categoryKey.value]?.bgColor || 'gray';
});

const status = computed(() => props.status.name.toLowerCase());

const statusText = computed(() => {
  const map: Record<string, string> = {
    paid: 'Pago',
    pending: 'Pendente',
    overdue: 'Vencido',
  };
  return map[status.value] || 'Pendente';
});

const statusClass = computed(() => {
  const map: Record<string, string> = {
    paid: 'bg-green-200 text-[#2E7D32]',
    pending: 'bg-yellow-200 text-yellow-600',
    overdue: 'bg-red-200 text-red-500',
  };
  return map[status.value] || 'bg-gray-200 text-gray-500';
});


async function handleDelete() {
  if (confirm('Tem certeza que deseja deletar esta despesa?')) {
    await ExpenseRepository.deleteExpense(props.id);
  }
}

</script>

<template>
  <div class="bg-[#262626] rounded-xl p-4 my-3 mx-4 border border-[#2e2f2f] flex items-center justify-between shadow-md">
    <div class="flex items-center text-white">
      <div :class="`flex items-center justify-center ${categoryBgColor} p-3 rounded-xl`">
        <Icon :name="categoryIcon" :class="`${categoryColor}`" :style="`color: ${categoryColor}`" size="2em" />
      </div>

      <div class="ml-4">
        <p class="text-lg font-bold">{{ name }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(createdAt) }}</p>
      </div>
    </div>

    <div class="flex items-center">
      <div class="text-right mr-4">
        <p class="font-bold text-lg text-white">{{ formatCurrency(value) }}</p>
        <p class="text-sm text-gray-500">Vence em: {{ formatDate(dueDate) }}</p>
      </div>

      <div class="mx-3">
        <UBadge variant="soft" :class="statusClass">{{ statusText }}</UBadge>
      </div>

      <div class="flex gap-3" v-if="showActions">
        <NuxtLink :to="`/expense/${id}`">
          <div class="bg-black p-2 h-10 w-10 rounded-xl hover:bg-black/5 transition-colors duration-300 ">
            <button class="mb-2">
              <Icon name="uil:edit" class="text-[#F5F5F5] hover:text-[#404040] transition-colors duration-300 cursor-pointer" size="1.5em" />
            </button>
          </div>
        </NuxtLink>

        <div class="bg-black hover:bg-black/5 transition-colors duration-300 h-10 w-10 p-2 rounded-xl">
          <button @click="handleDelete">
            <Icon name="uil:trash-alt" class="text-red-400 hover:text-red-500 transition-colors duration-300 cursor-pointer" size="1.5em" />
          </button>
        </div>
      </div>

    </div>
  </div>
</template>