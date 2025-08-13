<script setup lang="ts">
import BaseInput from "~/components/base/BaseInput.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import {INPUT_TYPE} from "~/src/constant";
import {ref} from "vue";

const additionPlusOnce = ref(),
    additionPlusTwo = ref(),
    additionSum = ref()

const addition = (one = 0, two = 0) => {
  additionSum.value = one + two
}
const schema = {
  firstInput: {
    as: 'firstInput',
    placeholder: 'Имя',
    name: 'firstInput',
    type: 'text',
    label: 'Введите Имя',
    classStyle: 'baseInput'
  },
  lastInput: {
    as: 'lastInput',
    placeholder: 'Имя',
    name: 'lastInput',
    type: 'text',
    label: 'Введите Имя',
    classStyle: 'baseInput'
  },
}
</script>

<template>
  <h3>Прибавление
    <span v-if="additionPlusOnce">
        (
        {{ additionPlusOnce }}
        <span v-if="additionPlusTwo">+</span>
        {{ additionPlusTwo }}
        )
      </span>
  </h3>
  <div class="align-center d-inline-flex">
    <BaseInput
        v-model="additionPlusOnce"
        :schema="schema.firstInput"
        :inputType="INPUT_TYPE.number"
    />
    <div class="ml-4 mr-4">+</div>
    <BaseInput
        v-model="additionPlusTwo"
        :schema="schema.lastInput"
        :inputType="INPUT_TYPE.number"
    />
    <BaseButton
        @click="addition(additionPlusOnce,additionPlusTwo)"
        class="ml-4 mr-4"
    >=
    </BaseButton>
    <div>{{ additionSum }}</div>
  </div>
</template>

<style scoped lang="scss">

</style>
