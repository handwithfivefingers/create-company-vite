import { useStepData } from '@/context/StepProgressContext'
import { htmlContent } from '@/helper/Common'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useFormAPI, useFormData } from '../../../../context/FormProviderContext'
import styles from '../CreateCompany.module.scss'
import FormListPersonType from './FormListPersonal'

const FORM_NAME = 'legal_respon'
const FORM_PROVIDER = 'create_company_approve'

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
  const { currentStep } = useStepData()

  const [listForm, setListForm] = useState([])

  const [present, setPresent] = useState([null, null, null])

  const [_render, setRender] = useState(false)

  const [formCount, setFormCount] = useState(1)

  const { createForm } = useFormAPI()

  const [form] = Form.useForm()

  useEffect(() => {
    createForm({
      formName: FORM_NAME,
      form,
      formProvider: FORM_PROVIDER,
    })
  }, [])

  const addItem = () => {
    setFormCount((prev) => (prev += 1))
    console.log('add new')
    return scrollIntoField()
  }
  const removeItem = () => {
    setFormCount((prev) => (prev > 1 ? (prev -= 1) : 1))
    return scrollIntoField()
  }

  const scrollIntoField = () => {
    form.scrollToField([formCount - 1, 'name'], { behavior: 'smooth' })
  }

  const onFinish = (value) => {
    console.log('value', value)
  }
  const handleFinishFailed = ({ values, errorFields, outOfDate }) => {
    console.log('finish error', values)
    console.log('finish errorFields', errorFields)
    console.log('finish outOfDate', outOfDate)
  }
  console.log('formCount', formCount)
  return (
    <Form name="legal_respon" form={form} onFinish={onFinish} layout="vertical" onFinishFailed={handleFinishFailed}>
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
          {/* <Col span={24}>
            {formCount < 3 && (
              <Button onClick={addItem} icon={<PlusOutlined />} type="primary">
                Thêm người đại diện
              </Button>
            )}
          </Col> */}

          {/* <Col lg={8} md={12} sm={24}> */}
          {/* <PeronalType
              BASE_FORM={BASE_FORM}
              presentState={{ state: present, setState: setPresent }}
              removeItem={removeItem}
              type={data?.type}
            /> */}
          {/* </Col> */}
          {/* {Array(formCount)
            .fill(listField)
            .map((item, i) => {
              return (
                <Col lg={8} md={12} sm={24} key={[item, i]}>
                  <PeronalType
                    index={i}
                    BASE_FORM={BASE_FORM}
                    // handleForm={{ state: listForm, setState: setListForm }}
                    presentState={{ state: present, setState: setPresent }}
                    removeItem={removeItem}
                    type={data?.type}
                  />
                </Col>
              )
            })} */}
          <ListPersonal />
        </Row>
      </Form.Item>

      <Button htmlType="submit">Next</Button>
    </Form>
  )
}

const PeronalType = (props) => {
  const { index, handleForm, presentState, removeItem } = props
  const { state: present, setState: setPresent } = presentState
  const formInstance = Form.useFormInstance()
  const { create_company_approve } = useFormData()
  const { origin_person } = create_company_approve

  useEffect(() => {
    let value = formInstance.getFieldValue(['legal_respon', index, 'name'])
    let options = getPersonType()
    let valIndex = options.findIndex((item) => item.name === value)
    if (valIndex !== -1) {
      onSetFields([index, 'select_person'], options[valIndex].value)
    }
  }, [])

  const getPersonType = () => {
    let listOriginPersonal = origin_person?.getFieldsValue()
    let options = [{ value: -1, name: 'Khác' }]
    for (let personalKey in listOriginPersonal) {
      const originPersonal = listOriginPersonal[personalKey]
      if (originPersonal.name) {
        options = [{ name: originPersonal.name || '...', value: personalKey }].concat(options)
      } else {
        options = [{ value: null, name: 'None' }].concat(options)
      }
    }
    return options
  }

  const handleSelectPersonType = (val, index) => {
    let data = [...present]

    data[index] = `${val}`

    setPresent(data)

    const currentOriginPersonalIndex = origin_person?.getFieldValue(val) || null

    formInstance.setFieldsValue({
      [index]: {
        ...currentOriginPersonalIndex,
        select_person: val,
      },
    })
  }

  const onSetFields = (pathName, value) => {
    formInstance.setFields([
      {
        name: pathName,
        value,
      },
    ])
  }

  return (
    <>
      <Form.List>
        <Form.Item
          name={[index, 'select_person']}
          label={htmlContent('<b>Chọn người đại diện</b>')}
          rules={[{ required: true, message: 'Chọn người đại diện là bắt buộc' }]}
        >
          {getPersonType() && (
            <Select onSelect={(e) => handleSelectPersonType(e, index)} placeholder="Bấm vào đây" autoComplete="off">
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
          removeItem={removeItem}
          presentState={presentState}
          i={index}
          type={props?.type}
        />
      </Form.List>
    </>
  )
}

const ListPersonal = () => {
  // const { index, handleForm, presentState, removeItem } = props
  // const { state: present, setState: setPresent } = presentState
  // const formInstance = Form.useFormInstance()
  // const { create_company_approve } = useFormData()
  // const { origin_person } = create_company_approve

  // useEffect(() => {
  //   let value = formInstance.getFieldValue(['legal_respon', index, 'name'])
  //   let options = getPersonType()
  //   let valIndex = options.findIndex((item) => item.name === value)
  //   if (valIndex !== -1) {
  //     onSetFields([index, 'select_person'], options[valIndex].value)
  //   }
  // }, [])

  // const getPersonType = () => {
  //   let listOriginPersonal = origin_person?.getFieldsValue()
  //   let options = [{ value: -1, name: 'Khác' }]
  //   for (let personalKey in listOriginPersonal) {
  //     const originPersonal = listOriginPersonal[personalKey]
  //     if (originPersonal.name) {
  //       options = [{ name: originPersonal.name || '...', value: personalKey }].concat(options)
  //     } else {
  //       options = [{ value: null, name: 'None' }].concat(options)
  //     }
  //   }
  //   return options
  // }

  // const handleSelectPersonType = (val, index) => {
  //   let data = [...present]

  //   data[index] = `${val}`

  //   setPresent(data)

  //   const currentOriginPersonalIndex = origin_person?.getFieldValue(val) || null

  //   formInstance.setFieldsValue({
  //     [index]: {
  //       ...currentOriginPersonalIndex,
  //       select_person: val,
  //     },
  //   })
  // }

  // const onSetFields = (pathName, value) => {
  //   formInstance.setFields([
  //     {
  //       name: pathName,
  //       value,
  //     },
  //   ])
  // }
  const getPersonType = () => {
    return []
  }
  return (
    <Form.List name="user">
      {(fields, { add, remove }) => {
        return (
          <Row gutter={[16, 12]}>
            {fields.map(({ key, name, ...restField }) => {
              return (
                <Col lg={8} md={12} sm={24}>
                  <Form.Item
                    {...restField}
                    name={[name, 'select_person']}
                    label={htmlContent('<b>Chọn người đại diện</b>')}
                    // rules={[{ required: true, message: 'Chọn người đại diện là bắt buộc' }]}
                  >
                    {getPersonType() && (
                      <Select placeholder="Bấm vào đây" autoComplete="off">
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
                </Col>
              )
            })}
            <Button onClick={() => add()} icon={<PlusOutlined />} type="primary">
              Thêm người đại diện
            </Button>
          </Row>
        )
      }}
    </Form.List>
  )
}

export default NguoiDaiDienPhapLuat
