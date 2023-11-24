import CCInput from '@/components/CCInput'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, InputNumber, Row, Space } from 'antd'
import React, { forwardRef, memo, useEffect, Children, isValidElement, cloneElement } from 'react'
import { numToWord } from '../../helper/Common'
import styles from './styles.module.scss'
import { useState } from 'react'
import { useMemo } from 'react'

const CCListForm = forwardRef((props, ref) => {
  const { BASE_FORM, listForm, listName, btnText, formLength, defaultLength } = props

  const formInstance = Form.useFormInstance()

  let obj = [{}, {}, {}, {}, {}] // defaultObj

  useEffect(() => {
    let pathName = [...BASE_FORM, listName]

    let val = obj.slice(0, defaultLength || 1)

    setFields(pathName, val)
  }, [props])

  const handleChange = (e, formItem, fieldIndex) => {
    let val = e.target.value
    let pathName = [...BASE_FORM, listName, fieldIndex, ...formItem?.name]

    if (formItem?.options?.toUpperCase) {
      val = val.toUpperCase()
      setFields(pathName, val)
    }
    if (formItem.options.convertToNumber) {
      let fieldConvert = [...BASE_FORM, listName, fieldIndex, ...formItem?.options?.fieldsConvert]
      onInputChange(e, pathName, fieldConvert)
    }
  }

  const handleRenderLabel = (formItem, i) => {
    let index = formItem.options?.compare?.index
    if (index && index <= i + 1) {
      return formItem?.options?.customLabel + (i + 1)
    }
    return formItem?.label
  }

  let timer

  const onInputChange = (e, pathName, fieldConvet) => {
    let numInp = formInstance.getFieldValue(pathName)

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      let transform = numToWord(numInp)

      let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)

      setFields(fieldConvet, upperLetter)
    }, 1000)
  }

  const renderListform = (listForm, field, fieldIndex) => {
    let xhtml = null
    xhtml = listForm.map((formItem, formIndex) => {
      let { options } = formItem
      let column = options?.column
      let inputType = options?.format
      const formType = formItem.type
      const formName = [field.name, ...formItem?.name]
      const labelName = handleRenderLabel(formItem, fieldIndex)
      const layout = formItem?.options?.layout
      const placeholder = formItem?.placeholder
      switch (formType) {
        case 'date':
          return (
            <FormListItemDate
              column={column}
              name={formName}
              type={formType}
              label={labelName}
              layout={layout}
              placeholder={placeholder}
            />
          )
        case 'select':
          return (
            <ListformSelect
              label={labelName}
              name={formName}
              type={formType}
              onChange={formItem?.onChange ? (e) => handleChange(e, formItem, fieldIndex) : ''}
              options={formItem?.options}
              layout={layout}
              placeholder={placeholder}
            />
          )
        default:
          return (
            <Col span={column || 24}>
              {inputType ? (
                <Form.Item
                  label={labelName}
                  name={formName}
                  type={formType}
                  onChange={(e) => handleChange(e, formItem, fieldIndex)}
                  layout={layout}
                >
                  <InputNumber style={{ width: '100%' }} placeholder={placeholder} {...options} stringMode={true} />
                </Form.Item>
              ) : (
                <CCInput
                  label={labelName}
                  name={formName}
                  type={formType}
                  onChange={formItem?.onChange ? (e) => handleChange(e, formItem, fieldIndex) : ''}
                  layout={layout}
                  placeholder={placeholder}
                />
              )}
            </Col>
          )
      }
    })
    return xhtml
  }

  const setFields = (pathName, value) => {
    formInstance.setFields([
      {
        name: pathName,
        value,
      },
    ])
  }

  return (
    <Form.Item label={<h3>{props?.label}</h3>}>
      <Row gutter={[16, 12]}>
        {listForm && (
          <Form.List name={[...BASE_FORM, listName]} key={`form_lists_${[...BASE_FORM, listName].join('_')}`}>
            {(fields, { add, remove }) => (
              <React.Fragment key={`form_lists`}>
                {fields?.map((field, i) => (
                  <FormListBody
                    isValid={fields.length <= (defaultLength || 1)}
                    key={['form_item', field, i + 1]}
                    onClick={() => remove(field.name)}
                  >
                    {renderListform(listForm, field, i)}
                  </FormListBody>
                ))}
                <FormListFooter
                  isValid={fields.length >= formLength}
                  btnText={btnText}
                  add={add}
                  key={`form_item_footer`}
                />
              </React.Fragment>
            )}
          </Form.List>
        )}
      </Row>
    </Form.Item>
  )
})

