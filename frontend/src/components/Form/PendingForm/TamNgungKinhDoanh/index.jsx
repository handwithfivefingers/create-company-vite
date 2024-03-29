import CCInput from '@/components/CCInput'
import CCSelect from '@/components/CCSelect'
import { SELECT } from '@/constant/Common'
import { PENDING_FORM } from '@/constant/FormConstant'
import { htmlContent, onSetFields } from '@/helper/Common'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, InputNumber, Row, Space } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { forwardRef, useEffect, useState, memo, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

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

  const renderFormByType = useMemo(() => {
    let xhtml = null

    if (type) {
      if (+type === 3) {
        xhtml = (
          <>
            <Form.Item label={PENDING_FORM.approve.fields.location.label}>
              <CCSelect.SelectProvince
                label={'Địa chỉ trụ sở chính'}
                name={[...BASE_FORM, 'location']}
                placeholder="Địa chỉ trụ sở chính"
              />
            </Form.Item>
            <BoardMembersCoopMember BASE_FORM={BASE_FORM} ref={ref} />

            {/* <Form.Item label="Tổng số vốn điều lệ" name={[...BASE_FORM, 'total_capital']}>
              <InputNumber
                placeholder="100,000,000"
                formatter={(v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`}
                style={{ width: '100%' }}
              />
            </Form.Item> */}
          </>
        )
      } else if (+type === 2) {
        xhtml = (
          <>
            <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')}>
              <CCSelect.SelectProvince
                label={'Địa chỉ trụ sở chính'}
                name={[...BASE_FORM, 'location']}
                placeholder="Địa chỉ trụ sở chính"
              />
            </Form.Item>
            <BoardMembers2Member BASE_FORM={BASE_FORM} ref={ref} />
          </>
        )
      }
    }

    return xhtml
  }, [type])

  const disabledTimeEnd = (current) => {
    let val = ref.current.getFieldValue([...BASE_FORM, 'time_range', 'start'])
    return current && current < val.endOf('day')
  }

  const disabledTimeStart = (current) => current && current < dayjs().endOf('day')

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
        required
        message="B2. Vui lòng Nhập tên doanh nghiệp"
      />
      <CCInput name={[...BASE_FORM, 'mst']} label="Mã số doanh nghiệp hoặc Mã số thuế" placeholder="0316184427" />

      <CCInput
        name={[...BASE_FORM, 'org_person']}
        label={htmlContent('Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i>')}
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => handleChange(e, [...BASE_FORM, 'org_person'])}
      />

      {renderFormByType}

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
          <CCSelect.SelectProvince name={[...BASE_FORM]} />
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
          <Col lg={12} md={24} sm={24} xs={24}>
            <CCInput
              name={[...BASE_FORM, 'time_range', 'start']}
              label="Từ ngày"
              type="date"
              layout="horizontal"
              placeholder="15/01/2022 - ENTER"
              disabledDate={disabledTimeStart}
            />
          </Col>
          <Col lg={12} md={24} sm={24} xs={24}>
            <CCInput
              name={[...BASE_FORM, 'time_range', 'end']}
              label="Đến ngày"
              type="date"
              layout="horizontal"
              placeholder="15/01/2023 - ENTER"
              disabledDate={disabledTimeEnd}
            />
          </Col>
        </Row>
      </Form.Item>
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
    console.log('value', value)
    let valSplice = value?.splice(i, 1)

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
                extra={[<RemoveFormBtn inValid={formList.length <= 3} onClick={() => removeItem(index)} />]}
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

        <FormListFooter
          inValid={formList.length >= 5}
          onClick={() => addToList()}
          btnText={'Thêm thành viên HĐQT (nếu có)'}
        />
      </Row>
    </Form.Item>
  )
})

const BoardMembers2Member = forwardRef((props, ref) => {
  const { BASE_FORM } = props

  const [formList, setFormList] = useState([{}, {}])
  const location = useLocation()

  useEffect(() => {
    // This run 1st
    if (location.state) {
      let val = ref.current?.getFieldValue([...BASE_FORM, 'contribute_members'])

      if (val?.length) {
        addToList(val.length - 1)
      }
    }
  }, [location])

  useEffect(() => {
    // This run 2st
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
                    <Form.Item
                      name={[...BASE_FORM, 'contribute_members', index, 'capital_percent']}
                      label="Chiếm % vốn điều lệ"
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
          onClick={() => addToList()}
          btnText={'Thêm thành viên góp vốn (nếu có)'}
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

export default TamNgungKinhDoanh
