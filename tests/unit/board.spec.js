import RegisterLane from '@/components/RegisterLane'
import LabelDisplay from '@/components/LabelDisplay'
import Board from '@/views/Board'
import { mount } from '@vue/test-utils'

describe("Testing 'Board.vue'", () => {
  it('should have register lane component', () => {
    // when
    const wrapper = mount(Board, {
      propsData: {
        cards: [],
        labels: []
      }
    })

    // then
    const registerLane = wrapper.findComponent(RegisterLane)
    expect(registerLane.exists()).toBeTruthy()
  })

  it('should have label display component', () => {
    // when
    const wrapper = mount(Board, {
      propsData: {
        cards: [],
        labels: []
      }
    })

    // then
    expect(wrapper.find('#labelDisplayButton').findComponent(LabelDisplay)).toBeTruthy()
  })
})
