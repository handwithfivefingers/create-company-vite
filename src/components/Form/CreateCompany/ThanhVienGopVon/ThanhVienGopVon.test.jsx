import { render } from '@/test/test-utils'
import React from 'react'
import { describe, test } from 'vitest'
import ThanhVienGopVon from '.'
import { FormProviderTesting } from '../CreateCompany.test'
const BASE_FORM = ['create_company', 'approve']
describe('ThanhVienGopVon Screen', () => {
  test('Should rendered', () => {
    const ref = React.createRef()
    render(
      <FormProviderTesting>
        <ThanhVienGopVon ref={ref} BASE_FORM={BASE_FORM} />
      </FormProviderTesting>,
    )
  })
})
