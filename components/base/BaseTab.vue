<script setup lang="ts">
import {defineProps} from "vue";
import type {TabItem} from "~/model/tabs";

const props = defineProps({
  selectTab: {
    type: String,
    required: false
  },
  tabList: {
    type: Array <TabItem>,
    required: true
  }
})

</script>

<template>
  <div class="d-flex ga-5 tab">
    <base-button
        v-for="item of props.tabList"
        :class="{active:props.selectTab === item.tab}"
        @click="$emit('changeTab',item.tab);">{{ item.label }}
    </base-button>
  </div>
</template>

<style scoped lang="scss">
.active{
  background: #bbdcdd;
  border: solid 1px #5f9ea0;
}
</style>
