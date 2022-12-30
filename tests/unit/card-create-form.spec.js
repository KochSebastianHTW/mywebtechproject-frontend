import CardCreateForm from '@/components/CardCreateForm'
import { mount } from '@vue/test-utils'

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
})
