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

const categoryMap: { [key: string]: { icon: string; color: string , bgColor: string } } = {
  housing: { icon: 'material-symbols:house-rounded', color: 'text-green-500', bgColor: 'bg-green-100' },
  utilities: { icon: 'uil:bolt-alt', color: 'textyellow-100', bgColor: 'bg-yellow-100' },
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

</script>

<template>
  <div class="bg-[#F5F5F5] rounded-xl p-4 my-3 border border-gray-300 flex items-center justify-between shadow-md">
    <div class="flex items-center text-black">
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
        <p class="font-bold text-lg text-black">{{ formatCurrency(value) }}</p>
        <p class="text-sm text-gray-500">Vence em: {{ formatDate(dueDate) }}</p>
      </div>

      <div class="flex gap-3">
        <div class="bg-green-200 p-2 h-10 w-10 rounded-xl hover:bg-green-300 transition-colors duration-300 ">
          <button class="mb-2">
            <Icon name="uil:edit" class="text-green-400 hover:text-green-500 transition-colors duration-300 cursor-pointer" size="1.5em" />
          </button>
        </div>

        <div class="bg-red-200 hover:bg-red-300 transition-colors duration-300 h-10 w-10 p-2 rounded-xl">
          <button>
            <Icon name="uil:trash-alt" class="text-red-400 hover:text-red-500 transition-colors duration-300 cursor-pointer" size="1.5em" />
          </button>
        </div>
      </div>

    </div>
  </div>
</template>