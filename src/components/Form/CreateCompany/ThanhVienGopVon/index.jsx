import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { htmlContent, onSetFields } from '@/helper/Common'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, InputNumber, Row, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CCSelect from '../../../CCSelect'
import OriginalPerson from './OriginalPerson'
import Personal from './Personal'
import styles from './styles.module.scss'

const ThanhVienGopVon = forwardRef(({ data, ...props }, ref) => {
  const { current, BASE_FORM } = props

  const [listForm, setListForm] = useState([{}])

  const [_render, setRender] = useState(false)

  const location = useLocation()

  // run 1
  useEffect(() => {
    let value = [...listForm] // default is 1
    if (data?.type == 2 && value.length < 2) {
      value.push({}) // -> 2
      setListForm(value)
    } else if (data?.type === 3 && value.length < 3) {
      value.push({}, {}) // -> 3
      setListForm(value)
    }
  }, [])
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
      let originPerson = ref.current.getFieldValue([...BASE_FORM, 'origin_person'])
      if (originPerson?.length) {
        setListForm(originPerson.map((_) => ({})))
      }
      setRender(!_render)
    }
  }, [props.current, location])

  const renderPresentPerson = (index) => {
    let xhtml = null
    let presentPerson = ref.current?.getFieldValue([...BASE_FORM, 'origin_person', index, 'present_person'])
    const path = [...BASE_FORM, 'origin_person', index]
    if (presentPerson === 'personal') {
      xhtml = <Personal {...props} ref={ref} BASE_FORM={path} type={data?.type} />
    } else if (presentPerson === 'organization') {
      xhtml = (
        <OriginalPerson {...props} ref={ref} BASE_FORM={[...BASE_FORM, 'origin_person', index]} type={data?.type} />
      )
    }
    return xhtml
  }

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

const PresentPerson = forwardRef((props, ref) => {
  const { BASE_FORM, index } = props

  return (
    <Form.Item
      name={[...BASE_FORM, 'origin_person', index, 'present_person']}
      rules={{
        required: true,
        message: 'Thành viên góp vốn là bắt buộc',
      }}
      required
    >
      <Select placeholder="Bấm vào đây" onChange={props.presentSelect}>
        <Select.Option value="personal">Thành viên góp vốn là cá nhân</Select.Option>
        <Select.Option value="organization">Thành viên góp vốn là tổ chức</Select.Option>
      </Select>
    </Form.Item>
  )

})

export default ThanhVienGopVon
