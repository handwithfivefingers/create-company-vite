import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import {
  CCInputDateProvideIdentify,
  CCInputNumberIdentify,
  CCInputOutdateIdentify,
  CCInputProviderIdentify,
  CCInputTypeIdentify,
} from '@/components/CCInputIdentify'
import { htmlContent, onSetFields } from '@/helper/Common'
import { useLocation } from 'react-router-dom'
import { useStepData } from '../../../../context/StepProgressContext'
import CCAddress from '../../../CCAddress'
import CCInputBirthDay from '../../../CCInputBirthDay'
import CCSelect from '../../../CCSelect'
import styles from './styles.module.scss'
import { debounce } from 'lodash-es'
import { useOrderAction } from '../../../../store/actions/order.actions'
import { useDispatch } from 'react-redux'
import { useChangeInforOrder } from '../../../../store/reducer'

const BASE_FORM = ['change_info', 'legal_representative']

const PERSON_TYPE = {
  ADD: 'includes',
  REMOVE: 'excludes',
}
let listField = { present_person: undefined }

const DaiDienPhapLuat = (props) => {
  const { currentStep } = useStepData()
  const action = useOrderAction()
  const [listIncludesOrExclude, setListIncludesOrExclude] = useState([])
  const formInstance = Form.useFormInstance()
  const changeInfoOrder = useChangeInforOrder()
  const listLegalRepresentative = useMemo(
    () => changeInfoOrder?.legal_representative?.after_change || [listField],
    [changeInfoOrder?.legal_representative?.after_change],
  )

  const dispatch = useDispatch()

  const addNewLegal = () => {
    const currentValue = formInstance.getFieldValue([...BASE_FORM, 'after_change'])
    const nextValue = currentValue?.length
      ? [...currentValue, { select_person: undefined }]
      : [{ select_person: undefined }]
    formInstance.setFields([
      {
        name: [...BASE_FORM, 'after_change'],
        value: nextValue,
      },
    ])
    const orderValue = formInstance.getFieldsValue(true)
    setTimeout(() => {
      dispatch(action.onUpdateChangeInfo(orderValue?.change_info))
    }, 250)
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
        [styles.active]: currentStep === props.index,
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
                <PeoppleWrapper {...props} BASE_FORM={BASE_FORM} i={i} />
              </Col>
            ))}
        </Row>
      </Form.Item>

      <Divider />

      <Form.Item label={htmlContent('<b>DANH SÁCH NGƯỜI ĐẠI DIỆN SAU KHI THAY ĐỔI</b>')}>
        <Button onClick={addNewLegal}>Thêm người đại diện</Button>
        <Row gutter={[12]}>
          {listLegalRepresentative?.map((_, i) => {
            return (
              <Col lg={8} md={12} sm={24} xs={24} key={[_, i]}>
                <PeronalType
                  index={i}
                  BASE_FORM={BASE_FORM}
                  // handleForm={{ state: listLegal, setState: setListLegal }}
                  // presentState={{ state: present, setState: setPresent }}
                  // radioState={{ state: radio, setState: setRadio }}
                />
              </Col>
            )
          })}
        </Row>
      </Form.Item>
    </Form.Item>
  )
}

