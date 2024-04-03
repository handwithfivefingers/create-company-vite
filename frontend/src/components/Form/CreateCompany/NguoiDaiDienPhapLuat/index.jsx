import { useStepData } from '@/context/StepProgressContext'
import { htmlContent } from '@/helper/Common'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useCreateCompanyOrder } from '../../../../store/reducer'
import styles from '../CreateCompany.module.scss'
import FormListPersonType from './FormListPersonal'
import { useDispatch } from 'react-redux'
import { useOrderAction } from '../../../../store/actions/order.actions'
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

const NguoiDaiDienPhapLuat = ({ data, ...props }) => {
  const { BASE_FORM } = props
  const legalResponPathName = [...BASE_FORM, 'legal_respon']
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  const [listForm, setListForm] = useState([{ ...listField }])
  const [present, setPresent] = useState([null, null, null])
  const dispatch = useDispatch()
  const action = useOrderAction()
  const createCompanyOrder = useCreateCompanyOrder()
  const listLegalReponse = useMemo(
    () => createCompanyOrder?.approve?.legal_respon || [listField],
    [createCompanyOrder?.approve?.legal_respon?.length],
  )
  useEffect(() => {
    window.form = formInstance
  }, [])

  const addItem = () => {
    const nextValue = [...formInstance.getFieldValue(legalResponPathName), listField]

    formInstance.setFields([
      {
        name: legalResponPathName,
        value: nextValue,
      },
    ])
    const orderValue = formInstance.getFieldsValue(true)
    console.log('orderValue?.create_company', orderValue?.create_company)
    setTimeout(() => {
      dispatch(action.onUpdateCreateCompany(orderValue?.create_company))
    }, 500)
    return scrollIntoField()
  }

  const scrollIntoField = () => {
    let len = listForm.length
    let pathName = [...BASE_FORM, 'legal_respon', len - 1, 'name']
    formInstance?.scrollToField(pathName, { behavior: 'smooth' })
  }

  return (
    <Form.Item
      label={<h3>Người đại diện pháp luật </h3>}
      className={clsx([
        styles.hide,
        props.className,
        {
          [styles.visible]: currentStep === 3,
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

        {listLegalReponse?.map((item, i) => {
          return (
            <Col lg={8} md={12} sm={24} key={[item, i]}>
              <PeronalType
                index={i}
                BASE_FORM={BASE_FORM}
                handleForm={{ state: listForm, setState: setListForm }}
                presentState={{ state: present, setState: setPresent }}
                type={data?.type}
                originalOptions={createCompanyOrder?.approve?.origin_person || []}
              />
            </Col>
          )
        })}
      </Row>
    </Form.Item>
  )
}

const PeronalType = (props) => {
  const { index, handleForm, BASE_FORM, presentState, originalOptions } = props
  const { state: present, setState: setPresent } = presentState
  const [subFields, setSubFields] = useState(false)
  const location = useLocation()
  const formInstance = Form.useFormInstance()
  const handleSelectPersonType = (val, index) => {
    /**
     * @params {val} => index value need to get
     * @params {index} => index position of child list form
     */
    if (val !== -1) {
      formInstance.setFields([
        {
          name: [...BASE_FORM, 'legal_respon', index],
          value: {
            ...formInstance.getFieldValue([...BASE_FORM, 'origin_person', val]),
            title: '',
            select_person: val,
          },
        },
      ])
    } else {
      formInstance.setFields([
        {
          name: [...BASE_FORM, 'legal_respon', index, 'select_person'],
          value: val,
        },
      ])
    }
  }

  const options = originalOptions
    ?.map((item, i) => ({ name: item?.name || '...', value: i }))
    .concat({
      value: -1,
      name: 'Khác',
    })
  console.log('originOptions', options)
  return (
    <>
      <Form.Item
        name={[...BASE_FORM, 'legal_respon', index, 'select_person']}
        label={htmlContent('<b>Chọn người đại diện</b>')}
        rules={[{ required: true, message: 'Chọn người đại diện là bắt buộc' }]}
      >
        {options && (
          <Select
            options={options}
            fieldNames={{ label: 'name', value: 'value' }}
            onSelect={(e) => handleSelectPersonType(e, index)}
            placeholder="Bấm vào đây"
            autoComplete="off"
          />
        )}
      </Form.Item>
      <FormListPersonType
        {...props}
        listFormState={handleForm}
        presentState={presentState}
        BASE_FORM={BASE_FORM}
        i={index}
        type={props?.type}
      />
    </>
  )
}

export default NguoiDaiDienPhapLuat
