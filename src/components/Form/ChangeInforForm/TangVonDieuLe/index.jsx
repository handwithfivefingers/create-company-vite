import { Col, Form, Row, InputNumber } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect } from 'react'
import CCInput from '@/components/CCInput'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import { onSetFields, htmlContent, numToWord } from '@/helper/Common'
const BASE_FORM = ['change_info', 'up_authorized_capital']

const TangVonDieuLe = forwardRef((props, ref) => {
  useEffect(() => {
    if (ref) {
      onSetFields(['change_info', 'up_authorized_capital', 'type'], 'Tăng vốn góp', ref)
    }
  }, [ref])

  let timer

  const handleInpChange = (e, pathName) => {
    let numInp = ref.current.getFieldValue([...pathName, 'num'])

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      let transform = numToWord(numInp)
      let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)

      onSetFields([...pathName, 'char'], upperLetter, ref)
    }, 500)
  }

  return (
    <Form.Item
      label={<h3>Đăng ký thay đổi vốn điều lệ</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item name={[...BASE_FORM, 'base_val', 'num']} label={htmlContent('Vốn điều lệ đã đăng ký <i>(bằng số)</i>')}>
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{ width: '100%' }}
              onChange={(e) => handleInpChange(e, [...BASE_FORM, 'base_val'])}
              stringMode
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <CCInput label={htmlContent('Vốn điều lệ đã đăng ký <i>(bằng chữ)</i>')} name={[...BASE_FORM, 'base_val', 'char']} />
        </Col>
        <Col span={12}>
          <Form.Item name={[...BASE_FORM, 'new_base_val', 'num']} label={htmlContent('Vốn điều lệ sau khi tăng <i>(bằng số)</i>')}>
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{ width: '100%' }}
              onChange={(e) => handleInpChange(e, [...BASE_FORM, 'new_base_val'])}
              stringMode
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <CCInput label={htmlContent('Vốn điều lệ sau khi tăng <i>(bằng chữ)</i>')} name={[...BASE_FORM, 'new_base_val', 'char']} />
        </Col>
      </Row>
    </Form.Item>
  )
})

export default TangVonDieuLe
