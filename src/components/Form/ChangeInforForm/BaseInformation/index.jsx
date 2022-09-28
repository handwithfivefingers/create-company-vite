import clsx from 'clsx'
import React from 'react'
import CCInput from '../../../CCInput'
import CCListForm from '@/components/CCListForm'
import { Form, InputNumber } from 'antd'
import { forwardRef } from 'react'
import CCSelect from '../../../CCSelect'
import styles from './styles.module.scss'
import { SELECT } from '@/constant/Common'
import { PENDING_FORM } from '@/constant/FormConstant'

const BaseInformation = forwardRef((props, ref) => {
  const BASE_FORM = ['change_info', 'base_inform']

  let listForm = [
    {
      label: PENDING_FORM.approve.fields.contribute_members.fields.name,
      placeholder: 'NGUYỄN VĂN A',
      name: 'name',
      onChange: true,
      options: {
        toUpperCase: true,
        compare: {
          end: 5,
          index: 2,
        },
        customLabel: 'Nhập tên thành viên góp vốn thứ ',
      },
    },
    {
      label: PENDING_FORM.approve.fields.contribute_members.fields.capital,
      placeholder: '80,000,000',
      name: 'capital',
      options: {
        column: 12,
        layout: 'horizontal',
        format: true,
        formatter: (v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`,
      },
    },
    {
      label: PENDING_FORM.approve.fields.contribute_members.fields.capital_percent,
      placeholder: '80',
      name: 'capital_percent',
      options: {
        column: 12,
        layout: 'horizontal',
        format: true,
        formatter: (v) => `${v.replace('%', '')}%`,
        max: 100,
        min: 0,
        length: 3,
      },
    },
  ]
  return (
    <div
      className={clsx(styles.current, {
        [styles.active]: props.current === 1,
      })}
    >
      <CCInput
        label="Tên doanh nghiệp"
        name={['change_info', 'base_inform', 'company_name']}
        onChange={(e) => onSetFields(['change_info', 'base_inform', 'company_name'], e.target.value, ref, true)}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
      />

      <CCInput label="Mã số doanh nghiệp hoặc Mã số thuế" name={['change_info', 'base_inform', 'mst']} placeholder="0316184427" />

      <CCInput
        label={<div dangerouslySetInnerHTML={{ __html: '</>Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i></>' }} />}
        name={['change_info', 'base_inform', 'org_person']}
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => onSetFields(['change_info', 'base_inform', 'org_person'], e.target.value, ref, true)}
      />

      <Form.Item label={'Địa chỉ trụ sở chính'}>
        <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'location']} placeholder="Địa chỉ trụ sở chính" />
      </Form.Item>
      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '<b>Địa chỉ trụ sở chính</b>',
            }}
          />
        }
      >
        <CCSelect.SelectProvince ref={ref} label={'Địa chỉ trụ sở chính'} name={[...BASE_FORM, 'location']} placeholder="Địa chỉ trụ sở chính" />{' '}
      </Form.Item>

      <CCListForm
        label="Hội đồng thành viên"
        BASE_FORM={BASE_FORM}
        listForm={listForm}
        formLength={5}
        defaultLength={2}
        btnText="Thêm thành viên góp vốn (nếu có)"
        listName="contribute_members"
        ref={ref}
      />
    </div>
  )
})

export default BaseInformation
