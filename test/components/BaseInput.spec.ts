// @vitest-environment happy-dom

import {it} from 'vitest'
import {mount} from "@vue/test-utils";
import BaseInput from "../../components/base/BaseInput.vue";




it.only('renders primary button by default', () => {
    const wrapper = mount(BaseInput)
    console.log(wrapper.html())
})
