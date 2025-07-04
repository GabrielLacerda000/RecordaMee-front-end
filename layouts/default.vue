<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue';
</script>

<template>
  <div class="w-full min-h-screen bg-[#F5F5F5] flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <LayoutHeader />
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.main {
  font-family: 'Roboto', sans-serif;
}
</style>