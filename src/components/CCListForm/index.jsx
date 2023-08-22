import CCInput from '@/components/CCInput'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, InputNumber, Row, Space } from 'antd'
import React, { forwardRef, useEffect, memo } from 'react'
import { numToWord, onSetFields } from '../../helper/Common'
import styles from './styles.module.scss'

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

      // onSetFields(fieldConvet, upperLetter, ref)
      setFields(fieldConvet, upperLetter)
    }, 1000)
  }

  const renderListform = (listForm, field, fieldIndex) => {
    let xhtml = null
    console.log('listForm', listForm)
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
    <Form.Item label={<h4>{props?.label}</h4>}>
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
                <FormListFooter isValid={fields.length >= formLength} btnText={btnText} add={add} key={`form_item_footer`}/>
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

export default CCListForm
