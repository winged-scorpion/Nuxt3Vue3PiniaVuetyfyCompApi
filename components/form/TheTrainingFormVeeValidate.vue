<script setup lang="ts">

import {Form as VeeForm} from 'vee-validate'
import {string} from 'yup';

import BaseInput from "~/components/base/BaseInput.vue";
import {INPUT_TYPE} from "~/src/constant";
import type {InputList} from "~/model/inputList";

const schema = {
  firstName: {
    as: 'firstName',
    placeholder: 'Имя',
    name: 'firstName',
    type: 'text',
    label: 'Введите Имя',
    classStyle: 'baseInput'
  },
  lastName: {
    as: 'lastName',
    placeholder: 'Фамилия',
    name: 'lastName',
    type: 'text',
    label: 'Введите Фамилия',
    classStyle: 'baseInput'
  },

  secondName: {
    as: 'secondName',
    placeholder: 'Отчество',
    name: 'secondName',
    type: 'text',
    label: 'Введите Отчество',
    classStyle: 'baseInput'
  },
  email: {
    as: 'email',
    placeholder: 'Email',
    name: 'email',
    type: 'text',
    label: 'Введите Email',
    classStyle: 'baseInput'
  },
  password: {
    as: 'password',
    placeholder: 'Пароль',
    name: 'password',
    type: 'text',
    label: 'Введите Пароль',
    classStyle: 'baseInput'
  }
}
import * as yup from "yup"
import {ref} from "vue";

const validationSchema = computed(() => {
  let schema = {
    firstName: yup.string().required('Имя обязательно к заполнению'),
    lastName: hideField.value ? yup.string() : yup.string().required('Фамилия обязательна к заполнению'),
    email: string().required('Укажите ваш емаил').email('Проверьте корректность введенного email'),
    password: string().required('Укажите пароль').min(1, 'Пароль слишком короткий').max(10, 'Пароль слишком длинный'),
    secondName: string().nullable().notRequired()
  };
  return yup.object(schema);
});

const formData = reactive({
  lastName: '',
  firstName: '',
  secondName: '',
  email: '',
  password: '',
  value: '',
  moreInput: <InputList[]>[]
})

function dopField() {
  let randomFieldId = fieldId(0, 100)
  formData.moreInput.push({
    inputId: randomFieldId,
    value: ''
  })
}

function fieldId(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function fieldDelete(fieldId: number) {
  formData.moreInput = formData.moreInput.filter(x => x.inputId !== fieldId)
}

let hiddenButton = {
  show: true,
  value: 'скрыть'
}
let hideField = ref(false);

</script>

<template>
  <h3>Валидация VeeValidate</h3>
  <VeeForm
      v-slot="{ handleSubmit, meta }"
      :validation-schema="validationSchema"
      as="div"
  >
    <form
        class="form">
      <BaseInput
          v-model="formData.firstName"
          :schema="schema.firstName"
          :inputType="INPUT_TYPE.text"
      />
      <div v-if="!hideField">
        <BaseInput
            v-model="formData.lastName"
            :schema="schema.lastName"
            :inputType="INPUT_TYPE.text"
            ref="inputRef"
        />
        <base-button
            @click.prevent="hideField = !hideField"
        >{{ hiddenButton.value }}
        </base-button>
      </div>


      <BaseInput
          v-model="formData.secondName"
          :schema="schema.secondName"
          :inputType="INPUT_TYPE.text"
      />
      <BaseInput
          v-model="formData.email"
          :inputType="INPUT_TYPE.text"
          :schema="schema.email"
      />
      <BaseInput
          v-model="formData.password"
          :inputType="INPUT_TYPE.text"
          :schema="schema.password"
      />
      <div class="form__field">
        <textarea v-model="formData.value" placeholder="Сообщение"></textarea>
        <span></span>
      </div>
      <div class="form_container">
        <div
            v-for="(item, index) of formData.moreInput"
            class="form__dop-input"
        >
          <div>
            {{ index }}
          </div>
          <input type="text" :value="item.value">
          <base-button
              @click.prevent="fieldDelete(item.inputId)"
              class="form__fieldDelete"
          >delete {{ item.inputId }}
          </base-button>
        </div>
      </div>
      <div class="form__field">
        <base-button
            @click.prevent="dopField"
        >Добавить поле
        </base-button>
      </div>

      <div class="form__field">
        <base-button :disabled="!meta.valid" type="submit">{{ meta.valid }}</base-button>
        <base-button @click="showFormData" type="submit">Проверка валидаций</base-button>
      </div>
    </form>
  </VeeForm>
</template>

<style scoped lang="scss">
input[type=text], textarea {
  border: gray solid 1px;
  padding: 3px 10px;
  font-size: 14px;
  margin: 0;
  resize: none;
  vertical-align: top;
}

.form {
  &__field {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  &__container {
    padding: 10px;
    border: solid 1px #000;
  }

  &__dop-input {
    display: flex;
    gap: 10px;
    margin: 10px 0;
    align-items: center;
    padding: 0 0 0 10px;
  }

  &__fieldDelete {
    padding: 0 10px;
    background: red;
    min-width: 0;
    border: solid 2px rgb(95, 158, 160);
    color: #fff;
  }
}

</style>
