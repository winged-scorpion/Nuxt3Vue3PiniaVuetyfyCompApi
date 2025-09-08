<script setup lang="ts">
import {useUserStore} from "~/store/UserStore";


import {NAV_ITEMS} from "~/src/constant";
import {useRoute} from "vue-router";
import {computed} from "vue";

const userStore = useUserStore();
const route = useRoute()

const path = computed(() => route.path)

</script>
<template>
  <nav>
    <NuxtLink
        v-for="item of NAV_ITEMS"
        v-show="item?.visibility"
        :to=item.page
        :key="item.page"
    >{{ item.name }}
    </NuxtLink>
    <NuxtLink v-if="!userStore.user.authStatus" to="/login">Авторизация</NuxtLink>
    <NuxtLink v-if="userStore.user.authStatus" to="/admin">Админка</NuxtLink>
  </nav>
</template>


<style scoped lang="scss">
@use "assets/variables" as *;
a {
  text-decoration: none;
  font-size: 16px;
  display: inline-block;
  margin: 0 10px;
  color: #fff;
  border-right: 2px solid #305152;
  padding-right: 10px;

  &:last-of-type {
    border-right: none;
  }
  &.router-link-active{
    text-shadow: $shadow-nav;
  }
}
</style>
