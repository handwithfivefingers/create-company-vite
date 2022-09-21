import { Button, Form, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'

import CCAddress from '../../../CCAddress'
import CCSelect from '../../../CCSelect'
import { onSetFields } from '@/helper/Common'
import styles from './styles.module.scss'
const BASE_FORM = ['change_info', 'legal_representative']

const DaiDienPhapLuat = forwardRef((props, ref) => {
  useEffect(() => {
    onSetFields(['change_info', 'legal_representative', 'national'], 'Việt Nam', ref)
  }, [ref])

  return (
    <Form.Item
      label={<h4>Đăng ký thay đổi người đại diện theo pháp luật</h4>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label="Bỏ bớt hoặc thêm mới nguòi đại diện">
        <Select>
          <Select.Option value={1}>Bỏ bớt người đại diện</Select.Option>
          <Select.Option value={2}>Thêm mới người đại diện</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Danh sách người đại diện pháp luật sau khi thay đổi">
        <Form.Item label="Danh sách người đại diện">
          <Select>
            <Select.Option value={1}>Bỏ bớt người đại diện</Select.Option>
            <Select.Option value={2}>Thêm mới người đại diện</Select.Option>
          </Select>
        </Form.Item>
      </Form.Item>

      {/*       
      <CCInput label="Tên người đại diện pháp luật cũ" name={[...BASE_FORM, 'old_name']} />

      <CCInput type="select" name={[...BASE_FORM, 'old_title']} label="Chức danh" options={SELECT.TITLE} />

      <Form.Item label="Thông tin người đại diện theo pháp luật sau khi thay đổi">
        <CCInput label="Họ và tên" name={[...BASE_FORM, 'new_name']} />

        <CCInput type="select" name={[...BASE_FORM, 'gender']} label="Giới tính" options={SELECT.GENDER} />

        <CCInput type="select" name={[...BASE_FORM, 'new_title']} label="Chức danh" options={SELECT.TITLE} />

        <CCInput name={[...BASE_FORM, 'birth_day']} label="Sinh ngày" type="date" />

        <CCSelect.SelectPersonType ref={ref} name={[...BASE_FORM, 'per_type']} label="Dân tộc" placeholder="Bấm vào đây" />

        <CCInput name={[...BASE_FORM, 'national']} label="Quốc tịch" />

        <CCInput type="select" name={[...BASE_FORM, 'doc_type']} label="Loại giấy tờ pháp lý" options={SELECT.DOC_TYPE} />

        <CCInput name={[...BASE_FORM, 'doc_code']} label="Số CMND/ CCCD/ Hộ chiếu" />

        <CCInput name={[...BASE_FORM, 'doc_time_provide']} label="Ngày cấp" type="date" />

        <CCSelect.SelectDocProvide ref={ref} name={[...BASE_FORM, 'doc_place_provide']} label="Nơi cấp" placeholder="Bấm vào đây" />

        <CCAddress BASE_FORM={BASE_FORM} ref={ref} />
      </Form.Item> */}
    </Form.Item>
  )
})

const ExcludePeople = forwardRef((props, ref) => {
  const { BASE_FORM } = props
  const FORM_NAME = [...BASE_FORM, 'exclude']

  return (
    <>
      <CCInput label="Họ và tên" name={[...FORM_NAME, 'name']} />
      <CCInput type="select" name={[...FORM_NAME, 'title']} label="Chức danh" options={SELECT.TITLE} />
    </>
  )
})

const IncludePeople = forwardRef((props, ref) => {
  
  const { BASE_FORM, type } = props

  const FORM_NAME = [...BASE_FORM, 'include']

  return (
    <>
      <CCInput label="Tên người đại diện pháp luật cũ" name={[...FORM_NAME, 'name']} />

      <CCInput type="select" name={[...FORM_NAME, 'title']} label="Chức danh" options={SELECT.TITLE} />

      <CCSelect.SelectTitle
        name={[...BASE_FORM, 'title']}
        label="Chức danh"
        placeholder="Bấm vào đây"
        options={+type === 1 ? SELECT.TITLE_1TV : +type === 2 ? SELECT.TITLE_2TV : +type === 3 ? SELECT.TITLE_CP : ''}
        ref={ref}
      />
    </>
  )
})

export default DaiDienPhapLuat
