import CCInput from '@/components/CCInput'
import GlobalService from '@/service/GlobalService'
import { Col, Form, Input, Row, Select } from 'antd'
import React, { forwardRef, useEffect, useState } from 'react'
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

  const name = props?.nameSet ? props?.nameSet : props?.name

  useEffect(() => {
    !city.length && dispatch(ProvinceAction.getProvinceAction())
  }, [])

  useEffect(() => {
    getScreenData(params)
  }, [params])

  useEffect(() => {
    let val = ref.current.getFieldValue([...name])
    onSetFields([...name], val, ref)
  }, [props])

  const handleSelectCity = (val, opt) => {
    let pathName = name
    if (props.pathName) {
      pathName = props.pathName
    }

    onSetFields([...pathName, 'city'], opt.name, ref)

    setParams({ code: val, ward: null })

    let listFields = [
      [...pathName, 'district'],
      [...pathName, 'town'],
    ]
    listFields.forEach((item) => onSetFields([...item], null, ref))

    // console.log('handleSelectCity', ref.current.getFieldsValue())
  }

  const handleSelectDistricts = (val, opt) => {
    let pathName = name
    if (props.pathName) {
      pathName = props.pathName
    }

    onSetFields([...pathName, 'district'], opt.name, ref)

    setParams((state) => ({ ...state, wards: val }))
  }

  const handleSelectWards = (val, opt) => {
    let pathName = name

    if (props.pathName) {
      pathName = props.pathName
    }
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
    } finally {
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
        //placeholder={props.placeholder}
        placeholder="20 Nguyễn Hữu Thọ"
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
    // console.log([...props.name])
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
  const [select, setSelect] = useState(1)

  const [input, setInput] = useState('')
  useEffect(() => {
    let pathName = props.name
    if (props.pathName) {
      pathName = props.pathName
    }
    let val = ref.current.getFieldValue([...pathName])
    if (val && val !== 'Kinh') {
      setSelect(2)
      setInput(val)
    }
  }, [props])

  const handleSelect = (val, opt) => {
    let pathName = props.name
    if (props.pathName) {
      pathName = props.pathName
    }
    if (val === 1) {
      ref.current.setFields([{ name: [...pathName], value: 'Kinh' }])
      setSelect(1)
    } else setSelect(2)
  }

  const handleInputChange = (e) => {
    let pathName = props.name
    if (props.pathName) {
      pathName = props.pathName
    }
    setInput(e.target.value)
    ref.current.setFields([{ name: [...pathName], value: e.target.value }])
  }
  return (
    <Form.Item name={[...props.name]} label={props.label}>
      <Row>
        <Col span={select === 2 ? 8 : 24} style={{ padding: 0 }}>
          <Select
            value={select}
            placeholder={props.placeholder}
            onChange={(val, opt) => handleSelect(val, opt)}
          >
            <Option value={1}>Kinh</Option>
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
  useEffect(() => {
    let pathName = props.name

    if (props.pathName) {
      pathName = props.pathName
    }
    let val = ref.current.getFieldValue([...pathName])
    if (val && val !== 'Cục Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội') {
      SetSelect(2)
      SetInput(val)
    }
  }, [props])

  const handleSelect = (val, opt) => {
    let pathName = props.name
    if (props.pathName) {
      pathName = props.pathName
    }
    SetSelect(val)
    if (val === 1) {
      ref.current.setFields([
        {
          name: [...pathName],
          value: 'Cục Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội',
        },
      ])
    }
  }
  const handleInputchange = (e) => {
    let pathName = props.name
    if (props.pathName) {
      pathName = props.pathName
    }
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
            <Option value={1}>
              Cục Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội
            </Option>
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

    // console.log(ref.current.getFieldsValue())
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
      // console.log(res)
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
