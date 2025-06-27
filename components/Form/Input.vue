<script setup lang="ts">
defineProps({
  modelValue: String,
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
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</template>
