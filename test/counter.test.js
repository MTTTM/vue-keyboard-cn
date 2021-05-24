import { mount } from '@vue/test-utils'
import Counter from '../testComponents/components/counter'

describe('Counter', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(Counter)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // 也便于检查已存在的元素
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
  
  it('button click should increment the count', () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
})