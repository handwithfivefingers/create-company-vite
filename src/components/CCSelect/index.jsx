import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { Form, Select, Input, Row, Col, Cascader } from 'antd'
import CCInput from '@/components/CCInput'
import GlobalService from '@/service/GlobalService'
import _ from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { ProvinceAction } from '@/store/actions'

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
  useEffect(() => {
    !city.length && dispatch(ProvinceAction.getProvinceAction())
  }, [])

  useEffect(() => {
    getScreenData(params)
  }, [params])

  const handleSelectCity = (val, opt) => {
    onSetFields([...props.name, 'city'], opt.name)

    setParams({ code: val, ward: null })

    let listFields = [
      [...props.name, 'district'],
      [...props.name, 'town'],
    ]
    listFields.forEach((item) => onSetFields([...item], null))

    console.log(ref.current.getFieldsValue())
  }

  const handleSelectDistricts = (val, opt) => {
    onSetFields([...props.name, 'district'], opt.name)
    setParams((state) => ({ ...state, wards: val }))
  }

  const onSetFields = (pathName, val) => {
    ref.current.setFields([
      {
        name: [...pathName],
        value: val,
      },
    ])
  }

  const getScreenData = async ({ code = null, wards = null } = {}) => {
    try {
      if (!code) return

      let res = await GlobalService.getProvince({ code, wards })
      console.log(res)
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
    } finally {
    }
  }
  let name = props?.nameSet ? props?.nameSet : props?.name
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
          onChange={(val, opt) => onSetFields([...name, 'town'], opt.name)}
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
        //placeholder={props.placeholder}
        placeholder="20 Nguyễn Hữu Thọ"
      />
    </>
  )
})

const SelectTitle = forwardRef((props, ref) => {
  const [inpShow, setInpShow] = useState(false)

  useEffect(() => {}, [ref])
  const handleSelect = (val, opt) => {
    console.log([...props.name])
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
            {/* <Option value={'Tổng Giám Đốc'}>Tổng Giám Đốc</Option>
            <Option value={'Giám Đốc'}>Giám Đốc</Option> */}
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

const SelectInput = forwardRef((props, ref) => {
  useEffect(() => {}, [ref])

  return <div>SelectInput</div>
})

const SelectPersonType = forwardRef((props, ref) => {
  const [inpShow, setInpShow] = useState(false)

  useEffect(() => {}, [ref])

  const handleSelect = (val, opt) => {
    if (val === 1) {
      ref.current.setFields([{ name: [...props.name], value: 'Kinh' }])
      setInpShow(false)
    } else setInpShow(true)
  }

  return (
    <Form.Item name={[...props.name]} label={props.label}>
      <Row>
        <Col span={inpShow ? 8 : 24} style={{ padding: 0 }}>
          <Select
            placeholder={props.placeholder}
            onChange={(val, opt) => handleSelect(val, opt)}
          >
            <Option value={1}>Kinh</Option>
            <Option value={2}>Khác</Option>
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

const SelectDocProvide = forwardRef((props, ref) => {
  const [select, SetSelect] = useState(1)
  useEffect(() => {
    let val = ref.current.getFieldValue([...props.name])
    console.log(val, props.name)
    if (val !== 'Cục Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội') {
      SetSelect(2)
    }
  }, [props])
  const handleSelect = (val, opt) => {
    SetSelect(val)
    if (val === 1) {
      ref.current.setFields([
        {
          name: [...props.name],
          value: 'Cục Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội',
        },
      ])
    }
  }
  console.log('select', select)
  return (
    <Form.Item name={[...props.name]} label={props.label}>
      <Row>
        <Col span={select === 2 ? 8 : 24} style={{ padding: 0 }}>
          <Select
            placeholder={props.placeholder}
            onChange={(val, opt) => handleSelect(val, opt)}
            value={select}
          >
            <Option value={1}>
              Cục Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội
            </Option>
            <Option value={2}>Khác</Option>
          </Select>
        </Col>
        <Col span={select === 2 ? 16 : 0}>
          {select === 2 && (
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

const SelectCascader = forwardRef((props, ref) => {
  const { province: city } = useSelector((state) => state.provinceReducer)

  // const [city, setCity] = useState([]);
  const [params, setParams] = useState({
    code: null,
    wards: null,
  })

  const [districts, setDistricts] = useState([])

  const [wards, setWards] = useState([])

  useEffect(() => {
    getScreenData(params)
  }, [params])

  const handleSelectCity = (val, opt) => {
    onSetFields([...props.name, 'city'], opt.name)

    setParams({ code: val, ward: null })

    let listFields = [
      [...props.name, 'district'],
      [...props.name, 'town'],
    ]
    listFields.forEach((item) => onSetFields([...item], null))

    console.log(ref.current.getFieldsValue())
  }

  const handleSelectDistricts = (val, opt) => {
    onSetFields([...props.name, 'district'], opt.name)
    setParams((state) => ({ ...state, wards: val }))
  }

  const onSetFields = (pathName, val) => {
    ref.current.setFields([
      {
        name: [...pathName],
        value: val,
      },
    ])
  }

  const getScreenData = async ({ code = null, wards = null } = {}) => {
    try {
      if (!code) return

      let res = await GlobalService.getProvince({ code, wards })
      console.log(res)
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
    } finally {
    }
  }

  return (
    <>
      <Form.Item name={[...props.name, 'city']} placeholder={props.placeholder}>
        <Select
          showSearch
          label="Tỉnh/Thành phố"
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
        name={[...props.name, 'district']}
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

      <Form.Item label="Xã/Phường/Thị trấn" name={[...props.name, 'town']}>
        <Select
          placeholder={props.placeholder}
          onChange={(val, opt) =>
            onSetFields([...props.name, 'town'], opt.name)
          }
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
        name={[...props.name, 'address']}
        placeholder={props.placeholder}
      />
    </>
  )
})
const CCSelect = {
  SelectProvince,
  SelectInput,
  SelectPersonType,
  SelectDocProvide,
  SelectTitle,
}

export default CCSelect
