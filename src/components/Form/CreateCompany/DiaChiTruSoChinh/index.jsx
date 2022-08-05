import { Form } from 'antd'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import CCInput from '@/components/CCInput'
import styles from '../CreateCompany.module.scss'
import CCSelect from '../../../CCSelect'

const DiaChiTruSoChinh = forwardRef((props, ref) => {
  const { BASE_FORM, current } = props

  return (
    <Form.Item
      label={<h2>Địa chỉ đặt trụ sở</h2>}
      className={clsx([
        styles.hide,
        {
          [styles.visible]: current === 5,
        },
      ])}
    >
      <Form.Item l
      label={
        <div
          dangerouslySetInnerHTML={{
            __html: '</><b>Địa chỉ trụ sở chính<b></>',
          }}
        />
      }
      >
        <CCSelect.SelectProvince
          ref={ref}
          name={[...BASE_FORM, 'core', 'address']}
          label="Nơi cấp"
        />
        <CCInput
          label="Số điện thoại liên hệ"
          name={[...BASE_FORM, 'core', 'contact', 'phone']}
        />

        <CCInput
          type="email"
          label="Email liên hệ (nếu có)"
          name={[...BASE_FORM, 'core', 'contact', 'email']}
        />
      </Form.Item>

    </Form.Item>
  )
})

export default DiaChiTruSoChinh
