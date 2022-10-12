import { Form, Select } from 'antd'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import styles from './styles.module.scss'
import TamNgungKinhDoanh from './TamNgungKinhDoanh'
const TamHoanForm = forwardRef((props, ref) => {
  const [selectType, setSelectType] = useState({
    type: 1,
    value: '',
    name: '',
  })

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
  console.log(selectType)
  return (
    <Form ref={ref} layout="vertical">
      <Form.Item
        name="category"
        label="Chọn loại hình doanh nghiệp"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select onSelect={(val, opt) => handleChange(opt, 'category')} placeholder="Bấm vào đây">
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
