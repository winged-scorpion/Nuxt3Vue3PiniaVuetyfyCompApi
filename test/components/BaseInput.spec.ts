// @vitest-environment happy-dom

import {describe, expect, it} from 'vitest'
import {mount} from "@vue/test-utils";
import BaseInput from "../../components/base/BaseInput.vue";
import type {PropType} from "vue";
import type {SchemaItem} from "~/model/schema";


it.only('renders primary button by default', () => {
    const propsSchema = Object as PropType<SchemaItem>
    const wrapper = mount(BaseInput, {
        
    })
    expect(wrapper.html())
})

