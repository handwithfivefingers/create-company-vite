import { Col, Form, InputNumber, Row } from 'antd'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import CCInput from '@/components/CCInput'
import { FormFieldText } from '@/constant/Common'
import { to_vietnamese } from '@/helper/Common'
import styles from './styles.module.scss'

const GiaTriGopVon = forwardRef((props, ref) => {
  const { current, BASE_FORM } = props

  const checkInputValidation = (e) => {
    let pattern = /[1-9]/g
    ref.current.setFields([
      {
        name: [...BASE_FORM, 'base_val', 'char'],
        errors:
          (e.target.value.match(pattern) && [
            'Vui lòng không nhập kí tự khác ngoài chữ',
          ]) ||
          [],
      },
    ])
  }

  let timer

  const onInputChange = (e) => {
    let numInp = ref.current.getFieldValue([...BASE_FORM, 'base_val', 'num'])
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      let transform = to_vietnamese(numInp)
      onSetFields([...BASE_FORM, 'base_val', 'char'], transform)
    }, 1000)
  }

  const onSetFields = (pathName, value) => {
    ref.current.setFields([
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
          [styles.visible]: current === 1,
        },
      ])}
    >
      <Col lg={12} md={12} sm={24} xs={24}>
        <Form.Item
          name={[...BASE_FORM, 'base_val', 'num']}
          label={FormFieldText['base_val']['num']}
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            style={{ width: '100%' }}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Item>
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          type="text"
          name={[...BASE_FORM, 'base_val', 'char']}
          label={FormFieldText['base_val']['char']}
          onChange={(e) => checkInputValidation(e)}
        />
      </Col>
    </Row>
  )
})

export default GiaTriGopVon
