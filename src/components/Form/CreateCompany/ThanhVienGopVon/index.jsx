import React, { forwardRef, useState, useEffect, useRef, useMemo } from 'react'
import { Form, Row, Col, InputNumber, Radio, Space, Button } from 'antd'
import CCInput from '@/components/CCInput'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { SELECT } from '@/constant/Common'
import CCSelect from '../../../CCSelect'
import { onSetFields } from '@/helper/Common'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
const ThanhVienGopVon = forwardRef(({ data, ...props }, ref) => {
  const [present, setPresent] = useState({})
  const { current, BASE_FORM } = props
  const [listForm, setListForm] = useState([{}])

  useEffect(() => {
    onSetFields(
      [...BASE_FORM, 'origin_person', 0, 'doc_type'],
      'Chứng minh nhân dân',
      ref,
    )
  }, [])

  useEffect(() => {
    let value = [...listForm] // default is 1
    if (data?.type == '2' && value.length < 2) {
      value.push({}) // -> 2
      setListForm(value)
    } else if (data?.type === '3' && value.length < 3) {
      value.push({}, {}) // -> 3
      setListForm(value)
    }
  }, [present])

  useEffect(() => {
    if (data?.type) {
      switch (data?.type) {
        case '2':
          setListForm([{}, {}])
          break
        case '3':
          setListForm([{}, {}, {}])
          break
        default:
          setListForm([{}])
          break
      }
    }
  }, [data])

  const renderPresentPerson = (index) => {
    let xhtml = null

    if (present?.[index] === 'personal') {
      xhtml = (
        <Personal
          type={data?.type}
          ref={ref}
          BASE_FORM={[...BASE_FORM, 'origin_person', index]}
          onSetFields={onSetFields}
        />
      )
    } else if (present?.[index] === 'organization') {
      xhtml = (
        <OriginalPerson
          type={data?.type}
          ref={ref}
          onSetFields={onSetFields}
          BASE_FORM={[...BASE_FORM, 'origin_person', index]}
        />
      )
    }
    return xhtml
  }

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

  const handleSetListForm = ({ index, val }) => {
    setPresent((state) => ({ ...state, [index]: val }))
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
        {listForm.length < 10 && data?.type !== '1' && (
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
                    <div className={styles.title}>
                      Thành viên góp vốn {data?.type !== '1' && ` thứ ${i + 1}`}
                    </div>
                    <Button
                      type="text"
                      shape="circle"
                      danger
                      icon={
                        <MinusCircleOutlined onClick={() => removeItem(i)} />
                      }
                      style={{
                        display:
                          (data?.type == 2 && listForm.length > 2) ||
                          (data?.type == 3 && listForm.length > 3)
                            ? 'block'
                            : 'none',
                      }}
                    />
                  </div>
                }
              >
                <PresentPerson
                  BASE_FORM={BASE_FORM}
                  index={i}
                  setListForm={handleSetListForm}
                  ref={ref}
                />

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
  const { BASE_FORM, onSetFields, type } = props

  const [radio, setRadio] = useState(null)

  const onRadioChange = (e) => {
    setRadio(e.target.value)
    if (e.target.value === 1) {
      let val = ref.current.getFieldValue([...BASE_FORM, 'current'])
      onSetFields([...BASE_FORM, 'contact'], val, ref)
    }
  }
  return (
    <div className={styles.groupInput}>
      {type && type !== '1' && (
        <Form.Item
          name={[...BASE_FORM, 'capital']}
          label="Số tiền góp vốn"
          placeholder="Số tiền góp vốn"
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      <CCInput
        name={[...BASE_FORM, 'name']}
        label="Họ và Tên"
        placeholder="NGUYỄN VĂN A"
        onChange={(e) =>
          onSetFields([...BASE_FORM, 'name'], e.target.value, ref, true)
        }
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

      <CCInput
        type="select"
        name={[...BASE_FORM, 'doc_type']}
        label="Loại giấy tờ"
        // defaultValue="Chứng minh nhân dân"
        options={SELECT.DOC_TYPE}
      />

      <CCInput
        label={'Số CMND / CCCD / Hộ chiếu'}
        name={[...BASE_FORM, 'doc_code']}
        placeholder="0010829446357"
      />

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

      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ thường trú</b></>',
            }}
          />
        }
        className={styles.newLine}
      >
        <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'current']} />
      </Form.Item>
      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ liên lạc</b></>',
            }}
          />
        }
        className={styles.newLine}
      >
        <Radio.Group onChange={onRadioChange} value={radio}>
          <Space direction="vertical">
            <Radio value={1}>Giống với địa chỉ thường trú</Radio>
            <Radio value={2}>Khác</Radio>
          </Space>
        </Radio.Group>

        {
          <div
            style={{
              padding: '8px 0',
              opacity: radio && radio === 2 ? '1' : '0',
              visibility: radio && radio === 2 ? 'visible' : 'hidden',
              display: radio && radio === 2 ? 'block' : 'none',
            }}
          >
            <CCSelect.SelectProvince
              ref={ref}
              name={[...BASE_FORM, 'contact']}
              label="Nơi cấp"
            />
          </div>
        }
      </Form.Item>
    </div>
  )
})