const ListformSelect = ({ columnm, field, formIndex, formItem, handleRenderLabel, fieldIndex, handleChange }) => {
  return (
    <Col span={column || 24}>
      <CCInput
        key={[field.name, formIndex, formItem?.name]}
        label={handleRenderLabel(formItem, fieldIndex)}
        name={[field.name, ...formItem?.name]}
        type={formItem?.type}
        onChange={formItem?.onChange ? (e) => handleChange(e, formItem, fieldIndex) : ''}
        options={formItem?.options}
        layout={formItem?.options?.layout}
        placeholder={formItem?.placeholder}
      />
    </Col>
  )
}

const FormListBody = memo(({ isValid, onClick, children }) => {
  return (
    <Col lg={12} md={12} sm={24} xs={24}>
      <Row gutter={[16, 12]}>{children}</Row>
      <Space className={styles.flexStyles}>{isValid ? '' : <MinusCircleOutlined onClick={onClick} />}</Space>
    </Col>
  )
})

const FormListFooter = memo(({ isValid, btnText, add }) => {
  if (isValid) return ''
  return (
    <Form.Item label=" ">
      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
        {btnText}
      </Button>
    </Form.Item>
  )
})

const FormListItemDate = ({ column, name, label, layout, placeholder, type }) => {
  return (
    <Col span={column || 24}>
      <CCInput label={label} name={name} type={type} layout={layout} placeholder={placeholder} />
    </Col>
  )
}

const CCListFormV2 = ({ label, children, maxLength, formName, column, defaultLength = 1, addText }) => {
  const [length, setLength] = useState(defaultLength)

  const formInstance = Form.useFormInstance()

  useEffect(() => {
    window.form = formInstance // Debug only
    
  }, [])

  const groupName = (val, position) => {
    if (!!val) {
      if (Array.isArray(val)) {
        return [...formName, position, ...val]
      } else if (typeof val === 'string') {
        return [...formName, position, val]
      } else {
        console.error('Form Name must be a String or Array')
        return [...formName, position]
      }
    }
    return [...formName, position]
  }

  const add = () => {
    if (length >= maxLength) {
      return
    }
    let next = length + 1
    setLength(next)
  }

  const remove = (position) => {
    if (length >= 1) {
      const nextState = length - 1
      setLength(nextState)
      if (length > 1) {
        const currentData = formInstance.getFieldValue([...formName])
        currentData.splice(position, 1)
        formInstance.setFields([
          {
            name: [...formName],
            value: currentData,
          },
        ])
      }
    } else return
  }

  const ModifyChildren = useMemo(() => {
    const nestChildren = Array(length).fill(children)

    return nestChildren.map((childs, index) => {
      return (
        <Col span={column} key={`list_form_v2_field_${index}`}>
          {Children.map(childs, (child) => {
            if (isValidElement(child)) {
              const extendProps = {
                name: groupName(child.props?.name, index),
                position: index,
              }

              if (typeof child.props?.label === 'function') {
                extendProps['label'] = child.props?.label(index)
              }
              return cloneElement(child, extendProps)
            }
          })}

          {length > 1 && (
            <Button
              onClick={() => remove(index)}
              icon={<MinusCircleOutlined />}
              type="text"
              style={{ display: 'flex', margin: '0 auto' }}
            />
          )}
        </Col>
      )
    })
  }, [length])

  return (
    <Form.Item label={<h3>{label}</h3>}>
      <Row gutter={[16, 12]}>
        {ModifyChildren}

        {length < maxLength && (
          <Col span={12}>
            <Form.Item label=" ">
              <Button onClick={add} type="dashed" style={{ width: '100%' }} icon={<PlusOutlined />}>
                {addText}
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form.Item>
  )
}

CCListFormV2.displayName = 'CCListFormVersion2'
CCListForm.V2 = CCListFormV2

export default CCListForm
