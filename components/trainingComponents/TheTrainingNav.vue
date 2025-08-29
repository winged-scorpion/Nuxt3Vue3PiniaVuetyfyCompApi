<script setup lang="ts">
import {useRoute} from 'vue-router'
import {computed} from 'vue'

const router = useRouter()
const route = useRoute()

const path = computed(() => route.path)

function stepId(query:number=1){

}
watch(
    () => route.params.id,
    async () => {
      console.log('route.params.id',route.params.id)
    }
)

const testNav = [
  {
    page: '#10',
    name: '#10',
    params: {
      id: 10
    },
    visibility: true
  },
  {
    page: '#20',
    name: '#20',
    visibility: true
  },
  {
    page: '#30',
    name: '#30',
    visibility: true
  }
]

</script>

<template>
  <h2>Тренировка навигация{{ route.params.id }}</h2>
  <div class="d-flex ga-3">
    <NuxtLink
        v-for="item of testNav"
        :to="path+item.page"
        :key="item.page"
        @click.prevent="stepId()"
    >
      {{ item.name }}
    </NuxtLink>
  </div>

</template>

<style scoped lang="scss">

</style>
