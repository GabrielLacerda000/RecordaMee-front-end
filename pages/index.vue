<script setup lang="ts">
useSeoMeta({
    title: 'Home | RecordaMe',
    description: 'Página inicial do aplicativo RecordaMe',
})

definePageMeta({
  middleware: ['auth']
})

</script>

<template>
<p>hello world</p>
</template>