const TITLE_OPTIONS = {
  1: SELECT.TITLE_1TV,
  2: SELECT.TITLE_2TV,
  3: SELECT.TITLE_CP,
}
const PeoppleWrapper = (props) => {
  const { BASE_FORM, i, type } = props
  const formInstance = Form.useFormInstance()
  const doctypeWatch = Form.useWatch([...BASE_FORM, 'in_out', i, 'doc_type'], formInstance)
  const watchTypeOptions = Form.useWatch([...BASE_FORM, 'in_out', i, 'type'], formInstance)

  console.log('watchTypeOptions', watchTypeOptions)
  return (
    <Col span={24}>
      <Form.Item
        name={[...BASE_FORM, 'in_out', i, 'type']}
        required
        rules={[{ required: true, message: 'Vui lòng Thêm hoặc bỏ bớt người đại diện' }]}
      >
        <Select placeholder="Bấm vào đây">
          <Select.Option value={PERSON_TYPE.REMOVE}>Bỏ bớt người đại diện</Select.Option>
          <Select.Option value={PERSON_TYPE.ADD}>Thêm mới người đại diện</Select.Option>
        </Select>
      </Form.Item>
      {watchTypeOptions === PERSON_TYPE.REMOVE ? (
        <Card className={'box__shadow m-tb-5'}>
          <CCInput
            label="Họ và tên"
            name={[...BASE_FORM, 'in_out', i, 'name']}
            onBlur={debounce((e) => {
              formInstance.setFields([
                {
                  name: [...BASE_FORM, 'in_out', i, 'name'],
                  value: formInstance.getFieldValue([...BASE_FORM, 'in_out', i, 'name'])?.toUpperCase(),
                },
              ])
            }, 500)}
            required
          />
          <CCSelect.SelectTitle
            name={[...BASE_FORM, 'in_out', i, 'title']}
            label="Chức danh"
            placeholder="Bấm vào đây"
            options={TITLE_OPTIONS[type]}
            required
          />
        </Card>
      ) : (
        ''
      )}
      {watchTypeOptions === PERSON_TYPE.ADD ? (
        <Card className={'box__shadow m-tb-5'}>
          <CCInput
            label="Họ và tên"
            name={[...BASE_FORM, 'in_out', i, 'name']}
            required
            onBlur={debounce((e) => {
              formInstance.setFields([
                {
                  name: [...BASE_FORM, 'in_out', i, 'name'],
                  value: formInstance.getFieldValue([...BASE_FORM, 'in_out', i, 'name'])?.toUpperCase(),
                },
              ])
            }, 500)}
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, 'in_out', i, 'gender']}
            label="Giới tính"
            required
            options={SELECT.GENDER}
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, 'in_out', i, 'title']}
            label="Chức danh"
            options={SELECT.TITLE}
            required
          />

          <CCInputBirthDay name={[...BASE_FORM, 'in_out', i, 'birth_day']} label="Sinh ngày" required />

          <CCSelect.SelectPersonType
            name={[...BASE_FORM, 'in_out', i, 'per_type']}
            label="Dân tộc"
            placeholder="Bấm vào đây"
            required
          />

          <CCInputTypeIdentify name={[...BASE_FORM, 'in_out', i, 'doc_type']} required />

          <CCInputNumberIdentify indentifyType={doctypeWatch} name={[...BASE_FORM, 'in_out', i, 'doc_code']} required />

          <CCInputDateProvideIdentify
            name={[...BASE_FORM, 'in_out', i, 'doc_time_provide']}
            required
            inputReadOnly={false}
            indentifyType={doctypeWatch}
          />

          <CCInputOutdateIdentify name={[...BASE_FORM, 'in_out', i, 'doc_outdate']} indentifyType={doctypeWatch} />

          <CCInputProviderIdentify
            name={[...BASE_FORM, 'in_out', i, 'doc_place_provide']}
            required
            indentifyType={doctypeWatch}
          />

          <CCAddress name={[...BASE_FORM, 'in_out', i]} required />
        </Card>
      ) : (
        ''
      )}
    </Col>
  )
}

