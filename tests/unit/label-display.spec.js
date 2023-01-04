import { mount } from '@vue/test-utils'
import LabelDisplay from '@/components/LabelDisplay'
import LabelCreateForm from '@/components/LabelCreateForm'

describe("Testing 'LabelDisplay.vue'", () => {
  it('should have LabelCreateForm component', () => {
    // when
    const wrapper = mount(LabelDisplay, {
      propsData: {
        cards: [],
        labels: []
      }
    })

    // then
    const registerLane = wrapper.findComponent(LabelCreateForm)
    expect(registerLane.exists()).toBeTruthy()
  })
})
