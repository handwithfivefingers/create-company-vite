import CCInput from '@/components/CCInput'
import { htmlContent, onSetFields } from '@/helper/Common'
import { useFetch } from '@/helper/Hook'
import { Col, Form, Input, Radio, Row, Select, Space } from 'antd'
import { isEqual } from 'lodash-es'
import React, { forwardRef, useEffect, useState } from 'react'
import GlobalService from '@/service/GlobalService'
import styles from './styles.module.scss'

const { Option } = Select

const SelectProvince = (props) => {
  const { data: city } = useFetch({
    cacheName: ['careerData', 'province'],
    fn: () => GlobalService.getProvince(),
  })

  const [params, setParams] = useState({
    code: null,
    wards: null,
  })

  const [districts, setDistricts] = useState([])

  const [wards, setWards] = useState([])
  const formInstance = Form.useFormInstance()
  const name = props?.name

  useEffect(() => {
    getScreenData(params)
  }, [params])

  useEffect(() => {
    if (props.data) {
      let { pathName, value } = props?.data
      setFields([...pathName], value)
    } else {
      let val = formInstance.getFieldValue([...name])
      setFields([...name], val)
    }
  }, [])

  const handleSelectCity = (val, opt) => {
    let pathName = props.data?.pathName || name
    setFields([...pathName, 'city'], opt.name)
    setParams({ code: val, ward: null })
    let listFields = [
      [...pathName, 'district'],
      [...pathName, 'town'],
    ]

    listFields.forEach((item) => setFields([...item], null))
  }

  const handleSelectDistricts = (val, opt) => {
    let pathName = props.data?.pathName || name
    setFields([...pathName, 'district'], opt.name)
    setParams((state) => ({ ...state, wards: val }))
  }

  const handleSelectWards = (val, opt) => {
    let pathName = props.data?.pathName || name
    setFields([...pathName, 'town'], opt.name)
  }

  const getScreenData = async ({ code = null, wards = null } = {}) => {
    try {
      if (!code) return

      let res = await GlobalService.getProvince({ code, wards })

      let { data } = res.data

      if (res) {
        if (code) {
          if (wards) {
            return setWards(data)
          }
          return setDistricts(data)
        }
      }
    } catch (err) {
      console.log('getScreenData err: ' + err)
    }
  }

  const setFields = (namePath, value) => {
    formInstance.setFields([
      {
        name: [...namePath],
        value,
      },
    ])
  }

  if (!city) return 'loading'

  return (
    <>
      <Form.Item
        name={[...name, 'city']}
        placeholder={props.placeholder}
        label="Tỉnh/Thành phố"
        rules={[{ required: props?.required }]}
        required={props?.required}
      >
        <Select
          showSearch
          onChange={(val, opt) => handleSelectCity(val, opt)}
          optionFilterProp="children"
          allowClear
          filterOption={(input, option) => option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {city?.map((item) => {
            return (
              <Option key={[item.code, item.codename]} name={item.name} value={item.code}>
                {item.name}
              </Option>
            )
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
        name={[...name, 'district']}
        rules={[{ required: props?.required }]}
        required={props?.required}
      >
        <Select
          placeholder={props.placeholder}
          onChange={(val, opt) => handleSelectDistricts(val, opt)}
          optionFilterProp="children"
          showSearch
          allowClear
          filterOption={(input, option) => option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {districts.map((item) => {
            return (
              <Option key={[item.code, item.codename]} name={item.name} value={item.code}>
                {item.name}
              </Option>
            )
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Xã/Phường/Thị trấn"
        name={[...name, 'town']}
        rules={[{ required: props?.required }]}
        required={props?.required}
      >
        <Select
          placeholder={props.placeholder}
          onChange={(val, opt) => handleSelectWards(val, opt)}
          showSearch
          optionFilterProp="children"
          allowClear
          filterOption={(input, option) => option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {wards.map((item) => {
            return (
              <Option key={[item.code, item.codename]} name={item.name} value={item.code}>
                {item.name}
              </Option>
            )
          })}
        </Select>
      </Form.Item>

      <CCInput
        label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
        name={[...name, 'address']}
        placeholder="27 Nguyễn Hữu Thọ"
        rules={[{ required: props?.required }]}
        required={props?.required}
      />
    </>
  )
}

const SelectTitle = forwardRef((props, ref) => {
  const [inpShow, setInpShow] = useState(false)

  useEffect(() => {
    let pathName = props.name
    if (props.pathName) {
      pathName = props.pathName
    }
    let val = ref.current.getFieldValue([...pathName])
  }, [ref])
  const handleSelect = (val, opt) => {
    if (val === 1) {
      setInpShow(true)
    } else {
      ref.current.setFields([{ name: [...props.name], value: val }])
      setInpShow(false)
    }
  }

  return (
    <Form.Item
      name={[...props.name]}
      label={props.label}
      rules={[{ required: props?.required, message: props?.message }]}
      required={props?.required}
    >
      <Row>
        <Col span={inpShow ? 8 : 24} style={{ padding: 0 }}>
          <Select placeholder={props.placeholder} onChange={(val, opt) => handleSelect(val, opt)}>
            {(props.options &&
              props?.options?.map((option, i) => (
                <Option value={option.value} key={[option.value, i, Math.random()]}>
                  {option.name}
                </Option>
              ))) ||
              []}
            <Option value={1}>Khác</Option>
          </Select>
        </Col>
        <Col span={inpShow ? 16 : 0}>
          {inpShow && (
            <Input onChange={(e) => ref.current.setFields([{ name: [...props.name], value: e.target.value }])} />
          )}
        </Col>
      </Row>
    </Form.Item>
  )
})

const SelectPersonType = forwardRef((props, ref) => {
  const [select, SetSelect] = useState(1)
  const [input, SetInput] = useState('')
  const DEFAULT_SELECT = 'Kinh'

  useEffect(() => {
    let pathName = props.data?.pathName || props.name
    let value = props.data?.value || ref?.current?.getFieldValue([...pathName])
    if (value && value !== DEFAULT_SELECT) {
      SetSelect(2)
      SetInput(value)
      onSetFields(pathName, value, ref)
    } else {
      SetSelect(1)
      onSetFields(pathName, DEFAULT_SELECT, ref)
    }
  }, [props])

  const handleSelect = (val, opt) => {
    let pathName = props.name
    if (props.data) {
      pathName = props.data.pathName
    }
    if (val === 1) {
      ref.current.setFields([{ name: [...pathName], value: DEFAULT_SELECT }])
      SetSelect(1)
    } else SetSelect(2)
  }

  const handleInputChange = (e) => {
    let pathName = props.name
    if (props.data) {
      pathName = props.data.pathName
    }
    SetInput(e.target.value)
    ref.current.setFields([{ name: [...pathName], value: e.target.value }])
  }
  return (
    <Form.Item
      name={[...props.name]}
      label={props.label}
      dependencies={props.dependencies}
      rules={[{ required: props?.required }]}
      required={props?.required}
    >
      <Row>
        <Col span={select === 2 ? 8 : 24} style={{ padding: 0 }}>
          <Select value={select} placeholder={props.placeholder} onChange={(val, opt) => handleSelect(val, opt)}>
            <Option value={1}>{DEFAULT_SELECT}</Option>
            <Option value={2}>Khác</Option>
          </Select>
        </Col>
        <Col span={select === 2 ? 16 : 0}>
          {select === 2 && <Input value={input} onChange={(e) => handleInputChange(e)} />}
        </Col>
      </Row>
    </Form.Item>
  )
})

const SelectDocProvide = (props) => {
  const [select, SetSelect] = useState(1)
  const [input, SetInput] = useState('')
  const formInstace = Form.useFormInstance()
  const DEFAULT_SELECT = 'Cục Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội'

  useEffect(() => {
    let pathName = props.data?.pathName || props.name
    let value = props.data?.value || formInstace.getFieldValue([...pathName])
    if (value && value !== DEFAULT_SELECT) {
      SetSelect(2)
      SetInput(value)
      formInstace.setFields([
        {
          name: [...pathName],
          value,
        },
      ])
    } else {
      SetSelect(1)
      formInstace.setFields([
        {
          name: [...pathName],
          value: DEFAULT_SELECT,
        },
      ])
    }
  }, [props])

  const handleSelect = (val, opt) => {
    let pathName = props.data?.pathName || props.name

    SetSelect(val)
    if (val === 1) {
      formInstace.setFields([
        {
          name: [...pathName],
          value: DEFAULT_SELECT,
        },
      ])
    }
  }

  const handleInputchange = (e) => {
    let pathName = props.data?.pathName || props.name

    SetInput(e.target.value)

    formInstace.setFields([{ name: [...pathName], value: e.target.value }])
  }

  return (
    <Form.Item
      name={[...props.name]}
      label={props.label}
      rules={[{ required: props?.required }]}
      required={props?.required}
    >
      <Row>
        <Col span={select === 2 ? 8 : 24} style={{ padding: 0 }}>
          <Select placeholder={props.placeholder} onChange={(val, opt) => handleSelect(val, opt)} value={select}>
            <Option value={1}>{DEFAULT_SELECT}</Option>
            <Option value={2}>Khác</Option>
          </Select>
        </Col>
        <Col span={select === 2 ? 16 : 0}>
          {select === 2 && <Input onChange={(e) => handleInputchange(e)} value={input} />}
        </Col>
      </Row>
    </Form.Item>
  )
}

const RadioAddress = forwardRef((props, ref) => {
  const { prevField, nextField } = props

  const [radio, setRadio] = useState(null)

  useEffect(() => {
    let prevData = ref.current.getFieldValue(prevField)
    let nextData = ref.current.getFieldValue(nextField)
    if (isEqual(prevData, nextData) && nextData) {
      setRadio(1)
    } else if (!nextData) {
      setRadio(null)
    } else {
      setRadio(2)
    }
  }, [])

  const onRadioChange = (e) => {
    setRadio(e.target.value)

    if (e.target.value === 1) {
      let val = ref.current.getFieldValue(prevField)

      onSetFields(nextField, val, ref)
    }
  }
  return (
    <Form.Item
      label={htmlContent(props?.label || '<b>Địa chỉ liên lạc <i>(ĐDPL)</i><b>')}
      className={styles.newLine}
      shouldUpdate={() => {
        let canChange = radio === 1
        if (canChange) {
          let prevData = ref.current.getFieldValue(prevField)
          let nextData = ref.current.getFieldValue(nextField)

          if (!isEqual(prevData, nextData)) {
            onSetFields(nextField, prevData, ref)
          }
        }
        return !canChange
      }}
      rules={[{ required: props?.required }]}
      required={props?.required}
    >
      {() => {
        return (
          <>
            <Radio.Group onChange={onRadioChange} value={radio}>
              <Space direction="vertical">
                <Radio value={1}>Giống với địa chỉ thường trú</Radio>
                <Radio value={2}>Khác</Radio>
              </Space>
            </Radio.Group>
            {
              <div
                style={{
                  padding: '8px 0',
                  opacity: radio && radio === 2 ? '1' : '0',
                  visibility: radio && radio === 2 ? 'visible' : 'hidden',
                  display: radio && radio === 2 ? 'block' : 'none',
                }}
              >
                <CCSelect.SelectProvince name={nextField} />
              </div>
            }
          </>
        )
      }}
    </Form.Item>
  )
})

const CCSelect = {
  SelectProvince,
  SelectPersonType,
  SelectDocProvide,
  SelectTitle,
  RadioAddress,
}

export default CCSelect