const PeronalType = (props) => {
  const { index, BASE_FORM } = props
  const formInstance = Form.useFormInstance()


  const getPersonType = () => {
    let pathName = [...BASE_FORM, 'in_out']
    let originPerson = formInstance?.getFieldValue(pathName)
    let listUser = originPerson?.filter((item) => item.type === PERSON_TYPE.ADD) || []
    let options =
      listUser?.map(({ name }, index) => ({
        name: name || '...',
        value: index,
      })) || []
    options.push({
      value: -1,
      name: 'Khác',
    })
    return options
  }

  // const handleSelectPersonType = (val, i) => {
  //   /**
  //    * @params {val} => index value need to get
  //    * @params {index} => index position of child list form
  //    */

  //   let legalPathName = [...BASE_FORM, 'after_change', i]

  //   let listOriginPerson = formInstance?.getFieldValue([...BASE_FORM, 'in_out'])

  //   let originPerson

  //   if (listOriginPerson?.length) {
  //     originPerson = listOriginPerson.filter((item) => item.type !== PERSON_TYPE.REMOVE)
  //   }
  //   if (originPerson && val !== -1) {
  //     formInstance.setFields([
  //       {
  //         name: [...BASE_FORM, 'after_change', index, 'select_person'],
  //         value: val,
  //       },
  //     ])
  //     formInstance.setFields([
  //       {
  //         name: legalPathName,
  //         value: originPerson?.[val],
  //       },
  //     ])
  //   }
  // }

  return (
    <>
      <Form.Item
        name={[...BASE_FORM, 'after_change', index, 'select_person']}
        label={htmlContent('<b>Chọn người đại diện</b>')}
        required
        rules={[{ required: true, message: 'Vui lòng thêm người đại diện sau thay đổi' }]}
      >
        {/* <Select onChange={(e) => handleSelectPersonType(e, index)} placeholder="Bấm vào đây" required> */}
        <Select placeholder="Bấm vào đây" required>
          {getPersonType()?.map((item) => {
            return <Select.Option value={item.value}>{item.name}</Select.Option>
          })}
        </Select>
      </Form.Item>
      <FormListPersonType BASE_FORM={BASE_FORM} i={index} />
    </>
  )
}

const FormListPersonType = (props) => {
  const { i, BASE_FORM } = props
  const formInstance = Form.useFormInstance()
  const watchField = Form.useWatch(['change_info', 'legal_representative', 'after_change'], formInstance)
  const doctypeWatch = Form.useWatch([...BASE_FORM, 'after_change', i, 'doc_type'], formInstance)

  const removeItem = (index) => {
    let val = formInstance.getFieldValue([...BASE_FORM, 'after_change'])
    val.splice(index, 1)
    formInstance.setFields([
      {
        name: [...BASE_FORM, 'after_change'],
        value: val,
      },
    ])
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
              display: watchField?.length > 1 ? 'block' : 'none',
            }}
          />
        </div>
      }
    >
      <div style={{ display: +watchField?.[i]?.select_person != -1 ? 'none' : 'block' }}>
        <CCInput
          label="Họ và tên"
          name={[...BASE_FORM, 'after_change', i, 'name']}
          onBlur={(e) => {
            formInstance.setFields([
              {
                name: [...BASE_FORM, 'after_change', i, 'name'],
                value: formInstance.getFieldValue([...BASE_FORM, 'after_change', i, 'name'])?.toUpperCase(),
              },
            ])
          }}
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

        <CCInputBirthDay name={[...BASE_FORM, 'after_change', i, 'birth_day']} label="Sinh ngày" />

        <CCInputTypeIdentify name={[...BASE_FORM, 'after_change', i, 'doc_type']} required />

        <CCInputNumberIdentify
          indentifyType={doctypeWatch}
          name={[...BASE_FORM, 'after_change', i, 'doc_code']}
          required
        />

        <CCInputDateProvideIdentify
          name={[...BASE_FORM, 'after_change', i, 'doc_time_provide']}
          required
          inputReadOnly={false}
          indentifyType={doctypeWatch}
        />

        <CCInputOutdateIdentify name={[...BASE_FORM, 'after_change', i, 'doc_outdate']} indentifyType={doctypeWatch} />

        <CCInputProviderIdentify
          name={[...BASE_FORM, 'after_change', i, 'doc_place_provide']}
          required
          indentifyType={doctypeWatch}
        />

        <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')}>
          <CCSelect.SelectProvince name={[...BASE_FORM, 'after_change', i, 'current']} />
        </Form.Item>

        <CCSelect.RadioAddress
          prevField={[...BASE_FORM, 'after_change', i, 'current']}
          nextField={[...BASE_FORM, 'after_change', i, 'contact']}
          label="<b>Nơi ở hiện tại</b>"
        />
      </div>
    </Form.Item>
  )
}

export default DaiDienPhapLuat
