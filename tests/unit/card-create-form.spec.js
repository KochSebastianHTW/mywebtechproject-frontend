import CardCreateForm from '@/components/CardCreateForm'
import { mount } from '@vue/test-utils'
import moment from 'moment'

describe('Testing \'CardCreateForm.vue\'', () => {
  it('should not show form by default', () => {
    // when
    const wrapper = mount(CardCreateForm, {
      propsData: {
        labels: [
          {
            id: 1,
            name: 'Test',
            color: '#EED202'
          }
        ]
      }
    })

    // then
    expect(wrapper.find('#CardCreation').classes()).not.toContain('show')
  })

  it('should set dueDate by default to current date and time', () => {
    // when
    const wrapper = mount(CardCreateForm, {
      propsData: {
        labels: [
          {
            id: 1,
            name: 'Test',
            color: '#EED202'
          }
        ]
      },
      data () {
        return {
          name: 'Hello',
          description: 'my name is Mike',
          dueDate: null,
          labelId: '',
          serverValidationMessages: []
        }
      }
    })

    wrapper.vm.clearCard()
    // then
    expect(wrapper.vm.name).toBe('')
    expect(wrapper.vm.description).toBe('')
    expect(wrapper.vm.dueDate).toBe(moment(new Date()).format('YYYY-MM-DDTHH:mm'))
    expect(wrapper.vm.labelId).toBe(null)
  })
})
