<script setup lang="ts">

const props = defineProps({
  tileText: {
    type: String
  },
  styleBackground: {
    type: Array as PropType<string[]>,
    required: true
  }
});

</script>

<template>
  <div
      :style="{ color: props.styleBackground[1], background: props.styleBackground[0] }"
  >
    <strong>{{ props.tileText }}</strong>
  </div>
</template>

