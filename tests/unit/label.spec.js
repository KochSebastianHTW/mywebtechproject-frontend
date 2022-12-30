import Label from '@/components/Label'
import { mount } from '@vue/test-utils'

it.each`
  labelColor   | expected
  ${'#FF0000'} | ${'white'}
  ${'#FFF'}    | ${'black'}
  `('should return \'white\' or \'black\' depending on better contrast', ({ labelColor, expected }) => {
  // when
  const testLabel = {
    id: 1,
    name: 'Test',
    color: labelColor
  }
  mount(Label, {
    propsData: {
      label: testLabel
    }
  })
  const result = Label.methods.getContrast(labelColor)
  expect(result).toBe(expected)
})
