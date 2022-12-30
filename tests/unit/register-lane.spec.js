import moment from 'moment'
import RegisterLane from '@/components/RegisterLane'
import CardUpdateForm from '@/components/CardUpdateForm'
import { mount } from '@vue/test-utils'

describe('Testing \'RegisterLane.vue\'', () => {
  it('should render a card-update-form for each card', () => {
    // when
    const wrapper = mount(RegisterLane, {
      propsData: {
        cards: [
          {
            id: 1,
            name: 'Test 1',
            description: '',
            dueDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
            register: 'OPEN',
            label: null
          },
          {
            id: 1,
            name: 'and another one',
            description: 'yeah just for test purposes',
            dueDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
            register: 'OPEN',
            label: null
          }
        ],
        labels: []
      }
    })

    // then
    const cardUpdateForms = wrapper.findAllComponents(CardUpdateForm)
    expect(cardUpdateForms.length).toBe(2)
  })

  it('should render 4 card lists, one for each status', () => {
    // when
    const status1 = {
      displayName: 'Open',
      register: 'OPEN'
    }
    const status2 = {
      displayName: 'In Progress',
      register: 'IN_PROGRESS'
    }
    const status3 = {
      displayName: 'Done',
      register: 'DONE'
    }
    const status4 = {
      displayName: 'Archive',
      register: 'ARCHIVE'
    }
    const wrapper = mount(RegisterLane, {
      propsData: {
        status: [
          status1,
          status2,
          status3,
          status4
        ],
        cards: [
          {
            id: 1,
            name: 'Test 1',
            description: '',
            dueDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
            register: 'OPEN',
            label: null
          },
          {
            id: 1,
            name: 'and another one',
            description: 'yeah just for test purposes',
            dueDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
            register: 'OPEN',
            label: null
          }
        ],
        labels: []
      }
    })

    // then
    let cardLists = 0
    while (wrapper.find('#cardList')) {
      cardLists++
    }
    expect(cardLists).toBe(4)
  })
})
