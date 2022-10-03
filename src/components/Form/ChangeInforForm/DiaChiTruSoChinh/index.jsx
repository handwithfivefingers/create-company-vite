import { Form } from 'antd'

import React, { forwardRef } from 'react'

import CCSelect from '@/components/CCSelect'

import { htmlContent } from '@/helper/Common'

import clsx from 'clsx'

import styles from '../DaiDienPhapLuat/styles.module.scss'

const BASE_FORM = ['change_info', 'location']

const DiaChiTruSoChinh = forwardRef((props, ref) => {
  return (
    <Form.Item
      label={<h3>Đăng ký thay đổi địa chỉ trụ sở chính</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label={htmlContent('<b>Địa chỉ trụ sở hiện tại</b>')}>
        <CCSelect.SelectProvince ref={ref} label={'Địa chỉ trụ sở chính'} name={[...BASE_FORM, 'old']} placeholder="Địa chỉ trụ sở chính" />
      </Form.Item>

      <Form.Item label={htmlContent('<b>Địa chỉ trụ sở sau khi thay đổi</b>')}>
        <CCSelect.SelectProvince ref={ref} label={'Địa chỉ trụ sở chính'} name={[...BASE_FORM, 'new_location']} placeholder="Địa chỉ trụ sở chính" />
      </Form.Item>
    </Form.Item>
  )
})

export default DiaChiTruSoChinh
