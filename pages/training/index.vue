<script setup lang="ts">

import {useRoute} from "vue-router";

const router = useRouter()
const route = useRoute()

const path = computed(() => route.path)

import BaseH1 from "~/components/base/BaseH1.vue";
import TheTab from "~/components/base/BaseTab.vue";
import TheTrainingFunction from "~/components/trainingComponents/TheTrainingBase.vue";
import TheTrainingApi from "~/components/trainingComponents/TheTrainingApi.vue";
import TheTrainingNav from "~/components/trainingComponents/TheTrainingNav.vue";
import {computed} from "vue";


const activeTab = ref('base')
const tabs = [
  {tab: 'base', label: 'Базовый функционал', selected: true},
  {tab: 'nav', label: 'Навигация'},
  {tab: 'api', label: 'Api'}
]
function activeTabUpdate(tab:string){
  activeTab.value = tab
}

const tabNav = [
  {
    page: path.value+`/base`,
    name: 'Базовый функционал',
    h1: 'Видео сборник разных рецептов',
    visibility: true
  },
  {
    page: path.value+`/nav`,
    name: 'Навигация',
    h1: 'Видео сборник разных рецептов',
    visibility: true
  },
  {
    page: path.value+`/api`,
    name: 'Api',
    h1: 'Видео сборник разных рецептов',
    visibility: true
  }
]
</script>

<template>
  <div class="pageContainer">
    <BaseH1/>
    <div class="d-flex ga-5 align-center mb-5">
      <span>Табы</span>
      <TheTab
          :tab-list="tabs"
          :select-tab="activeTab"
          @changeTab="activeTabUpdate"
      />
    </div>
    <div>
      <div class="d-flex ga-5 align-center mb-5">
        <span>Ссылки</span>
        <NuxtLink
            v-for="item of tabNav"
            :to="item.page"
            class="v-btn v-btn--elevated v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-elevated"
        >
          {{item.name}}
        </NuxtLink>
      </div>

      <TheTrainingFunction
          v-if="activeTab === 'base'"
      />
      <TheTrainingApi
          v-if="activeTab === 'api'"
      />
      <TheTrainingNav
          v-if="activeTab === 'nav'"
      />
      <div>

      </div>
    </div>

  </div>
</template>


<style scoped>

</style>
