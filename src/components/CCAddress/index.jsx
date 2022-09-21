import { Form, Radio, Space } from 'antd'
import React, { useEffect, useState, forwardRef } from 'react'
import styles from './styles.module.scss'
import CCSelect from '@/components/CCSelect'
import { onSetFields } from '@/helper/Common'

const CCAddress = forwardRef(({ BASE_FORM }, ref) => {
  const [radio, setRadio] = useState(null)
  const onRadioChange = (e) => {
    setRadio(e.target.value)

    if (e.target.value === 1) {
      let val = ref.current.getFieldValue([...BASE_FORM, 'current'])
      onSetFields([...BASE_FORM, 'contact'], val, ref)
    }
  }
  return (
    <>
      <Form.Item
        className={styles.newLine}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ thường trú <i>(ĐDPL)</i></b></>',
            }}
          />
        }
      >
        <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'current']} label="Nơi đăng kí hộ khẩu thường trú" />
      </Form.Item>

      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ liên lạc <i>(ĐDPL)</i><b></>',
            }}
          />
        }
        className={styles.newLine}
      >
        <Radio.Group onChange={onRadioChange} value={radio}>
          <Space direction="vertical">
            <Radio value={1}>Giống với địa chỉ thường trú</Radio>
            <Radio value={2}>Khác</Radio>
          </Space>
        </Radio.Group>

        {
          <div
            style={{
              padding: '8px 0',
              opacity: radio && radio === 2 ? '1' : '0',
              visibility: radio && radio === 2 ? 'visible' : 'hidden',
              display: radio && radio === 2 ? 'block' : 'none',
            }}
          >
            <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'contact']} label="Nơi ở hiện tại" />
          </div>
        }
      </Form.Item>
    </>
  )
})

export default CCAddress
