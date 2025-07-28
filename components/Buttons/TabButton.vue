<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="[
      'py-2 px-4 text-white font-bold focus:outline-none transition-colors duration-300 cursor-pointer',
      'relative',
      {
        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-1': true,
        'after:bg-gradient-to-br after:from-[#1DFEAD] after:to-[#1DFE69]': isActive,
      },
    ]"
  >
    {{ text }}
  </button>
</template>
