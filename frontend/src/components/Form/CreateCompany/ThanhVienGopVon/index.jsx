import { useStepData } from '@/context/StepProgressContext'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useState, memo } from 'react'
import { useCreateCompanyOrder, useOrder } from '../../../../store/reducer'
import OriginalPerson from './OriginalPerson'
import Personal from './Personal'
import styles from './styles.module.scss'

const ThanhVienGopVon = memo(({ data, ...props }) => {
  const { currentStep } = useStepData()
  const [listForm, setListForm] = useState([{}])
  const [_render, setRender] = useState(false)
  const formInstance = Form.useFormInstance()
  const { BASE_FORM } = props
  const categoryType = data?.type
  const personLength = listForm.length
  // const origin_person = useOrder(['createCompany', 'approve', 'origin_person'])
  const createCompanyData = useCreateCompanyOrder()

  const origin_person = createCompanyData?.approve?.origin_person
  console.log('origin_person', origin_person)
  useEffect(() => {
    getDefaultPerson()
  }, [])

  const getDefaultPerson = () => {
    if (personLength < 2 && categoryType == 2) {
      const nextFormState = [...listForm]
      nextFormState.push({})
      setListForm(nextFormState)
      return
    } else if (personLength < 3 && categoryType == 3) {
      const nextFormState = [...listForm]
      nextFormState.push({}, {})
      setListForm(nextFormState)
      return
    }
  }

  const renderPresentPerson = useCallback(
    (index) => {
      let xhtml = null
      let presentPerson = formInstance?.getFieldValue([...BASE_FORM, 'origin_person', index, 'present_person'])
      if (origin_person && origin_person[index]?.present_person) {
        presentPerson = origin_person[index].present_person
      }
      const path = [...BASE_FORM, 'origin_person', index]
      if (presentPerson === 'personal') {
        xhtml = <Personal {...props} BASE_FORM={path} type={categoryType} index={index} />
      } else if (presentPerson === 'organization') {
        xhtml = <OriginalPerson {...props} BASE_FORM={[...BASE_FORM, 'origin_person', index]} type={categoryType} />
      }
      return xhtml
    },
    [origin_person],
  )

  // /**
  //  * @functions List Form Functions
  //  */

  const addItem = () => {
    setListForm([...listForm, {}])
    return handleScrolltoField()
  }

  const handleScrolltoField = () => {
    let lastIndex = listForm.length - 1

    let pathName = [...BASE_FORM, 'origin_person', lastIndex, 'present_person']

    formInstance.scrollToField(pathName, {
      behavior: 'smooth',
    })
  }

  const removeItem = (index) => {
    try {
      let val = formInstance.getFieldValue([...BASE_FORM, 'origin_person'])
      val = [...val.slice(0, index), ...val.slice(index + 1)]
      let listVal = [...listForm.slice(0, index), ...listForm.slice(index + 1)]
      formInstance.setFields([{ name: [...BASE_FORM, 'origin_person'], value: val }])
      setListForm(listVal)
    } catch (err) {
      console.log('removeItem', err)
    }
  }

  const presentSelect = (val, opt) => {
    setRender(!_render)
  }

  const getMemberLabel = (i) => {
    if (data?.type === 3) {
      return `Cổ đông sáng lập ${data?.type !== 1 ? ` thứ ${i + 1}` : ''}`
    }
    return `Thành viên góp vốn ${data?.type !== 1 ? ` thứ ${i + 1}` : ''}`
  }

  const AddNewPerson = useMemo(() => {
    if (categoryType != 1 && personLength < 10)
      return (
        <Col span={24} style={{ position: 'sticky', top: '0', zIndex: 1 }}>
          <Button onClick={addItem} icon={<PlusOutlined />} type="primary">
            Thêm thành viên góp vốn
          </Button>
        </Col>
      )
  }, [categoryType, personLength])

  return (
    <Form.Item
      className={clsx([
        styles.hide,
        props.className,
        {
          [styles.visible]: currentStep === 2,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        {AddNewPerson}

        {listForm.map((item, i) => {
          return (
            <Col span={24} key={[...BASE_FORM, 'origin_person', i]}>
              <Form.Item
                label={
                  <div className={styles.label}>
                    <div className={styles.title}>{getMemberLabel(i)}</div>
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
                {/* <PresentPerson BASE_FORM={BASE_FORM} index={i} presentSelect={presentSelect} /> */}
                <Form.Item
                  name={[...BASE_FORM, 'origin_person', i, 'present_person']}
                  rules={{
                    required: true,
                    message: 'Thành viên góp vốn là bắt buộc',
                  }}
                  required
                >
                  <Select
                    placeholder="Bấm vào đây"
                    onChange={presentSelect}
                    options={[
                      {
                        label: 'Thành viên góp vốn là cá nhân',
                        value: 'personal',
                      },
                      {
                        label: 'Thành viên góp vốn là tổ chức',
                        value: 'organization',
                      },
                    ]}
                  />
                </Form.Item>
                {renderPresentPerson(i)}
              </Form.Item>
            </Col>
          )
        })}
      </Row>
    </Form.Item>
  )
})
export default ThanhVienGopVon
