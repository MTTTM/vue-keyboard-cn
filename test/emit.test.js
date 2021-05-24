import { mount } from '@vue/test-utils'
import ParentComponent from '../testComponents/components/ParentComponent.vue'
import ChildComponent from '../testComponents/components/ChildComponent.vue'

describe('ParentComponent', () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = mount(ParentComponent)
    wrapper.find(ChildComponent).vm.$emit('custom')
    wrapper.vm.$nextTick(() => {
     expect(wrapper.html()).toContain('Emitted!')
    });
  })
})