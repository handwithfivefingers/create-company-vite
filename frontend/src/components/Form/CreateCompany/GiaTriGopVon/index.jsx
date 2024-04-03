import CCInput from '@/components/CCInput'
import t from '@/constant/CommonText'
import { useStepData } from '@/context/StepProgressContext'
import { numToWord } from '@/helper/Common'
import { Col, Form, InputNumber, Row } from 'antd'
import clsx from 'clsx'
import { memo } from 'react'
import styles from './styles.module.scss'

const GiaTriGopVon = memo((props) => {
  const { BASE_FORM } = props
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  const checkInputValidation = (e) => {
    let pattern = /[1-9]/g
    formInstance.setFields([
      {
        name: [...BASE_FORM, 'base_val', 'char'],
        errors: (e.target.value.match(pattern) && ['Vui lòng không nhập kí tự khác ngoài chữ']) || [],
      },
    ])
  }
  // const base_val = useOrder(['createCompany', 'approve', 'base_val'])
  let timer

  const onInputChange = (e) => {
    let numInp = formInstance.getFieldValue([...BASE_FORM, 'base_val', 'num'])
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      let transform = numToWord(numInp)
      let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)
      setFields([...BASE_FORM, 'base_val', 'char'], upperLetter)
    }, 350)
  }

  const setFields = (pathName, value) => {
    formInstance.setFields([
      {
        name: pathName,
        value: value,
      },
    ])
  }
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
        <Form.Item name={[...BASE_FORM, 'base_val', 'num']} label={t.num} required rules={[{ required: true }]}>
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
    </Row>
  )
})
export default GiaTriGopVon
