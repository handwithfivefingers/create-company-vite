import CCSelect from '@/components/CCSelect'
import { htmlContent } from '@/helper/Common'
import { Form } from 'antd'
import React, { forwardRef } from 'react'
import styles from './styles.module.scss'

const CCAddress = ({ name, label, ...props }) => {
  const formInstance = Form.useFormInstance()
  const handleRadioAddressChange = (val) => {
    if (val === 1) {
      const mirrorValue = formInstance.getFieldValue([...name, 'current'])
      formInstance.setFields([
        {
          name: [...name, 'contact'],
          value: mirrorValue,
        },
      ])
    } else {
      formInstance.setFields([
        {
          name: [...name, 'contact'],
          value: {},
        },
      ])
    }
    if (props?.onChange) {
      props?.onChange(val)
    }
  }
  return (
    <>
      <Form.Item className={styles.newLine} label={htmlContent(label || '<b>Địa chỉ thường trú <i>(ĐDPL)</i></b>')}>
        <CCSelect.SelectProvince
          name={[...name, 'current']}
          label="Nơi đăng kí hộ khẩu thường trú"
          required={props?.required}
        />
      </Form.Item>

      <CCSelect.RadioAddress
        prevField={[...name, 'current']}
        nextField={[...name, 'contact']}
        required={props?.required}
        onChange={handleRadioAddressChange}
      />
    </>
  )
}

export default CCAddress
