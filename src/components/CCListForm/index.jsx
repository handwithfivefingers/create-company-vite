import React, { forwardRef, useEffect, useState, useRef } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, InputNumber, Row, Space, Spin } from 'antd'
import CCInput from '@/components/CCInput'
import { onSetFields } from '../../helper/Common'

const CCListForm = forwardRef((props, ref) => {
  const { BASE_FORM, listForm, listName, btnText, formLength, defaultLength } = props

  let obj = [{}, {}, {}, {}, {}] // defaultObj

  useEffect(() => {
    let pathName = [...BASE_FORM, listName]

    let val = obj.slice(0, defaultLength || 1)

    onSetFields(pathName, val, ref)
  }, [props])

  const handleChange = (e, formItem, fieldIndex) => {
    let val = e.target.value
    let pathName = [...BASE_FORM, listName, fieldIndex, formItem?.name]
    if (formItem?.options?.toUpperCase) {
      val = val.toUpperCase()
    }

    onSetFields(pathName, val, ref)
  }

  const handleRenderLabel = (formItem, i) => {
    let index = formItem.options?.compare?.index
    if (index && index <= i + 1) {
      return formItem?.options?.customLabel + (i + 1)
    }
    return formItem?.label
  }

  const renderListform = (listForm, field, fieldIndex) => {
    let xhtml = null

    xhtml = listForm.map((formItem, formIndex) => {
      let { options } = formItem
      let column = options?.column
      let inputType = options?.format
      switch (formItem?.type) {
        case 'date':
          return (
            <Col span={column || 24}>
              <CCInput
                key={[field.name, formIndex, formItem?.name]}
                label={handleRenderLabel(formItem, fieldIndex)}
                name={[field.name, formItem?.name]}
                type={formItem?.type}
                layout={formItem?.options?.layout}
                placeholder={formItem?.placeholder}
              />
            </Col>
          )
        case 'select':
          return (
            <Col span={column || 24}>
              <CCInput
                key={[field.name, formIndex, formItem?.name]}
                label={handleRenderLabel(formItem, fieldIndex)}
                name={[field.name, formItem?.name]}
                type={formItem?.type}
                onChange={formItem?.onChange ? (e) => handleChange(e, formItem, fieldIndex) : ''}
                options={formItem?.options}
                layout={formItem?.options?.layout}
                placeholder={formItem?.placeholder}
              />
            </Col>
          )
        default:
          return (
            <Col span={column || 24}>
              {inputType ? (
                <Form.Item
                  label={handleRenderLabel(formItem, fieldIndex)}
                  key={[field.name, formIndex, formItem?.name]}
                  name={[field.name, formItem?.name]}
                  type={formItem?.type}
                  onChange={(e) => handleChange(e, formItem, fieldIndex)}
                  layout={formItem?.options?.layout}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={formItem?.placeholder}
                    max={options?.max}
                    min={options?.min}
                    formatter={options?.formatter}
                    parser={options?.parser}
                    length={options?.length}
                  />
                </Form.Item>
              ) : (
                <CCInput
                  key={[field.name, formIndex, formItem?.name]}
                  label={handleRenderLabel(formItem, fieldIndex)}
                  name={[field.name, formItem?.name]}
                  type={formItem?.type}
                  onChange={formItem?.onChange ? (e) => handleChange(e, formItem, fieldIndex) : ''}
                  layout={formItem?.options?.layout}
                  placeholder={formItem?.placeholder}
                />
              )}
            </Col>
          )
      }
    })
    return xhtml
  }

  // const onSetFields = (pathName, val) => {
  //   ref.current.setFields([
  //     {
  //       name: pathName,
  //       value: val,
  //     },
  //   ])
  // }

  return (
    <Form.Item label={<h4>{props?.label}</h4>}>
      <Row gutter={[16, 12]}>
        {listForm && (
          <Form.List name={[...BASE_FORM, listName]}>
            {(fields, { add, remove }) => (
              <>
                {fields?.map((field, i) => (
                  <>
                    <Col lg={12} md={12} sm={24} xs={24} key={[field, i + 1]}>
                      <Row gutter={[16, 12]}>{renderListform(listForm, field, i)}</Row>

                      <Space style={{ display: 'flex', justifyContent: 'center' }}>
                        {fields.length <= (defaultLength || 1) ? '' : <MinusCircleOutlined onClick={() => remove(field.name)} />}
                      </Space>
                    </Col>
                  </>
                ))}

                {fields.length >= formLength ? (
                  ''
                ) : (
                  <Form.Item label=" ">
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {btnText}
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>
        )}
      </Row>
    </Form.Item>
  )
})

export default CCListForm
