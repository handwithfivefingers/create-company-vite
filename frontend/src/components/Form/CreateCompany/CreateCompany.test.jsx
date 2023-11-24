import { render } from '@/test/test-utils'
import { describe, test } from 'vitest'
import CreateCompany from '.'
import { Form } from 'antd'
// import { Form } from 'antd'

describe('CreateCompany Screen', () => {
  test('Should rendered', () => {
    render(<CreateCompany />)
  })
})

const FormProviderTesting = ({ children }) => {
  const [form] = Form.useForm()
  return <Form form={form}>{children}</Form>
}

export { FormProviderTesting }

// const FormProvider = ({ children }) => {
//   const [form] = Form.useForm()
//   return <Form form={form}>{children}</Form>
// }

// const createCompanyRender = (ui, options) => render(ui, { wrapper: FormProvider, ...options })

// // re-export everything
// export * from '@testing-library/react'
// // override render method
// export { createCompanyRender }
