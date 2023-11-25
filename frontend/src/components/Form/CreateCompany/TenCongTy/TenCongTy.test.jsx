import { describe, test } from 'vitest'
import { render } from '@/test/test-utils'
import TenCongTy from '.'
import React from 'react'
import { FormProviderTesting } from '../CreateCompany.test'
const BASE_FORM = ['create_company', 'approve']
describe('TenCongTy Screen', () => {
  test('Should rendered', () => {
    const ref = React.createRef()
    render(
      <FormProviderTesting>
        <TenCongTy ref={ref} BASE_FORM={BASE_FORM} />
      </FormProviderTesting>,
    )
  })
})

