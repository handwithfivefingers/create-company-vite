import { Button, Form, Select, Row, Col, message, Divider, Radio, Space, Card } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import CCAddress from '../../../CCAddress'
import CCSelect from '../../../CCSelect'
import { onSetFields, htmlContent } from '@/helper/Common'
import styles from './styles.module.scss'
import _, { isEqual } from 'lodash'
import { useLocation } from 'react-router-dom'

const BASE_FORM = ['change_info', 'legal_representative']

const PERSON_TYPE = {
  ADD: 'includes',
  REMOVE: 'excludes',
}

const DaiDienPhapLuat = forwardRef((props, ref) => {
  const [radio, setRadio] = useState([null, null, null])

  const [present, setPresent] = useState([null, null, null])

  const [listLegal, setListLegal] = useState([])

  const [listIncludesOrExclude, setListIncludesOrExclude] = useState([])

  const location = useLocation()

  let listForm = {}

  useEffect(() => {
    if (!location.state) return

    let legalValue = ref.current.getFieldValue(BASE_FORM)

    if (legalValue?.in_out) {
      handleIncludesOrExludesPeople(legalValue.in_out)
    }
    if (legalValue?.after_change) {
      setListLegal(legalValue?.after_change)
    }
  }, [location])

  const addNewLegal = () => {
    let val = JSON.parse(JSON.stringify(listLegal))

    setListLegal([...val, listForm])

    let value = ref.current.getFieldValue(BASE_FORM)
    console.log(value)
  }

  const handleIncludesOrExludesPeople = (val = null) => {
    if (val) {
      setListIncludesOrExclude(val)
    } else {
      setListIncludesOrExclude([...listIncludesOrExclude, {}])
    }
  }
  return (
    <Form.Item
      label={<h3>Thay đổi người đại diện</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label={htmlContent('<b>BỎ BỚT HOẶC THÊM MỚI NGƯỜI ĐẠI DIỆN</b>')}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Button type="primary" onClick={() => handleIncludesOrExludesPeople()}>
              Thêm mới thông tin
            </Button>
          </Col>
          {listIncludesOrExclude &&
            listIncludesOrExclude?.map((item, i) => (
              <Col lg={12} md={24} sm={24} xs={24} key={[i, item]}>
                <PeoppleWrapper {...props} BASE_FORM={BASE_FORM} ref={ref} i={i} />
              </Col>
            ))}
        </Row>
      </Form.Item>

      <Divider />

      <Form.Item label={htmlContent('<b>DANH SÁCH NGƯỜI ĐẠI DIỆN SAU KHI THAY ĐỔI</b>')}>
        <Button onClick={addNewLegal}>Thêm người đại diện</Button>
        <Row gutter={[12]}>
          {listLegal.map((item, i) => {
            return (
              <Col lg={8} md={12} sm={24} xs={24} key={i}>
                <PeronalType
                  index={i}
                  ref={ref}
                  BASE_FORM={BASE_FORM}
                  handleForm={{ state: listLegal, setState: setListLegal }}
                  presentState={{ state: present, setState: setPresent }}
                  radioState={{ state: radio, setState: setRadio }}
                  type={props?.data.type}
                />
              </Col>
            )
          })}
        </Row>
      </Form.Item>
    </Form.Item>
  )
})

const PeoppleWrapper = forwardRef((props, ref) => {
  const { BASE_FORM, i, type } = props

  const [legalType, setLegalType] = useState()

  const location = useLocation()

  useEffect(() => {
    let { state } = location

    if (!state) return

    let typeIndex = ref.current.getFieldValue([...BASE_FORM, 'in_out', i, 'type'])

    setLegalType(typeIndex)
  }, [location, props])

  const handleSelectPeopleType = (value) => {
    setLegalType(value)
    onSetFields([...BASE_FORM, 'in_out', i, 'type'], value, ref)
  }

  const renderFormByType = () => {
    let html = null
    if (legalType === PERSON_TYPE.REMOVE) {
      html = (
        <Card className={'box__shadow m-tb-5'}>
          <CCInput
            label="Họ và tên"
            name={[...BASE_FORM, 'in_out', i, 'name']}
            onChange={(e) => onSetFields([...BASE_FORM, 'in_out', i, 'name'], e.target.value, ref, true)}
          />
          <CCSelect.SelectTitle
            name={[...BASE_FORM, 'in_out', i, 'title']}
            label="Chức danh"
            placeholder="Bấm vào đây"
            options={
              +type === 1 ? SELECT.TITLE_1TV : +type === 2 ? SELECT.TITLE_2TV : +type === 3 ? SELECT.TITLE_CP : ''
            }
            ref={ref}
          />
        </Card>
      )
    } else if (legalType === PERSON_TYPE.ADD) {
      html = (
        <Card className={'box__shadow m-tb-5'}>
          <CCInput
            label="Họ và tên"
            name={[...BASE_FORM, 'in_out', i, 'name']}
            onChange={(e) => onSetFields([...BASE_FORM, 'in_out', i, 'name'], e.target.value, ref, true)}
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, 'in_out', i, 'gender']}
            label="Giới tính"
            options={SELECT.GENDER}
          />

          <CCInput type="select" name={[...BASE_FORM, 'in_out', i, 'title']} label="Chức danh" options={SELECT.TITLE} />

          <CCInput name={[...BASE_FORM, 'in_out', i, 'birth_day']} label="Sinh ngày" type="date" />

          <CCSelect.SelectPersonType
            ref={ref}
            name={[...BASE_FORM, 'in_out', i, 'per_type']}
            label="Dân tộc"
            placeholder="Bấm vào đây"
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, 'in_out', i, 'doc_type']}
            label="Loại giấy tờ pháp lý"
            options={SELECT.DOC_TYPE}
          />

          <CCInput name={[...BASE_FORM, 'in_out', i, 'doc_code']} label="Số CMND/ CCCD/ Hộ chiếu" />

          <CCInput name={[...BASE_FORM, 'in_out', i, 'doc_time_provide']} label="Ngày cấp" type="date" />

          <CCSelect.SelectDocProvide
            ref={ref}
            name={[...BASE_FORM, 'in_out', i, 'doc_place_provide']}
            label="Nơi cấp"
            placeholder="Bấm vào đây"
          />

          <CCAddress name={[...BASE_FORM, 'in_out', i]} ref={ref} />
        </Card>
      )
    }

    return html
  }

  return (
    <Col span={24}>
      <Form.Item name={[...BASE_FORM, 'in_out', i, 'type']}>
        <Select onChange={handleSelectPeopleType} placeholder="Bấm vào đây">
          <Select.Option value={PERSON_TYPE.REMOVE}>Bỏ bớt người đại diện</Select.Option>
          <Select.Option value={PERSON_TYPE.ADD}>Thêm mới người đại diện</Select.Option>
        </Select>
      </Form.Item>
      {renderFormByType()}
    </Col>
  )
})

