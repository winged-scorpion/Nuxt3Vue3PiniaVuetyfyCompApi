<script setup lang="ts">

import {INPUT_TYPE} from "~/src/constant";
import {ref} from "vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseButton from "~/components/base/BaseButton.vue";

const
    additionMulOnce = ref(),
    additionMulTwo = ref(),
    additionMultiplier = ref();
const multiplication = (one = 0, two = 0) => {
  additionMultiplier.value = one * two
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
  <h3>Умножение
    <span v-if="additionMulOnce">
        (
        {{ additionMulOnce }}
        <span v-if="additionMulTwo">*</span>
        {{ additionMulTwo }}
        )
      </span>
  </h3>
  <div class="align-center d-inline-flex">
    <BaseInput
        v-model="additionMulOnce"
        :schema="schema.firstInput"
        :inputType="INPUT_TYPE.number"
    />
    <div class="ml-4 mr-4">*</div>
    <BaseInput
        v-model="additionMulTwo"
        :schema="schema.lastInput"
        :inputType="INPUT_TYPE.number"
    />
    <BaseButton
        @click="multiplication(additionMulOnce,additionMulTwo)"
        class="ml-4 mr-4"
    >=
    </BaseButton>
    <div>{{ additionMultiplier }}</div>
  </div>
</template>

<style scoped lang="scss">

</style>
