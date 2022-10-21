import { Form, Radio, Space } from 'antd'
import React, { useEffect, useState, forwardRef } from 'react'
import styles from './styles.module.scss'
import CCSelect from '@/components/CCSelect'
import { onSetFields, htmlContent } from '@/helper/Common'

const CCAddress = forwardRef(({ name, label }, ref) => {
  return (
    <>
      <Form.Item className={styles.newLine} label={htmlContent(label || '<b>Địa chỉ thường trú <i>(ĐDPL)</i></b>')}>
        <CCSelect.SelectProvince ref={ref} name={[...name, 'current']} label="Nơi đăng kí hộ khẩu thường trú" />
      </Form.Item>

      <CCSelect.RadioAddress prevField={[...name, 'current']} nextField={[...name, 'contact']} ref={ref} />
    </>
  )
})

export default CCAddress
