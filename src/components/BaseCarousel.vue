<script setup lang="ts">

import {IMG_LIST} from "~/src/constant";

const props = defineProps({
  sliderList: {
    type: Object as PropType<string[]>,
    required: true
  },
  sliderImg: {
    type: Boolean
  }
});

const validateBackground = (str: string) => {
  let link = '';
  IMG_LIST.forEach(item => {
    if (str.indexOf(item) > 0) {
      link = str
    }
  })
  return link;
}
</script>
<template>
  <v-carousel
      :class="{'__noPagination':props.sliderList.length === 1}"
  >
    <v-carousel-item
        contain
        v-for="item of props.sliderList"
        :src="validateBackground(item)"
        class="projectSlider"
    >
      <slot :multiple="item"/>
    </v-carousel-item>
  </v-carousel>

</template>

<style scoped lang="scss"></style>
<style lang="scss">
.v-btn--active {
  background: rgb(95, 158, 160);
}
.__noPagination {
  .v-carousel__controls {
    display: none;
  }
}
</style>
