<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "primary",
  },
  icon: {
    type: String,
    default: "",
  },
});

const getVariantClass = () => {
  switch (props.variant) {
    case "primary":
      return "bg-gradient-to-br from-[#1DFEAD] to-[#1DFE69] hover:from-[#18E05E] hover:to-[#18E09F]";
    case "secondary":
      return "bg-black hover:bg-gray-800";
    default:
      return "bg-[#01C38D] hover:bg-[#01a87a]";
  }
};
</script>

<template>
  <button
    :class="[
      'w-full text-black font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-300 cursor-pointer flex items-center   justify-center gap-2',
      getVariantClass(),
    ]"
  >
    <Icon v-if="icon" :name="icon" size="1.5em" />
    <span>{{ text }}</span>
  </button>
</template>