const OriginalPerson = forwardRef((props, ref) => {
  const { BASE_FORM, onSetFields, type } = props

  const [radio, setRadio] = useState(null)
  const onRadioChange = (e) => {
    setRadio(e.target.value)

    if (e.target.value === 1) {
      let val = ref.current.getFieldValue([...BASE_FORM, 'current'])
      onSetFields([...BASE_FORM, 'contact'], val, ref)
    }
  }

  return (
    <div className={styles.groupInput}>
      {/* START Nhập thông tin của tổ chức */}
      {type && type !== '1' && (
        <Form.Item
          name={[...BASE_FORM, 'capital']}
          label="Số tiền góp vốn"
          placeholder="Số tiền góp vốn"
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      <CCInput
        label="Tên tổ chức"
        name={[...BASE_FORM, 'organization', 'name']}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        onChange={(e) =>
          onSetFields(
            [...BASE_FORM, 'organization', 'name'],
            e.target.value,
            ref,
            true,
          )
        }
      />
      <CCInput
        label="Mã số DN hoặc Mã số thuế"
        name={[...BASE_FORM, 'organization', 'mst']}
        placeholder="0316184427"
      />
      <CCInput
        type="date"
        name={[...BASE_FORM, 'organization', 'doc_time_provide']}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: 'Ngày cấp <i>(ngày đăng ký lần đầu)</i>',
            }}
          />
        }
        placeholder="Chọn ngày"
        inputReadOnly={false}
      />

      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '<b>Địa chỉ trụ sở chính</b>',
            }}
          />
        }
        className={styles.newLine}
      >
        <CCSelect.SelectProvince
          ref={ref}
          name={[...BASE_FORM, 'organization', 'doc_place_provide']}
        />
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
        onChange={(e) =>
          onSetFields([...BASE_FORM, 'name'], e.target.value, ref, true)
        }
      />
      <CCSelect.SelectTitle
        ref={ref}
        name={[...BASE_FORM, 'title']}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</>Chức danh <i>(ĐDPL)</i></>',
            }}
          />
        }
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

      <CCInput
        type="select"
        name={[...BASE_FORM, 'doc_type']}
        label="Loại giấy tờ"
        options={SELECT.DOC_TYPE}
      />

      <CCInput
        label={'Số CMND / CCCD / Hộ chiếu'}
        name={[...BASE_FORM, 'doc_code']}
        placeholder="0316184427"
      />

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

      <Form.Item
        className={styles.newLine}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ thường trú <i>(ĐDPL)</i></b></>',
            }}
          />
        }
      >
        <CCSelect.SelectProvince
          ref={ref}
          name={[...BASE_FORM, 'current']}
          label="Nơi đăng kí hộ khẩu thường trú"
        />
      </Form.Item>

      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ liên lạc <i>(ĐDPL)</i><b></>',
            }}
          />
        }
        className={styles.newLine}
      >
        <Radio.Group onChange={onRadioChange} value={radio}>
          <Space direction="vertical">
            <Radio value={1}>Giống với địa chỉ thường trú</Radio>
            <Radio value={2}>Khác</Radio>
          </Space>
        </Radio.Group>

        {
          <div
            style={{
              padding: '8px 0',
              opacity: radio && radio === 2 ? '1' : '0',
              visibility: radio && radio === 2 ? 'visible' : 'hidden',
              display: radio && radio === 2 ? 'block' : 'none',
            }}
          >
            <CCSelect.SelectProvince
              ref={ref}
              name={[...BASE_FORM, 'contact']}
              label="Nơi ở hiện tại"
            />
          </div>
        }
      </Form.Item>
    </div>
  )
})

const PresentPerson = forwardRef((props, ref) => {
  const { BASE_FORM, index, setListForm } = props

  const handleSelectPresentPerson = (val, opt) => {
    setListForm({ index, val })
  }

  return (
    <CCInput
      display={'none'}
      type="select"
      name={[...BASE_FORM, 'origin_person', index, 'present_person']}
      onSelect={handleSelectPresentPerson}
      defaultActiveFirstOption
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
