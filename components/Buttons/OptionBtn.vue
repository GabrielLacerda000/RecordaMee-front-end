<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button class="flex items-center p-2 rounded-md hover:bg-gray-200 w-full text-left">
    <Icon :name="icon" size="1.5em" />
    <span class="ml-3">{{ text }}</span>
  </button>
</template>
