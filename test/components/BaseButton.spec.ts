// @vitest-environment happy-dom

import {expect, it} from 'vitest'
import {mount} from "@vue/test-utils";

import BaseButton from "../../components/base/BaseButton.vue";

it('renders primary button by default', () => {
    const label = 'label'

    const wrapper = mount(BaseButton,{
        slots: {
            default: label
        },
        props: {
            textV: ''
        }
    })
    expect(wrapper.html()).toContain('label')
})
