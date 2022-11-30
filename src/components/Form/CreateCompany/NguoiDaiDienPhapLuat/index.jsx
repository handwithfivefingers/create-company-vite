import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { htmlContent, onSetFields } from '@/helper/Common'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import CCSelect from '../../../CCSelect'
import styles from '../CreateCompany.module.scss'

const NguoiDaiDienPhapLuat = forwardRef(({ data, ...props }, ref) => {
  const { current, BASE_FORM } = props

  const [listForm, setListForm] = useState([])

  const [present, setPresent] = useState([null, null, null])

  const [_render, setRender] = useState(false)

  const listField = {
    name: '',
    title: '',
    gender: '',
    birth_day: '',
    per_type: '',
    current: '',
    contact: '',
    doc_type: '',
    doc_code: '',
    doc_time_provide: '',
    doc_place_provide: '',
  }

  useEffect(() => {
    addItem()
  }, [])

  const addItem = () => {
    setListForm([...listForm, listField])
    return scrollIntoField()
  }

  const scrollIntoField = () => {
    let len = listForm.length
    let pathName = [...BASE_FORM, 'legal_respon', len - 1, 'name']
    ref.current.scrollToField(pathName, { behavior: 'smooth' })
  }

  return (
    <Form.Item
      label={<h3>Người đại diện pháp luật </h3>}
      className={clsx([
        styles.hide,
        props.className,
        {
          [styles.visible]: current === 3,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        <Col span={24}>
          {listForm.length < 3 && (
            <Button onClick={addItem} icon={<PlusOutlined />} type="primary">
              Thêm người đại diện
            </Button>
          )}
        </Col>

        {listForm.map((item, i) => {
          return (
            <Col lg={8} md={12} sm={24} key={[item, i]}>
              <PeronalType
                index={i}
                ref={ref}
                BASE_FORM={BASE_FORM}
                handleForm={{ state: listForm, setState: setListForm }}
                presentState={{ state: present, setState: setPresent }}
                type={data?.type}
              />
            </Col>
          )
        })}
      </Row>
    </Form.Item>
  )
})

const PeronalType = forwardRef((props, ref) => {
  const { index, handleForm, BASE_FORM, presentState } = props

  const { state: present, setState: setPresent } = presentState

  const getPersonType = () => {
    let pathName = [...BASE_FORM, 'origin_person']

    let originPerson = ref?.current?.getFieldValue(pathName)

    let options = originPerson?.map((item, index) => ({
      name: item?.name || '...',
      value: index,
    })) || [{ value: null, name: 'None' }]

    options.push({
      value: -1,
      name: 'Khác',
    })

    return options
  }

  const handleSelectPersonType = (val, index) => {
    /**
     * @params {val} => index value need to get
     * @params {index} => index position of child list form
     */

    let data = [...present]

    data[index] = `${val}`

    setPresent(data)

    let originPathName = [...BASE_FORM, 'origin_person', val]

    let legalPathName = [...BASE_FORM, 'legal_respon', index]

    let originPerson = ref?.current?.getFieldValue(originPathName)
    
    if (originPerson) {
      onSetFields(legalPathName, originPerson, ref)
    }
    
    onSetFields([...legalPathName, 'select_person'], val, ref)
  }

  useEffect(() => {
    let value = ref.current.getFieldValue([...BASE_FORM, 'legal_respon', index, 'name'])
    let options = getPersonType()

    let valIndex = options.findIndex((item) => item.name === value)

    if (valIndex !== -1) {
      onSetFields([...BASE_FORM, 'legal_respon', index, 'select_person'], options[valIndex].value, ref)
    }
  }, [])

  return (
    <>
      <Form.Item
        name={[...BASE_FORM, 'legal_respon', index, 'select_person']}
        label={htmlContent('<b>Chọn người đại diện</b>')}
        rules={[{ required: true, message: 'Chọn người đại diện là bắt buộc' }]}
      >
        {getPersonType() && (
          <Select
            onSelect={(e) => handleSelectPersonType(e, index)}
            placeholder="Bấm vào đây"
            autoComplete="off"
            value={present[index]}
          >
            {getPersonType()?.map((item, i) => {
              return (
                <Select.Option value={item.value} key={item.key ? item.key : [name, i, item.value]}>
                  {item.name}
                </Select.Option>
              )
            })}
          </Select>
        )}
      </Form.Item>

      <FormListPersonType
        {...props}
        ref={ref}
        listFormState={handleForm}
        presentState={presentState}
        BASE_FORM={BASE_FORM}
        i={index}
        type={props?.type}
      />
    </>
  )
})

const FormListPersonType = forwardRef((props, ref) => {
  const { i, presentState, listFormState, BASE_FORM } = props

  const { state, setState } = listFormState

  const { state: present, setState: setPresent } = presentState
  const [type, setType] = useState(null)

  const removeItem = (index) => {
    let val = ref.current.getFieldValue([...BASE_FORM, 'legal_respon'])

    val = [...val.slice(0, index), ...val.slice(index + 1)]

    let objPresent = [...present]

    objPresent[index] = null

    objPresent = [...objPresent.filter((item) => item !== null), null]

    setPresent(objPresent)

    onSetFields([...BASE_FORM, 'legal_respon'], val, ref)

    setState(val)
  }

  useEffect(() => {
    let value = ref.current.getFieldsValue()
    setType(value?.category?.type)
  }, [props])

  return (
    <Form.Item
      label={
        <div className={styles.label}>
          <div className={styles.title}>Thông tin người đại diện thứ {i + 1}</div>
          <Button
            type="text"
            shape="circle"
            danger
            icon={<MinusCircleOutlined onClick={() => removeItem(i)} />}
            style={{
              display: state.length > 1 ? 'block' : 'none',
            }}
          />
        </div>
      }
    >
      <CCInput
        name={[...BASE_FORM, 'legal_respon', i, 'name']}
        label="Họ và tên"
        onChange={(e) => onSetFields([...BASE_FORM, 'legal_respon', i, 'name'], e.target.value, ref, true)}
        required
      />

      <CCSelect.SelectTitle
        name={[...BASE_FORM, 'legal_respon', i, 'title']}
        label="Chức danh"
        placeholder="Bấm vào đây"
        options={+type === 1 ? SELECT.TITLE_1TV : +type === 2 ? SELECT.TITLE_2TV : +type === 3 ? SELECT.TITLE_CP : ''}
        ref={ref}
        required
      />

      <div style={{ display: +present[i] != -1 ? 'none' : 'block' }}>
        <CCInput
          type="select"
          name={[...BASE_FORM, 'legal_respon', i, 'gender']}
          label="Giới tính"
          options={SELECT.GENDER}
          placeholder="Bấm vào đây"
          required
        />

        <CCInput
          type="date"
          name={[...BASE_FORM, 'legal_respon', i, 'birth_day']}
          label="Ngày sinh"
          placeholder="15/01/1966 - ENTER"
          inputReadOnly={false}
          required
        />

        <CCSelect.SelectPersonType
          name={[...BASE_FORM, 'legal_respon', i, 'per_type']}
          label="Dân tộc"
          ref={ref}
          required
        />

        <CCInput
          type="select"
          name={[...BASE_FORM, 'legal_respon', i, 'doc_type']}
          label="Loại giấy tờ"
          options={SELECT.DOC_TYPE}
          placeholder="Bấm vào đây"
          required
        />

        <CCInput
          name={[...BASE_FORM, 'legal_respon', i, 'doc_code']}
          label="Số CMND / CCCD / Hộ chiếu"
          placeholder="0316184427"
          required
        />

        <CCInput
          type="date"
          name={[...BASE_FORM, 'legal_respon', i, 'doc_time_provide']}
          label="Ngày cấp"
          placeholder="15/01/1966 - ENTER"
          inputReadOnly={false}
          required
        />

        <CCSelect.SelectDocProvide
          name={[...BASE_FORM, 'legal_respon', i, 'doc_place_provide']}
          label="Nơi cấp"
          ref={ref}
          required
        />

        <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')}>
          <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'legal_respon', i, 'current']} required />
        </Form.Item>

        <CCSelect.RadioAddress
          ref={ref}
          prevField={[...BASE_FORM, 'legal_respon', i, 'current']}
          nextField={[...BASE_FORM, 'legal_respon', i, 'contact']}
          label={'<b>Nơi ở hiện tại</b>'}
          required
        />
      </div>
    </Form.Item>
  )
})

export default NguoiDaiDienPhapLuat
