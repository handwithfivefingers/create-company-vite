import { Form } from 'antd'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import CCInput from '@/components/CCInput'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import { htmlContent } from '@/helper/Common'
const TenDoanhNghiep = forwardRef((props, ref) => {
  const base_type = [
    {
      name: 'Đăng ký thay đổi trên cơ sở tách doanh nghiệp',
      value: 'Đăng ký thay đổi trên cơ sở tách doanh nghiệp',
    },
    {
      name: 'Đăng ký thay đổi trên cơ sở sáp nhập doanh nghiệp',
      value: 'Đăng ký thay đổi trên cơ sở sáp nhập doanh nghiệp',
    },
  ]

  return (
    <Form.Item
      label={<h3>Đăng ký thay đổi tên doanh nghiệp</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label={htmlContent('<b>Thay đổi tên công ty thành</b>')}>
        <CCInput label="Tên công ty bằng tiếng Việt" name={['change_info', 'name', 'name_vi']} />

        <CCInput label={htmlContent('Tên công ty bằng tiếng nước ngoài <i>(chỉ điền nếu có thay đổi)</i>')} name={['change_info', 'name', 'name_en']} />

        <CCInput label={htmlContent('Tên công ty viết tắt <i>(chỉ điền nếu có thay đổi)</i>')} name={['change_info', 'name', 'name_etc']} />

        <p>Note: Validating Company name</p>
      </Form.Item>
    </Form.Item>
  )
})

export default TenDoanhNghiep
