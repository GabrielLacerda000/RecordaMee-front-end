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
  <button class="flex items-cente p-2 border border-[#2e2f2f] rounded-md hover:bg-[#2e2f2f] transition-colors duration-300 w-full text-left cursor-pointer text-white">
    <Icon :name="icon" size="1.5em" />
    <span class="ml-3">{{ text }}</span>
  </button>
</template>
