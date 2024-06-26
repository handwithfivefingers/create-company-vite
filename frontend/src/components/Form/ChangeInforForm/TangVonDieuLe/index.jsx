import CCInput from '@/components/CCInput'
import { htmlContent, numToWord } from '@/helper/Common'
import { Col, Form, InputNumber, Row } from 'antd'
import clsx from 'clsx'
import debounce from 'lodash-es/debounce'
import React from 'react'
import { useStepData } from '../../../../context/StepProgressContext'
import styles from '../DaiDienPhapLuat/styles.module.scss'
const BASE_FORM = ['change_info', 'up_authorized_capital']
let timer

const TangVonDieuLe = (props) => {
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()

  const handleInpChange = (e, pathName) => {
    let numInp = formInstance.getFieldValue([...pathName, 'num'])

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      let transform = numToWord(numInp)
      let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)
      formInstance.setFields([
        {
          name: [...pathName, 'char'],
          value: upperLetter,
        },
      ])
    }, 500)
  }

  return (
    <Form.Item
      label={<h3>Đăng ký thay đổi vốn điều lệ</h3>}
      className={clsx(styles.current, {
        [styles.active]: currentStep === props.index,
      })}
    >
      <Row gutter={[16, 0]}>
        <Col md={24}>
          {props.type === 1 && (
            <CCInput.Select
              label="Hình thức tăng vốn"
              name={[...BASE_FORM, 'type']}
              options={[
                { name: 'Chủ sở hữu công ty góp thêm vốn', value: 1 },
                { name: 'Huy động thêm vốn góp của người khác', value: 2 },
              ]}
            />
          )}
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            name={[...BASE_FORM, 'base_val', 'num']}
            label={htmlContent('Vốn điều lệ đã đăng ký <i>(bằng số)</i>')}
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
          />
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            name={[...BASE_FORM, 'new_base_val', 'num']}
            label={htmlContent('Vốn điều lệ sau khi tăng <i>(bằng số)</i>')}
          >
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{ width: '100%' }}
              onChange={(e) => handleInpChange(e, [...BASE_FORM, 'new_base_val'])}
              stringMode
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput
            label={htmlContent('Vốn điều lệ sau khi tăng <i>(bằng chữ)</i>')}
            name={[...BASE_FORM, 'new_base_val', 'char']}
          />
        </Col>
      </Row>
    </Form.Item>
  )
}

export default TangVonDieuLe
