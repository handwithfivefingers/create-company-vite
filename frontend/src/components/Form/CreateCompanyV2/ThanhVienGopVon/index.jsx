import { useStepData } from '@/context/StepProgressContext'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormAPI, useFormData } from '../../../../context/FormProviderContext'
import OriginalPerson from './OriginalPerson'
import Personal from './Personal'
import styles from './styles.module.scss'
import moment from 'moment'
const FORM_NAME = 'origin_person'
const FORM_PROVIDER = 'create_company_approve'
const ThanhVienGopVon = ({ data, ...props }) => {
  const { currentStep } = useStepData()
  const [listForm, setListForm] = useState([{}])
  const [_render, setRender] = useState(false)
  const [state, setState] = useState({})
  const [docTypeWatch, setDocTypeWatch] = useState('')
  const location = useLocation()
  const [form] = Form.useForm()
  const { createForm } = useFormAPI()
  const { formValue } = useFormData()

  // run 1
  useEffect(() => {
    const payload = {
      formProvider: FORM_PROVIDER,
      formName: FORM_NAME,
      form: form,
    }
    createForm(payload)

    let value = [...listForm] // default is 1
    if (data?.type == 2 && value.length < 2) {
      value.push({}) // -> 2
      setListForm(value)
    } else if (data?.type === 3 && value.length < 3) {
      value.push({}, {}) // -> 3
      setListForm(value)
    }
  }, [])

  // Edit

  useEffect(() => {
    if (formValue?.create_company) {
      const { origin_person } = formValue.create_company?.approve
      if (origin_person.length) {
        // const nextState = origin_person
        const nextState = {}
        let index = 0
        for (let person of origin_person) {
          const personObject = {
            ...person,
            birth_day: moment(person.birth_day, 'YYYY-MM-DD'),
            doc_time_provide: moment(person.doc_time_provide, 'YYYY-MM-DD'),
          }
          if (personObject.organization?.doc_time_provide) {
            personObject.organization.doc_time_provide = moment(
              personObject.organization.doc_time_provide,
              'YYYY-MM-DD',
            )
          }

          nextState[index] = personObject

          index++
        }
        form.setFieldsValue(nextState)
        setListForm([...Array(origin_person.length).keys()].map((item) => ({})))
        // console.log('nextState', nextState)
      }
    }
  }, [formValue])

  // run 2

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

  // run 3
  useEffect(() => {
    if (location.state) {
      let originPerson = form.getFieldValue(['origin_person'])
      if (originPerson?.length) {
        setListForm(originPerson.map((_) => ({})))
      }
      setRender(!_render)
    }
  }, [props.current, location])

  const renderPresentPerson = (index) => {
    let xhtml = null
    let presentPerson = form?.getFieldValue([index, 'present_person'])
    // const path = [...BASE_FORM, 'origin_person', index]
    if (presentPerson === 'personal') {
      xhtml = <Personal {...props} index={index} type={data?.type} />
    } else if (presentPerson === 'organization') {
      xhtml = <OriginalPerson {...props} index={index} type={data?.type} />
    }
    return xhtml
  }

  // /**
  //  * @functions List Form Functions
  //  */

  const handleScrolltoField = () => {
    let lastIndex = listForm.length - 1

    let pathName = ['origin_person', lastIndex, 'present_person']

    form.scrollToField(pathName, {
      behavior: 'smooth',
    })
  }

  const onFinish = (value) => {
    console.log('origin_person onFinish', value)
  }

  const handlePresentPersonChange = ({ name, value }) => {
    console.log('handlePresentPersonChange', name, value)
    setState({ ...state, [name]: value })
  }

  // const doctypeWatch = Form.useWatch([name, 'doc_type'], formInstance)

  const handleFieldChange = ({ value, name, upper = false }) => {
    let nextValue = upper ? value.toUpperCase() : value
    form.setFields([
      {
        name: [FORM_NAME, ...name],
        value: nextValue,
      },
    ])
  }
  const handleIdentifyChange = (value, options) => {
    setDocTypeWatch(value)
  }
  console.log('state', form.getFieldsValue())

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" name="origin_person">
      <Form.Item
        className={clsx([
          styles.hide,
          props.className,
          {
            [styles.visible]: currentStep === 2,
          },
        ])}
      >
        <Form.List name="origin_person">
          {(fields, { add, remove }) => (
            <FormList
              fields={fields}
              add={add}
              remove={remove}
              type={data?.type}
              handlePresentPersonChange={handlePresentPersonChange}
              handleFieldChange={handleFieldChange}
              listPresentPerson={state}
              handleIdentifyChange={handleIdentifyChange}
              docTypeWatch={docTypeWatch}
            />
          )}
        </Form.List>

        {/* {listForm.length < 10 && data?.type !== 1 && (
            <Col span={24} style={{ position: 'sticky', top: '0', zIndex: 1 }}>
              <Button onClick={addItem} icon={<PlusOutlined />} type="primary">
                Thêm thành viên góp vốn
              </Button>
            </Col>
          )} */}

        {/* {listForm.map((item, i) => {
            return (
              <Col span={24} key={['origin_person', i]}>
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
                  <PresentPerson index={i} presentSelect={presentSelect} />

                  {renderPresentPerson(i)}
                </Form.Item>
              </Col>
            )
          })} */}

        <Col span={24}>
          <Button
            type="primary"
            htmlType="submit"
            // onClick={() => form.submit()}
          >
            Next
          </Button>
          <Button onClick={() => form.submit()}>Submit</Button>
        </Col>
      </Form.Item>
    </Form>
  )
}

