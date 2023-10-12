import CCInput from '@/components/CCInput'
import { FormFieldText } from '@/constant/Common'
import t from '@/constant/CommonText'
import { numToWord } from '@/helper/Common'
import { Col, Form, InputNumber, Row } from 'antd'
import clsx from 'clsx'
import { forwardRef } from 'react'
import styles from './styles.module.scss'
import { useStepData } from '@/context/StepProgressContext'

const GiaTriGopVon = forwardRef((props, ref) => {
  const { BASE_FORM } = props
  const { currentStep } = useStepData()

  const checkInputValidation = (e) => {
    let pattern = /[1-9]/g
    ref.current.setFields([
      {
        name: [...BASE_FORM, 'base_val', 'char'],
        errors: (e.target.value.match(pattern) && ['Vui lòng không nhập kí tự khác ngoài chữ']) || [],
      },
    ])
  }

  let timer

  const onInputChange = (e) => {
    let numInp = ref.current.getFieldValue([...BASE_FORM, 'base_val', 'num'])

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      let transform = numToWord(numInp)
      let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)
      onSetFields([...BASE_FORM, 'base_val', 'char'], upperLetter)
    }, 350)
  }

  const onSetFields = (pathName, value) => {
    ref.current.setFields([
      {
        name: pathName,
        value: value,
      },
    ])
  }
  console.log('rendered Gia tri gop von')
  return (
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
        <Form.Item
          name={[...BASE_FORM, 'base_val', 'num']}
          label={t.num}
          required
          rules={[{ required: true }]}
        >
          <InputNumber
            step={1000}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            style={{ width: '100%' }}
            onChange={(e) => onInputChange(e)}
            stringMode
          />
        </Form.Item>
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          type="text"
          name={[...BASE_FORM, 'base_val', 'char']}
          label={t.char}
          onChange={(e) => checkInputValidation(e)}
          required
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <Form.Item name={[...BASE_FORM, 'base_val', 'par_value_shares']} label={t.par_value_shares}>
          <InputNumber
            type="text"
            addonAfter={'đ / Cổ phần'}
            step={1000}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>
      </Col>
    </Row>
  )
})

export default GiaTriGopVon
