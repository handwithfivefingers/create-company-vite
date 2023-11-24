import CCInput from '@/components/CCInput'
import { FormFieldText } from '@/constant/Common'
import { numToWord } from '@/helper/Common'
import { Col, Form, InputNumber, Row, Button } from 'antd'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { useStepData } from '@/context/StepProgressContext'
import { useStepAPI } from '@/context/StepProgressContext'
import { useFormAPI } from '../../../../context/FormProviderContext'
import { useEffect } from 'react'

const GiaTriGopVon = (props) => {
  const { BASE_FORM } = props
  const { currentStep } = useStepData()
  const [form] = Form.useForm()
  const { onNextStep, onPrevStep } = useStepAPI()
  const { createForm } = useFormAPI()

  useEffect(() => {
    createForm({ formProvider: 'create_company_approve', formName: 'base_val', form })
  }, [])

  const checkInputValidation = (e) => {
    let pattern = /[1-9]/g
    form.setFields([
      {
        name: ['char'],
        errors: (e.target.value.match(pattern) && ['Vui lòng không nhập kí tự khác ngoài chữ']) || [],
      },
    ])
  }

  let timer

  const onInputChange = (e) => {
    let numInp = form.getFieldValue('num')
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      let transform = numToWord(numInp)
      let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)
      onSetFields(['char'], upperLetter)
    }, 350)
  }

  const onSetFields = (pathName, value) => {
    form.setFields([
      {
        name: pathName,
        value: value,
      },
    ])
  }

  const onFinish = (value) => {
    console.log('value', value)

    // Validate here

    //  next step

    onNextStep()
  }
  return (
    <Form name="base_val" form={form} onFinish={onFinish} layout="vertical">
      <Row
        gutter={[16, 12]}
        className={clsx([
          styles.hide,
          props.className,
          {
            [styles.visible]: currentStep === 1,
          },
        ])}
      >
        <Col lg={12} md={12} sm={24} xs={24}>
          <Form.Item name={'num'} label={FormFieldText['base_val']['num']} required rules={[{ required: true }]}>
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{ width: '100%' }}
              onChange={onInputChange}
              stringMode
            />
          </Form.Item>
        </Col>

        <Col lg={12} md={12} sm={24} xs={24}>
          <CCInput
            type="text"
            name={'char'}
            label={'Vốn điều lệ (bằng chữ)'}
            onChange={checkInputValidation}
            required
          />
        </Col>
        <Col span={24}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default GiaTriGopVon
