import React, { forwardRef, useState, useEffect, useRef, useMemo } from 'react'
import { Form, Row, Col, InputNumber, Radio, Space, Button, DatePicker } from 'antd'
import CCInput from '@/components/CCInput'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { SELECT } from '@/constant/Common'
import CCSelect from '../../../CCSelect'
import { onSetFields, htmlContent } from '@/helper/Common'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { isEqual } from 'lodash'
import { useLocation } from 'react-router-dom'

const ThanhVienGopVon = forwardRef(({ data, ...props }, ref) => {
  const [present, setPresent] = useState({})

  const { current, BASE_FORM } = props

  const [listForm, setListForm] = useState([{}])

  const [_render, setRender] = useState(false)

  const location = useLocation()

  useEffect(() => {
    let value = [...listForm] // default is 1
    if (data?.type == 2 && value.length < 2) {
      value.push({}) // -> 2
      setListForm(value)
    } else if (data?.type === 3 && value.length < 3) {
      value.push({}, {}) // -> 3
      setListForm(value)
    }
  }, [present])

  useEffect(() => {
    if (data?.type) {
      switch (data?.type) {
        case 2:
          setListForm([{}, {}])
          break
        case 3:
          setListForm([{}, {}, {}])
          break
        default:
          setListForm([{}])
          break
      }
    }
  }, [data])

  useEffect(() => {
    if (location.state) {
      let orginPerson = ref.current.getFieldValue([...BASE_FORM, 'origin_person'])
      if (orginPerson?.length) {
        setListForm(orginPerson)
      }
    }
  }, [props.current, location])

  const renderPresentPerson = useMemo(
    () => (index) => {
      let xhtml = null
      let presentPerson = ref.current?.getFieldValue([...BASE_FORM, 'origin_person', index, 'present_person'])
      if (presentPerson === 'personal') {
        xhtml = <Personal type={data?.type} ref={ref} BASE_FORM={[...BASE_FORM, 'origin_person', index]} />
      } else if (presentPerson === 'organization') {
        xhtml = <OriginalPerson type={data?.type} ref={ref} BASE_FORM={[...BASE_FORM, 'origin_person', index]} />
      }
      return xhtml
    },
    [_render],
  )

  /**
   * @functions List Form Functions
   */

  const addItem = () => {
    setListForm([...listForm, {}])

    return handleScrolltoField()
  }

  const handleScrolltoField = () => {
    let lastIndex = listForm.length - 1

    let pathName = [...BASE_FORM, 'origin_person', lastIndex, 'present_person']

    ref.current.scrollToField(pathName, {
      behavior: 'smooth',
    })
  }

  const removeItem = (index) => {
    try {
      let val = ref.current.getFieldValue([...BASE_FORM, 'origin_person'])

      val = [...val.slice(0, index), ...val.slice(index + 1)]

      let listVal = [...listForm.slice(0, index), ...listForm.slice(index + 1)]

      onSetFields([...BASE_FORM, 'origin_person'], val, ref)

      setListForm(listVal)
    } catch (err) {
      console.log('removeItem', err)
    }
  }

  const presentSelect = (val, opt) => {
    setRender(!_render)
  }

  return (
    <Form.Item
      className={clsx([
        styles.hide,
        props.className,
        {
          [styles.visible]: current === 2,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        {listForm.length < 10 && data?.type !== 1 && (
          <Col span={24} style={{ position: 'sticky', top: '0', zIndex: 1 }}>
            <Button onClick={addItem} icon={<PlusOutlined />} type="primary">
              Thêm thành viên góp vốn
            </Button>
          </Col>
        )}

        {listForm.map((item, i) => {
          return (
            <Col span={24} key={[...BASE_FORM, 'origin_person', i]}>
              <Form.Item
                label={
                  <div className={styles.label}>
                    <div className={styles.title}>Thành viên góp vốn {data?.type !== 1 && ` thứ ${i + 1}`}</div>
                    <Button
                      type="text"
                      shape="circle"
                      danger
                      icon={<MinusCircleOutlined onClick={() => removeItem(i)} />}
                      style={{
                        display:
                          (data?.type == 2 && listForm.length > 2) || (data?.type == 3 && listForm.length > 3)
                            ? 'block'
                            : 'none',
                      }}
                    />
                  </div>
                }
              >
                <PresentPerson BASE_FORM={BASE_FORM} index={i} ref={ref} presentSelect={presentSelect} />

                {renderPresentPerson(i)}
              </Form.Item>
            </Col>
          )
        })}
      </Row>
    </Form.Item>
  )
})

const Personal = forwardRef((props, ref) => {
  const { BASE_FORM, type } = props

  return (
    <div className={styles.groupInput}>
      {type && type !== 1 && (
        <Form.Item name={[...BASE_FORM, 'capital']} label="Số tiền góp vốn" placeholder="Số tiền góp vốn">
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      <CCInput
        name={[...BASE_FORM, 'name']}
        label="Họ và Tên"
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => onSetFields([...BASE_FORM, 'name'], e.target.value, ref, true)}
      />

      <CCInput
        type="date"
        name={[...BASE_FORM, 'birth_day']}
        label="Ngày sinh"
        placeholder="Chọn ngày"
        inputReadOnly={false}
      />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'gender']}
        label="Giới tính"
        options={SELECT.GENDER}
        placeholder="Bấm vào đây"
      />

      <CCSelect.SelectPersonType
        ref={ref}
        name={[...BASE_FORM, 'per_type']}
        label="Dân tộc"
        placeholder="Bấm vào đây"
      />

      <CCInput type="select" name={[...BASE_FORM, 'doc_type']} label="Loại giấy tờ" options={SELECT.DOC_TYPE} />

      <CCInput label={'Số CMND / CCCD / Hộ chiếu'} name={[...BASE_FORM, 'doc_code']} placeholder="0010829446357" />

      <CCInput
        type="date"
        name={[...BASE_FORM, 'doc_time_provide']}
        label="Ngày cấp"
        placeholder="Chọn ngày"
        inputReadOnly={false}
      />

      <CCSelect.SelectDocProvide
        ref={ref}
        name={[...BASE_FORM, 'doc_place_provide']}
        label="Nơi cấp"
        placeholder="Bấm vào đây"
      />

      <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')} className={styles.newLine}>
        <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'current']} />
      </Form.Item>

      <CCSelect.RadioAddress
        prevField={[...BASE_FORM, 'current']}
        nextField={[...BASE_FORM, 'contact']}
        ref={ref}
        bodyStyle={styles}
      />
    </div>
  )
})

const OriginalPerson = forwardRef((props, ref) => {
  const { BASE_FORM, type } = props

  return (
    <div className={styles.groupInput}>
      {/* START Nhập thông tin của tổ chức */}
      {type && type !== 1 && (
        <Form.Item name={[...BASE_FORM, 'capital']} label="Số tiền góp vốn" placeholder="Số tiền góp vốn" required>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      <CCInput
        label="Tên tổ chức"
        name={[...BASE_FORM, 'organization', 'name']}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        onChange={(e) => onSetFields([...BASE_FORM, 'organization', 'name'], e.target.value, ref, true)}
        required
      />
      <CCInput label="Mã số DN hoặc Mã số thuế" name={[...BASE_FORM, 'organization', 'mst']} placeholder="0316184427"required />
      <CCInput
        type="date"
        name={[...BASE_FORM, 'organization', 'doc_time_provide']}
        label={htmlContent('Ngày cấp <i>(ngày đăng ký lần đầu)</i>')}
        placeholder="Chọn ngày"
        inputReadOnly={false}
        required
      />

      <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')} className={styles.newLine} required>
        <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'organization', 'doc_place_provide']} />
      </Form.Item>

      <CCInput
        name={[...BASE_FORM, 'name']}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</>Họ và Tên đại diện pháp luật <i>(ĐDPL)</i></>',
            }}
          />
        }
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => onSetFields([...BASE_FORM, 'name'], e.target.value, ref, true)}
      />
      <CCSelect.SelectTitle
        ref={ref}
        name={[...BASE_FORM, 'title']}
        label={htmlContent('Chức danh <i>(ĐDPL)</i>')}
        placeholder="Bấm vào đây"
        options={SELECT.TITLE_2}
      />

      <CCInput
        type="date"
        name={[...BASE_FORM, 'birth_day']}
        label="Ngày sinh"
        placeholder="Chọn ngày"
        inputReadOnly={false}
      />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'gender']}
        label="Giới tính"
        options={SELECT.GENDER}
        placeholder="Bấm vào đây"
      />

      <CCSelect.SelectPersonType
        ref={ref}
        name={[...BASE_FORM, 'per_type']}
        label="Dân tộc"
        placeholder="Bấm vào đây"
      />

      <CCInput type="select" name={[...BASE_FORM, 'doc_type']} label="Loại giấy tờ" options={SELECT.DOC_TYPE} />

      <CCInput label={'Số CMND / CCCD / Hộ chiếu'} name={[...BASE_FORM, 'doc_code']} placeholder="0316184427" />

      <CCInput
        type="date"
        name={[...BASE_FORM, 'doc_time_provide']}
        label="Ngày cấp"
        placeholder="Chọn ngày"
        inputReadOnly={false}
      />

      <CCSelect.SelectDocProvide
        ref={ref}
        name={[...BASE_FORM, 'doc_place_provide']}
        label="Nơi cấp"
        placeholder="Bấm vào đây"
      />

      <Form.Item className={styles.newLine} label={htmlContent('<b>Địa chỉ thường trú <i>(ĐDPL)</i></b>')}>
        <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'current']} />
      </Form.Item>
      <CCSelect.RadioAddress
        prevField={[...BASE_FORM, 'current']}
        nextField={[...BASE_FORM, 'contact']}
        ref={ref}
        bodyStyle={styles}
      />
    </div>
  )
})

const PresentPerson = forwardRef((props, ref) => {
  const { BASE_FORM, index } = props

  return (
    <CCInput
      display={'none'}
      type="select"
      name={[...BASE_FORM, 'origin_person', index, 'present_person']}
      onSelect={props.presentSelect}
      placeholder="Bấm vào đây"
      options={[
        {
          value: 'personal',
          name: 'Thành viên góp vốn là cá nhân',
        },
        {
          value: 'organization',
          name: 'Thành viên góp vốn là tổ chức',
        },
      ]}
    />
  )
})

export default ThanhVienGopVon
