import CCInput from '@/components/CCInput'
import CCListForm from '@/components/CCListForm'
import CCSelect from '@/components/CCSelect'
import { SELECT } from '@/constant/Common'
import { PENDING_FORM } from '@/constant/FormConstant'
import { Col, Form, InputNumber, Row, Button, Space, Card } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState, useMemo } from 'react'
import styles from './styles.module.scss'
import { htmlContent, onSetFields } from '@/helper/Common'
import { useLocation } from 'react-router-dom'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const BASE_FORM = ['pending', 'approve']

const TamNgungKinhDoanh = forwardRef(({ type, current, index }, ref) => {
  const [objective, setObjective] = useState('')

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      let objValue = ref.current.getFieldsValue()
      if (objValue && current == index) setObjective(objValue)
    }
  }, [location, current])

  const handleChange = (e, pathname) => {
    ref.current.setFields([
      {
        name: Array.isArray(pathname) ? [...pathname] : [pathname],
        value: e.target.value.toUpperCase(),
      },
    ])
  }

  const renderFormByType = () => {
    let xhtml = null

    if (type) {
      if (+type === 3) {
        xhtml = (
          <>
            <Form.Item label={PENDING_FORM.approve.fields.location.label}>
              <CCSelect.SelectProvince ref={ref} label={'Địa chỉ trụ sở chính'} name={[...BASE_FORM, 'location']} placeholder="Địa chỉ trụ sở chính" />
            </Form.Item>
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
        xhtml = (
          <>
            <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')}>
              <CCSelect.SelectProvince ref={ref} label={'Địa chỉ trụ sở chính'} name={[...BASE_FORM, 'location']} placeholder="Địa chỉ trụ sở chính" />{' '}
            </Form.Item>
            <MoreThanOneForm BASE_FORM={BASE_FORM} ref={ref} />
          </>
        )
      }
    }

    return xhtml
  }

  return (
    <Form.Item
      className={clsx(styles.groupInput, styles.current, {
        [styles.active]: current === index,
      })}
    >
      <CCInput
        name={[...BASE_FORM, 'company_name']}
        label="Nhập tên doanh nghiệp"
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        onChange={(e) => handleChange(e, [...BASE_FORM, 'company_name'])}
      />
      <CCInput name={[...BASE_FORM, 'mst']} label="Mã số doanh nghiệp hoặc Mã số thuế" placeholder="0316184427" />

      <CCInput
        name={[...BASE_FORM, 'org_person']}
        label={htmlContent('Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i>')}
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => handleChange(e, [...BASE_FORM, 'org_person'])}
      />

      {renderFormByType()}

      <CCInput
        type="select"
        name={[...BASE_FORM, 'obj']}
        label="Chọn đối tượng thông báo tạm ngưng kinh doanh"
        onChange={(val, opt) => setObjective(val)}
        options={SELECT.BUSINESS_OBJECT}
        placeholder="Bấm vào đây"
      />

      {objective === 'Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh' && (
        <>
          <CCInput
            name={[...BASE_FORM, 'branch_name']}
            label={
              <>
                Nhập tên&nbsp;
                <i> (của Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh)</i>
              </>
            }
            placeholder="CHI NHÁNH CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
            onChange={(e) => handleChange(e, [...BASE_FORM, 'branch_name'])}
          />
          <CCInput
            name={[...BASE_FORM, 'resp_office']}
            label={
              <>
                Nhập Mã số&nbsp;
                <i> (của Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh)</i>
              </>
            }
            placeholder="0316184427 - 001"
          />
        </>
      )}
      <Form.Item
        label={
          <>
            Thời gian đăng ký tạm ngừng kinh doanh&nbsp;
            <i> (tối đa 12 tháng, ngày bắt đầu tạm ngừng sau ít nhất 3 ngày làm việc kể từ ngày nộp hồ sơ)</i>
          </>
        }
      >
        <Row gutter={[16, 12]}>
          <Col span={12}>
            <CCInput name={[...BASE_FORM, 'time_range', 'start']} label="Từ ngày" type="date" layout="horizontal" placeholder="15/01/2022 - ENTER" />
          </Col>
          <Col span={12}>
            <CCInput name={[...BASE_FORM, 'time_range', 'end']} label="Đến ngày" type="date" layout="horizontal" placeholder="15/01/2023 - ENTER" />
          </Col>
        </Row>
      </Form.Item>
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
export default TamNgungKinhDoanh
