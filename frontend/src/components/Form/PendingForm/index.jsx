import { Form, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { forwardRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import TamNgungKinhDoanh from './TamNgungKinhDoanh'
import { VALIDATE_MESSAGE } from '@/constant/InputValidate'

const TamHoanForm = forwardRef((props, ref) => {
  const [PendingForm] = Form.useForm()

  const [selectType, setSelectType] = useState({
    type: 1,
    value: '',
    name: '',
  })

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      initDataforEditing()
    }
  }, [location])
  
  const initDataforEditing = () => {
    let { state } = location

    let _data = {}

    let { category, data } = state

    if (!category) return

    _data.category = {
      type: category.type,
      value: category._id,
      name: category.name,
    }

    if (data) {
      let approve = data?.pending?.approve

      if (approve) {
        let { time_range } = approve
        if (time_range) {
          time_range.start = dayjs(time_range.start, 'YYYY-MM-DD')
          time_range.end = dayjs(time_range.end, 'YYYY-MM-DD')
        }

        approve = {
          ...approve,
          time_range,
        }
      }
      _data.pending = {
        approve,
      }
    }

    setSelectType(_data.category)

    ref.current?.setFieldsValue({
      ..._data,
    })
  }
  const handleChange = ({ type, value, name }, pathName) => {
    setSelectType({ type, value, name })
    ref.current.setFields([
      {
        name: [pathName],
        value: { type, value, name },
      },
    ])
    if (props.onFinishScreen) {
      props.onFinishScreen({ type, value, name })
    }
  }

  return (
    <Form ref={ref} layout="vertical" form={PendingForm}>
      <Form.Item
        name="category"
        label="Chọn loại hình doanh nghiệp"
        required
        validateMessages={VALIDATE_MESSAGE}
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select onChange={(val, opt) => handleChange(opt, 'category')} placeholder="Bấm vào đây">
          {props.data?.map((item) => {
            return (
              <Select.Option key={item._id} value={item._id} {...item}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>

      <TamNgungKinhDoanh ref={ref} current={props.current} index={1} type={selectType?.type} />
    </Form>
  )
})

export default TamHoanForm
