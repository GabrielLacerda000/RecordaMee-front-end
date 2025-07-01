<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'primary',
  },
});

const getVariantClass = () => {
  switch (props.variant) {
    case 'primary':
      return 'bg-[#01C38D] hover:bg-[#01a87a]';
    case 'secondary':
      return 'bg-black hover:bg-gray-800';
    default:
      return 'bg-[#01C38D] hover:bg-[#01a87a]';
  }
};
</script>

<template>
  <button
    :class="[
      'w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 cursor-pointer',
      getVariantClass(),
    ]"
  >
    {{ text }}
  </button>
</template>