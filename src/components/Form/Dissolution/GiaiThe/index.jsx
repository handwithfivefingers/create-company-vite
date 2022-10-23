import CCInput from '@/components/CCInput'
import CCListForm from '@/components/CCListForm'
import CCSelect from '@/components/CCSelect'
import { DISSOLUTION_FORM } from '@/constant/FormConstant'
import { Form, InputNumber, Row, Col, Card, Space, Button } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { htmlContent, onSetFields } from '@/helper/Common'

import { useLocation } from 'react-router-dom'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const BASE_FORM = ['dissolution', 'approve']

const GiaiThe = forwardRef((props, ref) => {
  const [type, setType] = useState(1)

  useEffect(() => {
    let { category } = ref.current.getFieldsValue()
    if (category?.type) {
      setType(category?.type)
    }
  }, [props])

  const setFields = (e, pathname) => {
    ref.current.setFields([
      {
        name: Array.isArray(pathname) ? [...pathname] : [pathname],
        value: e.target.value.toUpperCase(),
      },
    ])
  }

  const renderFormByType = useMemo(() => {
    let xhtml = null

    if (+type === 3) {
      xhtml = (
        <>
          <OnePersonForm BASE_FORM={BASE_FORM} ref={ref} />
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
      xhtml = <MoreThanOneForm BASE_FORM={BASE_FORM} ref={ref} />
    }
    return xhtml
  }, [type])

  return (
    <Form.Item
      // label="Giải thể"
      className={clsx(styles.groupInput, styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <CCInput
        label="Nhập tên doanh nghiệp"
        name={[...BASE_FORM, 'company_name']}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        onChange={(e) => setFields(e, [...BASE_FORM, 'company_name'])}
      />

      <CCInput label="Nhập mã số doanh nghiệp hoặc Mã số thuế" name={[...BASE_FORM, 'mst']} placeholder="0316184427" />

      <CCInput
        label={htmlContent('Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i>')}
        name={[...BASE_FORM, 'org_person']}
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => setFields(e, [...BASE_FORM, 'org_person'])}
      />

      <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')}>
        <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'location']} placeholder="Nhập địa chỉ trụ sở chính" label="Địa chỉ trụ sở chính" />
      </Form.Item>

      {renderFormByType}
    </Form.Item>
  )
})

const OnePersonForm = forwardRef((props, ref) => {
  const { BASE_FORM } = props

  const [formList, setFormList] = useState([{}])

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      let val = ref.current?.getFieldValue([...BASE_FORM, 'list_president'])

      if (val.length) {
        addToList(val.length - 1)
      }
    }
  }, [location])

  const addToList = (number = 1) => {
    let objPush = []

    for (let i = 0; i < number; i++) {
      objPush.push({})
    }
    setFormList([...formList, ...objPush])
  }

  const removeItem = (i) => {
    let data = JSON.parse(JSON.stringify(formList))

    let _data = data.splice(i, 1)

    setFormList(data)

    let value = ref.current?.getFieldValue([...BASE_FORM, 'list_president'])

    let valSplice = value.splice(i, 1)

    onSetFields([...BASE_FORM, 'list_president'], value, ref)
  }

  return (
    <Form.Item label="Hội đồng quản trị">
      <Row gutter={[16, 12]}>
        {formList?.map((item, index) => {
          return (
            <Col lg={12} md={12} sm={24} xs={24} key={[...BASE_FORM, 'list_president', index, 'president']}>
              <Card
                className="box__shadow"
                size="small"
                title={index === 0 ? 'Tên Chủ tịch HĐQT' : `Tên thành viên HĐQT ${index}`}
                extra={[
                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    {formList.length <= 3 ? '' : <MinusCircleOutlined onClick={() => removeItem(index)} />}
                  </Space>,
                ]}
              >
                <Row>
                  <Col span={24}>
                    <CCInput name={[...BASE_FORM, 'list_president', index, 'president']} placeholder="NGUYỄN VĂN A" />
                  </Col>
                </Row>
              </Card>
            </Col>
          )
        })}

        {formList.length >= 5 ? (
          ''
        ) : (
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item label=" ">
              <Button type="dashed" onClick={() => addToList()} block icon={<PlusOutlined />}>
                Thêm thành viên HĐQT (nếu có)
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form.Item>
  )
})

const MoreThanOneForm = forwardRef((props, ref) => {
  const { BASE_FORM } = props

  const [formList, setFormList] = useState([{}, {}])
  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      let val = ref.current?.getFieldValue([...BASE_FORM, 'contribute_members'])

      if (val?.length) {
        addToList(val.length - 1)
      }
    }
  }, [location])

  const addToList = (number = 1) => {
    let objPush = []

    for (let i = 0; i < number; i++) {
      objPush.push({})
    }
    setFormList([...formList, ...objPush])
  }

  const removeItem = (i) => {
    let data = JSON.parse(JSON.stringify(formList))

    let _data = data.splice(i, 1)

    setFormList(data)

    let value = ref.current?.getFieldValue([...BASE_FORM, 'contribute_members'])

    let valSplice = value.splice(i, 1)

    onSetFields([...BASE_FORM, 'contribute_members'], value, ref)
  }

  return (
    <Form.Item label="Hội đồng thành viên">
      <Row gutter={[16, 12]}>
        {formList?.map((_, index) => {
          return (
            <Col lg={12} md={12} sm={24} xs={24} key={[...BASE_FORM, 'contribute_members', index, 'president']}>
              <Card
                className="box__shadow"
                size="small"
                title={`Tên thành viên góp vốn thứ ${index + 1}`}
                extra={[
                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    {formList.length <= 2 ? '' : <MinusCircleOutlined onClick={() => removeItem(index)} />}
                  </Space>,
                ]}
              >
                <Row gutter={[16]}>
                  <Col span={24}>
                    <CCInput
                      name={[...BASE_FORM, 'contribute_members', index, 'name']}
                      label={'Họ và Tên'}
                      onChange={(e) => {
                        let path = [...BASE_FORM, 'contribute_members', index, 'name']
                        onSetFields(path, e.target.value, ref, true)
                      }}
                    />
                  </Col>

                  <Col span={12}>
                    <Form.Item name={[...BASE_FORM, 'contribute_members', index, 'capital']} label="Vốn góp">
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="80,000,000"
                        formatter={(v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`}
                        stringMode={true}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={[...BASE_FORM, 'contribute_members', index, 'capital_percent']} label="Chiếm % vốn điều lệ">
                      <InputNumber
                        style={{ width: '100%' }}
                        max={100}
                        min={0}
                        length={3}
                        placeholder="80%"
                        formatter={(v) => `${v.replace('%', '')}%`}
                        stringMode={true}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          )
        })}

        {formList.length >= 5 ? (
          ''
        ) : (
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item label=" ">
              <Button className="box__shadow" type="dashed" onClick={() => addToList()} block icon={<PlusOutlined />}>
                Thêm thành viên góp vốn (nếu có)
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form.Item>
  )
})

export default GiaiThe
