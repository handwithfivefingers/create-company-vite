import CCInput from '@/components/CCInput'
import GlobalService from '@/service/GlobalService'
import { Col, Form, Input, Row, Select } from 'antd'
import React, { forwardRef, memo, useEffect, useState } from 'react'
import { onSetFields } from '@/helper/Common'
import { ProvinceAction } from '@/store/actions'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select

const SelectProvince = forwardRef((props, ref) => {
  const { province: city } = useSelector((state) => state.provinceReducer)
  const dispatch = useDispatch()

  const [params, setParams] = useState({
    code: null,
    wards: null,
  })

  const [districts, setDistricts] = useState([])

  const [wards, setWards] = useState([])

  const name = props?.name

  useEffect(() => {
    !city.length && dispatch(ProvinceAction.getProvinceAction())
  }, [])

  useEffect(() => {
    getScreenData(params)
  }, [params])

  useEffect(() => {
    if (props.data) {
      let { pathName, value } = props?.data
      onSetFields([...pathName], value, ref)
    } else {
      let val = ref.current.getFieldValue([...name])
      onSetFields([...name], val, ref)
    }
  }, [])

  const handleSelectCity = (val, opt) => {
    let pathName = props.data?.pathName || name
    onSetFields([...pathName, 'city'], opt.name, ref)
    setParams({ code: val, ward: null })
    let listFields = [
      [...pathName, 'district'],
      [...pathName, 'town'],
    ]

    listFields.forEach((item) => onSetFields([...item], null, ref))
  }

  const handleSelectDistricts = (val, opt) => {
    let pathName = props.data?.pathName || name

    onSetFields([...pathName, 'district'], opt.name, ref)

    setParams((state) => ({ ...state, wards: val }))
  }

  const handleSelectWards = (val, opt) => {
    let pathName = props.data?.pathName || name

    onSetFields([...pathName, 'town'], opt.name, ref)
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

  return (
    <>
      <Form.Item
        name={[...name, 'city']}
        placeholder={props.placeholder}
        label="Tỉnh/Thành phố"
      >
        <Select
          showSearch
          onChange={(val, opt) => handleSelectCity(val, opt)}
          optionFilterProp="children"
          allowClear
          filterOption={(input, option) =>
            option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {city.map((item) => {
            return (
              <Option
                key={[item.code, item.codename]}
                name={item.name}
                value={item.code}
              >
                {item.name}
              </Option>
            )
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
        name={[...name, 'district']}
      >
        <Select
          placeholder={props.placeholder}
          onChange={(val, opt) => handleSelectDistricts(val, opt)}
          optionFilterProp="children"
          showSearch
          allowClear
          filterOption={(input, option) =>
            option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {districts.map((item) => {
            return (
              <Option
                key={[item.code, item.codename]}
                name={item.name}
                value={item.code}
              >
                {item.name}
              </Option>
            )
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Xã/Phường/Thị trấn" name={[...name, 'town']}>
        <Select
          placeholder={props.placeholder}
          onChange={(val, opt) => handleSelectWards(val, opt)}
          showSearch
          optionFilterProp="children"
          allowClear
          filterOption={(input, option) =>
            option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {wards.map((item) => {
            return (
              <Option
                key={[item.code, item.codename]}
                name={item.name}
                value={item.code}
              >
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
      />
    </>
  )
})

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
    <Form.Item name={[...props.name]} label={props.label}>
      <Row>
        <Col span={inpShow ? 8 : 24} style={{ padding: 0 }}>
          <Select
            placeholder={props.placeholder}
            onChange={(val, opt) => handleSelect(val, opt)}
          >
            {props.options.map((option, i) => (
              <Option
                value={option.value}
                key={[option.value, i, Math.random()]}
              >
                {option.name}
              </Option>
            ))}
            <Option value={1}>Khác</Option>
          </Select>
        </Col>
        <Col span={inpShow ? 16 : 0}>
          {inpShow && (
            <Input
              onChange={(e) =>
                ref.current.setFields([
                  { name: [...props.name], value: e.target.value },
                ])
              }
            />
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
    >
      <Row>
        <Col span={select === 2 ? 8 : 24} style={{ padding: 0 }}>
          <Select
            value={select}
            placeholder={props.placeholder}
            onChange={(val, opt) => handleSelect(val, opt)}
          >
            <Option value={1}>{DEFAULT_SELECT}</Option>
            <Option value={2}>Khác</Option>
          </Select>
        </Col>
        <Col span={select === 2 ? 16 : 0}>
          {select === 2 && (
            <Input value={input} onChange={(e) => handleInputChange(e)} />
          )}
        </Col>
      </Row>
    </Form.Item>
  )
})

const SelectDocProvide = forwardRef((props, ref) => {
  const [select, SetSelect] = useState(1)

  const [input, SetInput] = useState('')
  const DEFAULT_SELECT = 'Cục Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội'
  useEffect(() => {
    let pathName = props.data?.pathName || props.name
    let value = props.data?.value || ref.current.getFieldValue([...pathName])
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
    let pathName = props.data?.pathName || props.name

    SetSelect(val)
    if (val === 1) {
      ref.current.setFields([
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

    ref.current.setFields([{ name: [...pathName], value: e.target.value }])
  }
  return (
    <Form.Item name={[...props.name]} label={props.label}>
      <Row>
        <Col span={select === 2 ? 8 : 24} style={{ padding: 0 }}>
          <Select
            placeholder={props.placeholder}
            onChange={(val, opt) => handleSelect(val, opt)}
            value={select}
          >
            <Option value={1}>{DEFAULT_SELECT}</Option>
            <Option value={2}>Khác</Option>
          </Select>
        </Col>
        <Col span={select === 2 ? 16 : 0}>
          {select === 2 && (
            <Input onChange={(e) => handleInputchange(e)} value={input} />
          )}
        </Col>
      </Row>
    </Form.Item>
  )
})

const CCSelect = {
  SelectProvince,
  SelectPersonType,
  SelectDocProvide,
  SelectTitle,
}

export default CCSelect
