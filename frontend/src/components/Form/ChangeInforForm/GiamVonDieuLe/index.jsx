import { Col, Form, Row, InputNumber } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect } from 'react'
import CCInput from '@/components/CCInput'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import { onSetFields, htmlContent, numToWord } from '@/helper/Common'
import { useStepData } from '../../../../context/StepProgressContext'
import { debounce } from 'lodash-es'

const BASE_FORM = ['change_info', 'down_authorized_capital']
const GiamVonDieuLe = (props) => {
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  useEffect(() => {
    formInstance.setFields([
      {
        name: ['change_info', 'down_authorized_capital', 'type'],
        value: 'Tăng vốn góp',
      },
    ])
  }, [])
  const handleInpChange = (e, pathName) => {
    let numInp = formInstance.getFieldValue([...pathName, 'num'])
    let transform = numToWord(numInp)
    let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)
    formInstance.setFields([
      {
        name: [...pathName, 'char'],
        value: upperLetter,
      },
    ])
  }

  return (
    <Form.Item
      label={<h3>Đăng ký thay đổi vốn điều lệ</h3>}
      className={clsx(styles.current, {
        [styles.active]: currentStep === props.index,
      })}
    >
      <Row gutter={[16, 0]}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            name={[...BASE_FORM, 'base_val', 'num']}
            label={htmlContent('Vốn điều lệ đã đăng ký <i>(bằng số)</i>')}
            required
            rules={[{ required: true, message: 'Vui lòng nhập Vốn điều lệ đã đăng ký!' }]}
          >
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{ width: '100%' }}
              onChange={debounce((e) => handleInpChange(e, [...BASE_FORM, 'base_val']), 500)}
              stringMode
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput
            label={htmlContent('Vốn điều lệ đã đăng ký <i>(bằng chữ)</i>')}
            name={[...BASE_FORM, 'base_val', 'char']}
            required
            message="Vui lòng nhập Vốn điều lệ đã đăng ký (bằng chữ)!"
          />
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            name={[...BASE_FORM, 'new_base_val', 'num']}
            label={htmlContent('Vốn điều lệ sau khi giảm <i>(bằng số)</i>')}
            required
            rules={[{ required: true, message: 'Vui lòng nhập Vốn điều lệ sau khi giảm!' }]}
          >
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{ width: '100%' }}
              onChange={debounce((e) => handleInpChange(e, [...BASE_FORM, 'new_base_val']), 500)}
              stringMode
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput
            label={htmlContent('Vốn điều lệ sau khi giảm <i>(bằng chữ)</i>')}
            name={[...BASE_FORM, 'new_base_val', 'char']}
            required
            message="Vui lòng nhập Vốn điều lệ sau khi giảm (bằng chữ)!"
          />
        </Col>
      </Row>
    </Form.Item>
  )
}

export default GiamVonDieuLe
