<script setup lang="ts">
const modelValue = defineModel()

defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  id: String,
});


</script>

<template>
  <input
    :id="id"
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    class="border border-gray-300 rounded w-full py-2 px-3 text-[#F5F5F5] leading-tight focus:outline-none focus:shadow-outline"
  />
</template>
