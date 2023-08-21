import CCSelect from '@/components/CCSelect'
import { htmlContent } from '@/helper/Common'
import { Form } from 'antd'
import React, { forwardRef } from 'react'
import styles from './styles.module.scss'

const CCAddress = forwardRef(({ name, label, ...props }, ref) => {
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
        ref={ref}
        required={props?.required}
      />
    </>
  )
})

export default CCAddress
