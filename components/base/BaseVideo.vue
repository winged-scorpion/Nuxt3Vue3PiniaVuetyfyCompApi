<script setup>

const props = defineProps({
  link: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  }
})

</script>

<template>
  <iframe
      width="560"
      height="315"
      :src=link
      :title=name
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen></iframe>

  <div>
    {{name}} name
    {{link}} link
  </div>

</template>

<style scoped lang="scss">
.customClassName{
  width: 100%;
  height: 400px;
}


</style>
