<script setup lang="ts">
defineProps({
  text: String,
});
</script>

<template>
  <a href="#" class="text-sm text-gray-600 underline">
    {{ text }}
  </a>
</template>