const FormList = ({
  fields,
  add,
  remove,
  type,
  listPresentPerson,
  handlePresentPersonChange,
  handleFieldChange,
  handleIdentifyChange,
  docTypeWatch,
}) => {
  const getLabel = ({ name }) => {
    return (
      <div className={styles.label}>
        <div className={styles.title}>Thành viên góp vốn {type !== 1 && ` thứ ${name + 1}`}</div>
        <Button
          type="text"
          shape="circle"
          danger
          icon={<MinusCircleOutlined onClick={() => remove(name)} />}
          style={{
            display: (type == 2 && name + 1 > 2) || (type == 3 && name + 1 > 3) ? 'block' : 'none',
          }}
        />
      </div>
    )
  }

  return (
    <Row gutter={[16, 12]}>
      {fields.map(({ key, name, ...restField }) => {
        return (
          <Col span={24} key={['origin_person', key]}>
            <Form.Item label={getLabel({ name })}>
              <Form.Item
                {...restField}
                name={[name, 'present_person']}
                // rules={{
                //   required: true,
                //   message: 'Thành viên góp vốn là bắt buộc',
                // }}
                // required
              >
                <Select
                  placeholder="Bấm vào đây"
                  onSelect={(value) => handlePresentPersonChange({ value, name: `${name}_present_person` })}
                >
                  <Select.Option value="personal">Thành viên góp vốn là cá nhân</Select.Option>
                  <Select.Option value="organization">Thành viên góp vốn là tổ chức</Select.Option>
                </Select>
              </Form.Item>

              {listPresentPerson[`${name}_present_person`] === 'personal' && (
                <Personal
                  name={name}
                  type={type}
                  handleFieldChange={handleFieldChange}
                  handleIdentifyChange={handleIdentifyChange}
                  docTypeWatch={docTypeWatch}
                  key={name}
                />
              )}

              {listPresentPerson[`${name}_present_person`] === 'organization' && (
                <OriginalPerson
                  name={name}
                  type={type}
                  handleFieldChange={handleFieldChange}
                  handleIdentifyChange={handleIdentifyChange}
                  docTypeWatch={docTypeWatch}
                  key={name}
                />
              )}

              {/* <PresentPerson index={i} presentSelect={presentSelect} /> */}
              {/* {renderPresentPerson(i)} */}
              {/* {<Personal {...props} index={index} type={data?.type} />} */}
              {/* {console.log(getWatch({ name: [name, 'present_person'] }))} */}
            </Form.Item>
          </Col>
        )
      })}

      <Button onClick={() => add()} icon={<PlusOutlined />} type="primary">
        Thêm thành viên góp vốn
      </Button>
    </Row>
  )
}

export default ThanhVienGopVon