const PeronalType = forwardRef((props, ref) => {
  const { index, handleForm, BASE_FORM, presentState } = props

  const { state: present, setState: setPresent } = presentState

  const location = useLocation()

  useEffect(() => {
    let value = ref.current.getFieldValue([...BASE_FORM, 'after_change', index, 'name'])

    let options = getPersonType()

    let valIndex = options.findIndex((item) => item.name === value)
    // setPresent
    let _dataPresent = [...present]

    _dataPresent[index] = valIndex

    console.log(_dataPresent)

    setPresent(_dataPresent)
    if (valIndex !== -1) {
      onSetFields([...BASE_FORM, 'after_change', index, 'select_person'], options[valIndex].value, ref)
    }
  }, [location])

  const getPersonType = () => {
    let pathName = [...BASE_FORM, 'in_out']

    let originPerson = ref?.current?.getFieldValue(pathName)

    let listUser = originPerson?.filter((item) => item.type === PERSON_TYPE.ADD) || []

    let options =
      listUser?.map(({ name, organization }, index) => ({
        name: name || '...',
        value: index,
      })) || []

    options.push({
      value: -1,
      name: 'Khác',
    })

    return options
  }

  const handleSelectPersonType = (val, i) => {
    /**
     * @params {val} => index value need to get
     * @params {index} => index position of child list form
     */

    let legalPathName = [...BASE_FORM, 'after_change', i]

    let listOriginPerson = ref?.current?.getFieldValue([...BASE_FORM, 'in_out'])

    let originPerson

    if (listOriginPerson?.length) {
      originPerson = listOriginPerson.filter((item) => item.type !== PERSON_TYPE.REMOVE)
    }
    if (originPerson && val !== -1) {
      ref.current.setFields([
        {
          name: [...BASE_FORM, 'after_change', index, 'select_person'],
          value: val,
        },
      ])
      onSetFields(legalPathName, originPerson?.[val], ref)
    }
  }

  return (
    <>
      <Form.Item
        name={[...BASE_FORM, 'after_change', index, 'select_person']}
        label={htmlContent('<b>Chọn người đại diện</b>')}
      >
        <Select onChange={(e) => handleSelectPersonType(e, index)} placeholder="Bấm vào đây" required>
          {getPersonType()?.map((item) => {
            return <Select.Option value={item.value}>{item.name}</Select.Option>
          })}
        </Select>
      </Form.Item>
      <FormListPersonType
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

  const watchField = Form.useWatch(['change_info', 'legal_representative', 'after_change'], ref.current)

  const removeItem = (index) => {
    let val = ref.current.getFieldValue([...BASE_FORM, 'after_change'])

    val = [...val.slice(0, index), ...val.slice(index + 1)]

    let objPresent = [...present]

    objPresent[index] = null

    objPresent = [...objPresent.filter((item) => item !== null), null]

    setPresent(objPresent)

    onSetFields([...BASE_FORM, 'after_change'], val, ref)

    setState(val)
  }

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
      <div style={{ display: +watchField?.[i]?.select_person != -1 ? 'none' : 'block' }}>
        <CCInput
          label="Họ và tên"
          name={[...BASE_FORM, 'after_change', i, 'name']}
          onChange={(e) => onSetFields([...BASE_FORM, 'after_change', i, 'name'], e.target.value, ref, true)}
        />

        <CCInput
          type="select"
          name={[...BASE_FORM, 'after_change', i, 'gender']}
          label="Giới tính"
          options={SELECT.GENDER}
        />

        <CCInput
          type="select"
          name={[...BASE_FORM, 'after_change', i, 'title']}
          label="Chức danh"
          options={SELECT.TITLE}
        />

        <CCInput name={[...BASE_FORM, 'after_change', i, 'birth_day']} label="Sinh ngày" type="date" />

        <CCSelect.SelectPersonType
          ref={ref}
          name={[...BASE_FORM, 'after_change', i, 'per_type']}
          label="Dân tộc"
          placeholder="Bấm vào đây"
        />

        <CCInput
          type="select"
          name={[...BASE_FORM, 'after_change', i, 'doc_type']}
          label="Loại giấy tờ pháp lý"
          options={SELECT.DOC_TYPE}
        />

        <CCInput name={[...BASE_FORM, 'after_change', i, 'doc_code']} label="Số CMND/ CCCD/ Hộ chiếu" />

        <CCInput name={[...BASE_FORM, 'after_change', i, 'doc_time_provide']} label="Ngày cấp" type="date" />

        <CCSelect.SelectDocProvide
          ref={ref}
          name={[...BASE_FORM, 'after_change', i, 'doc_place_provide']}
          label="Nơi cấp"
          placeholder="Bấm vào đây"
        />

        <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')}>
          <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'after_change', i, 'current']} />
        </Form.Item>

        <CCSelect.RadioAddress
          ref={ref}
          prevField={[...BASE_FORM, 'after_change', i, 'current']}
          nextField={[...BASE_FORM, 'after_change', i, 'contact']}
          label="<b>Nơi ở hiện tại</b>"
        />
      </div>
    </Form.Item>
  )
})

export default DaiDienPhapLuat
