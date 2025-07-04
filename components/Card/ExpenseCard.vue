<script setup lang="ts">
import { computed } from 'vue';
import formatCurrency from '~/utils/format/formatCurrency';
import formatDate from '~/utils/format/formatDate';

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
  housing: { icon: 'material-symbols:house-rounded', color: 'green' },
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

console.log('props:', props.category);
</script>

<template>
  <div class="bg-[#F5F5F5] rounded-md p-4 my-3 border border-gray-300 flex items-center justify-between ">
    <div class="flex items-center">
      <div :class="`bg-${categoryColor}-100 p-3 rounded-md`">
        <Icon :name="categoryIcon" :class="`text-${categoryColor}-500`" :style="`color: ${categoryColor}-500`" size="2em" />
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

      <div class="flex gap-3">
        <div class="bg-green-200 p-2 h-10 w-10 rounded-md hover:bg-green-400 transition-colors duration-300 ">
          <button class="mb-2">
            <Icon name="uil:edit" class="text-green-500 hover:text-green-600 transition-colors duration-300 cursor-pointer" size="1.5em" />
          </button>

        </div>

        <div class="bg-red-200 hover:bg-red-400 transition-colors duration-300 h-10 w-10 p-2 rounded-md">
          <button>
            <Icon name="uil:trash-alt" class="text-red-500 hover:text-red-600 transition-colors duration-300 cursor-pointer" size="1.5em" />
          </button>
        </div>
      </div>

    </div>
  </div>
</template>