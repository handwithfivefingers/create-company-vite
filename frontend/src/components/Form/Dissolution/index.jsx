import { Form, Select } from 'antd'
import clsx from 'clsx'
import { forwardRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import GiaiThe from './GiaiThe'
import styles from './styles.module.scss'
import { VALIDATE_MESSAGE } from '@/constant/InputValidate'
import dayjs from 'dayjs'

const Dissolution = forwardRef((props, ref) => {
  const [selectType, setSelectType] = useState()

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      initDataforEditing()
      console.log('data', location.state.data)
    }
  }, [location])

  const initDataforEditing = () => {
    let { state } = location

    let { category, data } = state

    let _data = {
      ...data,
      dissolution: {
        approve: {
          ...data.dissolution.approve,
          mst_provide: dayjs(data.dissolution.mst_provide),
          dissolution_date: dayjs(data.dissolution.dissolution_date),
        },
      },
    }

    if (!category) return

    _data.category = {
      type: category.type,
      value: category._id,
      name: category.name,
    }

    setSelectType(_data.category)

    ref.current?.setFieldsValue({
      ..._data,
    })
  }

  const handleChange = (val, opt, pathName) => {
    setSelectType(opt)
    ref.current.setFields([
      {
        name: [pathName],
        value: opt,
      },
    ])
    if (props.onFinishScreen) {
      props.onFinishScreen(opt)
    }
  }

  return (
    <Form
      ref={ref}
      layout="vertical"
      validateMessages={VALIDATE_MESSAGE}
      initialValues={{
        dissolution: {
          approve: {
            dissolution_number: dayjs().format('MM/YYYY[/QĐ]'),
            dissolution_date: dayjs(),
          },
        },
      }}
    >
      <Form.Item
        name="category"
        label="Chọn loại hình doanh nghiệp"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select onChange={(val, opt) => handleChange(val, opt, 'category')} placeholder="Bấm vào đây">
          {props.data?.map(({ _id, name, type }) => {
            return (
              <Select.Option key={_id} value={_id} type={type}>
                {name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>

      <GiaiThe current={props.current} index={1} ref={ref} data={selectType} />
    </Form>
  )
})

export default Dissolution
