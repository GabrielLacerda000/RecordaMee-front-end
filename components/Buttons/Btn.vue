<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'primary',
  },
});
</script>

<template>
  <button
    class="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-[#01C38D] hover:bg-[#01a87a] transition-colors duration-300 cursor-pointer"
  >
    {{ text }}
  </button>
</template>