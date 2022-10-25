import clsx from 'clsx'
import React from 'react'
import CCInput from '../../../CCInput'
import CCListForm from '@/components/CCListForm'
import { Form, InputNumber, Space, Button, Row, Col } from 'antd'
import { forwardRef, useMemo, useState, useEffect } from 'react'
import CCSelect from '../../../CCSelect'
import styles from './styles.module.scss'
import { SELECT } from '@/constant/Common'
import { PENDING_FORM } from '@/constant/FormConstant'
import { htmlContent, onSetFields } from '../../../../helper/Common'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const BaseInformation = forwardRef((props, ref) => {
  const BASE_FORM = ['change_info', 'base_inform']

  const renderFormByType = useMemo(() => {
    let type = props?.type
    let xhtml = null

    if (type) {
      if (+type === 3) {
        let listForm = [
          {
            label: 'Tên Chủ tịch HĐQT',
            placeholder: 'NGUYỄN VĂN A',
            name: ['president'],
            onChange: true,
            options: {
              toUpperCase: true,
              compare: {
                end: 5,
                index: 2,
              },
              customLabel: 'Thành viên HĐQT ',
            },
          },
          {
            label: 'Cổ phần đang sở hữu',
            placeholder: '80,000,000',
            name: ['capital'],
            options: {
              column: 12,
              layout: 'horizontal',
              format: true,
              formatter: (v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`,
            },
          },
          {
            label: 'Chiếm % vốn điều lệ',
            placeholder: '80',
            name: ['capital_percent'],
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

        xhtml = (
          <Col span={24}>
            <CCListForm
              label="Hội đồng quản trị"
              BASE_FORM={BASE_FORM}
              listForm={listForm}
              formLength={5}
              defaultLength={3}
              btnText="Thêm thành viên HĐQT (nếu có)"
              listName="list_president"
              ref={ref}
            />
            <Form.Item label="Tổng số vốn điều lệ" name={[...BASE_FORM, 'total_capital']}>
              <InputNumber
                placeholder="100,000,000"
                // stringMode
                formatter={(v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        )
      } else if (+type === 2) {
        let listForm = [
          {
            label: 'Hội đồng thành viên',
            placeholder: 'NGUYỄN VĂN A',
            name: ['name'],
            onChange: true,
            options: {
              toUpperCase: true,
              compare: {
                end: 5,
                index: 2,
              },
              customLabel: 'Thành viên góp vốn thứ ',
            },
          },
          {
            label: PENDING_FORM.approve.fields.contribute_members.fields.capital,
            placeholder: '80,000,000',
            name: ['capital'],
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
            name: ['capital_percent'],
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

        xhtml = (
          <Col span={24}>
            <CCListForm
              BASE_FORM={BASE_FORM}
              listForm={listForm}
              formLength={5}
              defaultLength={2}
              btnText="Thêm thành viên góp vốn (nếu có)"
              listName="contribute_members"
              ref={ref}
            />
          </Col>
        )
      }
    }
    return xhtml
  }, [props?.type])

  return (
    <div
      className={clsx(styles.current, {
        [styles.active]: props.current === 1,
      })}
    >
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <CCInput
            label="Tên doanh nghiệp"
            name={['change_info', 'base_inform', 'company_name']}
            onChange={(e) => onSetFields(['change_info', 'base_inform', 'company_name'], e.target.value, ref, true)}
            placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
          />
        </Col>
        <Col span={12}>
          <CCInput
            label="Mã số doanh nghiệp hoặc Mã số thuế"
            name={['change_info', 'base_inform', 'mst']}
            placeholder="0316184427"
          />
        </Col>
        <Col span={12}>
          <CCInput
            type="date"
            label="Ngày cấp"
            name={['change_info', 'base_inform', 'mst_provide']}
            placeholder="0316184427"
            inputReadOnly={false}
          />
        </Col>
        <Col span={24}>
          <CCInput
            label={htmlContent('</>Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i></>')}
            name={['change_info', 'base_inform', 'org_person']}
            placeholder="NGUYỄN VĂN A"
            onChange={(e) => onSetFields(['change_info', 'base_inform', 'org_person'], e.target.value, ref, true)}
          />
        </Col>
        <Col span={24}>
          <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')}>
            <CCSelect.SelectProvince
              ref={ref}
              label={'Địa chỉ trụ sở chính'}
              name={[...BASE_FORM, 'location']}
              placeholder="Địa chỉ trụ sở chính"
            />
          </Form.Item>
        </Col>
        {renderFormByType}
      </Row>
    </div>
  )
})

export default BaseInformation
