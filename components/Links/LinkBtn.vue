<script setup lang="ts">
defineProps({
  text: String,
});
</script>

<template>
  <a href="#" class="text-sm text-[#F5F5F5] underline">
    {{ text }}
  </a>
</template>
