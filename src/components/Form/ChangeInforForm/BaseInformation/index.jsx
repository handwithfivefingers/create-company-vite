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

  const [dynamicFormList, setDynamicFormList] = useState([])

  useEffect(() => {
    if (props?.type === 2) {
      setDynamicFormList([{}, {}])
    } else if (props?.type === 3) {
      setDynamicFormList([{}, {}, {}])
    }
  }, [props?.type])
  const renderLabelFormList = (i) => {
    // console.log(props)
    if (props?.type === 2) {
      return <span>{i == 0 ? 'Hội đồng thành viên' : `Thành viên góp vốn thứ  ${i + 1}`}</span>
    } else if (props?.type === 3) {
      return <span>{i == 0 ? 'Hội đồng quản trị' : `Thành viên HDQT thứ  ${i + 1}`}</span>
    } else return null
  }

  const renderFormByType = useMemo(() => {
    let type = props?.type
    let xhtml = null

    if (type) {
      if (+type === 3) {
        let listForm = [
          {
            label: 'Tên Chủ tịch HĐQT',
            placeholder: 'NGUYỄN VĂN A',
            name: 'president',
            onChange: true,
            options: {
              toUpperCase: true,
              compare: {
                end: 5,
                index: 2,
              },
              customLabel: 'Nhập tên thành viên HĐQT ',
            },
          },
        ]

        xhtml = (
          <>
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
          </>
        )
      } else if (+type === 2) {
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

        xhtml = (
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
      <CCInput
        label="Tên doanh nghiệp"
        name={['change_info', 'base_inform', 'company_name']}
        onChange={(e) => onSetFields(['change_info', 'base_inform', 'company_name'], e.target.value, ref, true)}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
      />

      <CCInput label="Mã số doanh nghiệp hoặc Mã số thuế" name={['change_info', 'base_inform', 'mst']} placeholder="0316184427" />

      <CCInput
        label={htmlContent('</>Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i></>')}
        name={['change_info', 'base_inform', 'org_person']}
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => onSetFields(['change_info', 'base_inform', 'org_person'], e.target.value, ref, true)}
      />

      <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')}>
        <CCSelect.SelectProvince ref={ref} label={'Địa chỉ trụ sở chính'} name={[...BASE_FORM, 'location']} placeholder="Địa chỉ trụ sở chính" />
      </Form.Item>

      {/* {props?.type !== 1 && (
        <Form.List name={[...BASE_FORM, 'contribute_members']} initialValue={dynamicFormList}>
          {(fields, { add, remove }) => (
            <Row>
              {fields?.map((field, i) => (
                <Col lg={12} md={12} sm={24} xs={24} key={[field, i + 1]}>
                  <Row gutter={[16, 12]}>
                    <Col span={24}>{renderLabelFormList(i)}</Col>
                    <Col span={24}>
                      <CCInput
                        label={'Họ và tên'}
                        name={[field.name, 'name']}
                        onChange={(e) => onSetFields([...BASE_FORM, 'contribute_members', field.name, 'name'], e.target.value, ref, true)}
                      />
                    </Col>

                    <Col span={12}>
                      <Form.Item label={'Vốn góp'} name={[field.name, 'capital']}>
                        <InputNumber style={{ width: '100%' }} formatter={(v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`} />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item label={'Chiếm % vốn điều lệ'} name={[field.name, 'capital_percent']}>
                        <InputNumber style={{ width: '100%' }} formatter={(v) => `${v.replace('%', '')}%`} min={0} max={100} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    {fields.length > 2 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
                  </Space>
                </Col>
              ))}

              {fields.length < 5 && (
                <Form.Item label=" ">
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm thành viên góp vốn (nếu có)
                  </Button>
                </Form.Item>
              )}
            </Row>
          )}
        </Form.List>
      )} */}

      {renderFormByType}
    </div>
  )
})

export default BaseInformation
