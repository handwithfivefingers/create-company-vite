import CCInput from '@/components/CCInput'
import CCSelect from '@/components/CCSelect'
import { htmlContent, onSetFields } from '@/helper/Common'
import { Button, Card, Col, Form, InputNumber, Row, Space } from 'antd'
import clsx from 'clsx'
import { forwardRef, useEffect, useMemo, useState, memo } from 'react'
import styles from './styles.module.scss'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

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
          <BoardMembersCoopMember BASE_FORM={BASE_FORM} ref={ref} />
          <Form.Item
            label="Tổng số vốn điều lệ"
            name={[...BASE_FORM, 'total_capital']}
            required
            rules={{
              required: true,
              message: 'Tổng số vốn điều lệ là bắt buộc',
            }}
          >
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
      xhtml = <BoardMembers2Member BASE_FORM={BASE_FORM} ref={ref} />
    }
    return xhtml
  }, [type])

  return (
    <Form.Item
      className={clsx(styles.groupInput, styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Row gutter={[12, 12]}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput
            label="Nhập tên doanh nghiệp"
            name={[...BASE_FORM, 'company_name']}
            placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
            onChange={(e) => setFields(e, [...BASE_FORM, 'company_name'])}
            required
          />
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput
            label="Nhập mã số doanh nghiệp hoặc Mã số thuế"
            name={[...BASE_FORM, 'mst']}
            placeholder="0316184427"
            required
          />
        </Col>

        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput
            type="date"
            label="Ngày cấp"
            name={[...BASE_FORM, 'mst_provide']}
            placeholder="15/01/1966 - ENTER"
            inputReadOnly={false}
            required
          />
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput
            label={htmlContent('Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i>')}
            name={[...BASE_FORM, 'org_person']}
            placeholder="NGUYỄN VĂN A"
            onChange={(e) => setFields(e, [...BASE_FORM, 'org_person'])}
            required
            message="Người đại diện pháp luật (nhập đầy đủ họ và tên) là bắt buộc!"
          />
        </Col>
        <Col span={24}>
          <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')}>
            <CCSelect.SelectProvince
              name={[...BASE_FORM, 'location']}
              placeholder="Nhập địa chỉ trụ sở chính"
              label="Địa chỉ trụ sở chính"
              required
            />
          </Form.Item>
        </Col>

        {renderFormByType}
      </Row>
    </Form.Item>
  )
})

const BoardMembersCoopMember = forwardRef((props, ref) => {
  const { BASE_FORM } = props

  const [formList, setFormList] = useState([{}])

  const location = useLocation()

  useEffect(() => {
    // This run 1st
    if (location.state) {
      let val = ref.current?.getFieldValue([...BASE_FORM, 'list_president'])

      if (val.length) {
        addToList(val.length - 1)
      }
    }
  }, [location])

  useEffect(() => {
    // This run 2st
    if (formList.length <= 1) {
      addToList(2)
    }
  }, [])

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

    let valSplice = value?.splice(i, 1)

    onSetFields([...BASE_FORM, 'list_president'], value, ref)
  }

  return (
    <Form.Item label="Đại hội đồng cổ đông" style={{ width: '100%' }}>
      <Row gutter={[16, 12]}>
        {formList?.map((item, index) => {
          return (
            <Col lg={12} md={12} sm={24} xs={24} key={[...BASE_FORM, 'list_president', index, 'president']}>
              <Card
                className="box__shadow"
                size="small"
                title={index === 0 ? 'Tên Chủ tịch HĐQT' : `Tên thành viên HĐQT ${index}`}
                extra={[<RemoveFormBtn inValid={formList.length <= 3} onClick={() => removeItem(index)} />]}
              >
                <Row>
                  <Col span={24}>
                    <CCInput
                      name={[...BASE_FORM, 'list_president', index, 'president']}
                      placeholder="NGUYỄN VĂN A"
                      required
                      message={
                        index === 0 ? 'Tên Chủ tịch HĐQT  là bắt buộc' : `Tên thành viên HĐQT ${index} là bắt buộc`
                      }
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          )
        })}
        <FormListFooter
          inValid={formList.length >= 5}
          onClick={() => addToList()}
          btnText="Thêm thành viên HĐQT (nếu có)"
        />

        {/* {formList.length < 5 && (
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item label=" ">
              <Button type="dashed" onClick={() => addToList()} block icon={<PlusOutlined />}></Button>
            </Form.Item>
          </Col>
        )} */}
      </Row>
    </Form.Item>
  )
})

const BoardMembers2Member = forwardRef((props, ref) => {
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

  useEffect(() => {
    if (formList.length <= 1) {
      addToList(1)
    }
  }, [])

  const addToList = (number = 1) => {
    let objPush = []

    for (let i = 0; i < number; i++) {
      objPush.push({})
    }
    setFormList([...formList, ...objPush])
  }

  const removeItem = (i) => {
    try {
      let data = JSON.parse(JSON.stringify(formList))

      let _data = data.splice(i, 1)

      setFormList(data)

      let value = ref.current?.getFieldValue([...BASE_FORM, 'contribute_members'])

      let valSplice = value?.splice(i, 1)

      onSetFields([...BASE_FORM, 'contribute_members'], value, ref)
    } catch (error) {
      console.log('removeItem error', error)
    }
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
                extra={[<RemoveFormBtn inValid={formList.length <= 2} onClick={() => removeItem(index)} />]}
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
                      required
                    />
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name={[...BASE_FORM, 'contribute_members', index, 'capital']}
                      label="Vốn góp"
                      required
                      rules={[
                        {
                          required: true,
                          message: 'Vốn góp là bắt buộc',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="80,000,000"
                        formatter={(v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`}
                        stringMode={true}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[...BASE_FORM, 'contribute_members', index, 'capital_percent']}
                      label="Chiếm % vốn điều lệ"
                      required
                      rules={[
                        {
                          required: true,
                          message: '% vốn điều lệ là bắt buộc',
                        },
                      ]}
                    >
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

        <FormListFooter
          inValid={formList.length >= 5}
          btnText="Thêm thành viên góp vốn (nếu có)"
          onClick={() => addToList()}
        />
      </Row>
    </Form.Item>
  )
})

const FormListFooter = memo(({ inValid, btnText, onClick }) => {
  if (inValid) return ''
  return (
    <Col lg={12} md={12} sm={24} xs={24}>
      <Form.Item label=" ">
        <Button type="dashed" onClick={onClick} block icon={<PlusOutlined />}>
          {btnText}
        </Button>
      </Form.Item>
    </Col>
  )
})

const RemoveFormBtn = memo(({ inValid, onClick }) => {
  if (inValid) return ''
  return (
    <Space className={styles.flexStyles}>
      <MinusCircleOutlined onClick={onClick} />
    </Space>
  )
})

export default GiaiThe
