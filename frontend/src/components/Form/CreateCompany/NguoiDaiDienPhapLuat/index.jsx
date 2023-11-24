import { htmlContent, onSetFields } from '@/helper/Common'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import { forwardRef, useEffect, useState } from 'react'
import styles from '../CreateCompany.module.scss'
import FormListPersonType from './FormListPersonal'
import { useStepData } from '@/context/StepProgressContext'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
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
const NguoiDaiDienPhapLuat = forwardRef(({ data, ...props }, ref) => {
  const { BASE_FORM } = props
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  const [listForm, setListForm] = useState([{ ...listField }])

  const [present, setPresent] = useState([null, null, null])

  const [_render, setRender] = useState(false)

  const location = useLocation()

  useEffect(() => {
    window.form = formInstance
  }, [])

  useEffect(() => {
    if (location.state) {
      setTimeout(() => {
        const { data } = location.state
        const current = data.create_company?.approve?.legal_respon
        setListForm(current)
        if (current.length) {
          current.map((legal, i) => {
            console.log('runing setFields')
            formInstance.setFields([
              {
                name: [...BASE_FORM, 'legal_respon', i],
                value: {
                  ...legal,
                  doc_time_provide: legal?.doc_time_provide ? moment(legal?.doc_time_provide, 'YYYY-MM-DD') : null,
                  birth_day: legal?.birth_day ? moment(legal?.birth_day, 'YYYY-MM-DD') : null,
                  doc_outdate: legal?.doc_outdate ? moment(legal?.doc_outdate, 'YYYY-MM-DD') : null,
                },
              },
            ])
          })
        }
      }, currentStep * 1000)
    }
  }, [location])

  // console.log('legalLengthWatch', legalLengthWatch)

  const addItem = () => {
    setListForm([...listForm, listField])
    return scrollIntoField()
  }

  const scrollIntoField = () => {
    let len = listForm.length
    let pathName = [...BASE_FORM, 'legal_respon', len - 1, 'name']
    ref.current?.scrollToField(pathName, { behavior: 'smooth' })
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

let personalMounted = false
const PeronalType = forwardRef((props, ref) => {
  const { index, handleForm, BASE_FORM, presentState } = props

  const { state: present, setState: setPresent } = presentState
  const location = useLocation()
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
    if (location.state) {
      setTimeout(() => {
        loadData()
      }, 2000)
    } else {
      if (!personalMounted) {
        loadData()
        personalMounted = true
      }
    }
  }, [location])

  const loadData = () => {
    let value = ref.current?.getFieldValue([...BASE_FORM, 'legal_respon', index, 'name'])
    let options = getPersonType()
    let valIndex = options.findIndex((item) => item.name === value)
    if (valIndex !== -1) {
      onSetFields([...BASE_FORM, 'legal_respon', index, 'select_person'], options[valIndex].value, ref)
    }
  }
  return (
    <>
      <Form.Item
        name={[...BASE_FORM, 'legal_respon', index, 'select_person']}
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

export default NguoiDaiDienPhapLuat
