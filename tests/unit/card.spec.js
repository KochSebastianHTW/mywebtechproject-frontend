import moment from 'moment/moment'
import Card from '@/components/Card'
import { mount } from '@vue/test-utils'

describe('Testing \'Card.vue\'', () => {
  it('should render name', () => {
    // when
    const wrapper = mount(Card, {
      propsData: {
        card: {
          id: 1,
          name: 'Test 1',
          description: '',
          dueDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
          register: 'OPEN',
          label: null
        }
      }
    })
    const cardHeader = wrapper.find('#cardHeader')
    expect(cardHeader.text()).toBe('Test 1')
  })
})
