/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { forwardRef, useEffect, useState } from 'react'
import { Form, Input, InputNumber, Select } from 'antd'
import DatePicker from '../DatePicker'
import { makeid } from '@/helper/Common'
import styles from './styles.module.scss'
import dayjs from 'dayjs'

// const { RangePicker } = DatePicker

const CCInput = forwardRef((props, ref) => {
  const { name, label, value, onChange, style, placeholder, ...rest } = props
  const [options, setOptions] = useState([])
  const handleOptions = () => {
    let option
    if (typeof props?.options !== 'object') {
      option = props?.options()
    } else {
      option = props?.options
    }

    setOptions(option)
  }

  switch (props.type) {
    case 'text':
      return (
        <InputText
          name={name}
          label={label && props?.display !== 'none' ? label || ' ' : ''}
          key={props?.key}
          onChange={props?.onChange}
          style={style}
          placeholder={placeholder}
          disabled={props?.disabled}
          autoComplete="off"
          value={props?.value}
          {...props}
        />
      )
    case 'number':
      return (
        <Form.Item
          value={props?.value}
          name={props.name}
          label={props?.label || ' '}
          key={props?.key}
          rules={[{ required: rest?.required }]}
        >
          <InputNumber
            onChange={props?.onChange}
            style={props.style}
            formatter={props?.formatter}
            placeholder={props?.placeholder}
            {...rest}
            autoComplete="off"
          />
        </Form.Item>
      )
    case 'password':
      return <InputPassword {...props} />
    case 'date':
      return <InputDate {...props} />
    case 'date-range':
      return <InputDateRange {...props} />
    case 'select':
      return <InputSelect name={name} label={label} {...props} options={options} handleOptions={handleOptions} />
    default:
      if (props?.layout === 'horizontal') {
        return (
          <div className={styles.formHorizontal}>
            <div className={styles.formTitle}>{props?.label || ' '}</div>
            <Form.Item
              value={value}
              name={name}
              key={props?.key}
              rules={[{ required: rest?.required, message: rest?.message }]}
              required={rest?.required}
            >
              <Input
                onChange={props?.onChange}
                style={style}
                placeholder={placeholder}
                disabled={props?.disabled}
                autoComplete={props?.autocomplete || 'off'}
              />
            </Form.Item>
          </div>
        )
      } else {
        return (
          <InputText
            name={name}
            label={label && props?.display !== 'none' ? label || ' ' : ''}
            key={props?.key}
            onChange={props?.onChange}
            style={style}
            placeholder={placeholder}
            disabled={props?.disabled}
            autoComplete="off"
            value={props?.value}
            {...props}
          />
        )
      }
  }
})

const InputPassword = (props) => {
  const { name, label, value, onChange, style, placeholder, ...rest } = props

  return (
    <Form.Item
      value={props?.value}
      name={props.name}
      label={props?.label || ' '}
      key={props?.key}
      rules={[{ required: rest?.required, message: rest?.message }]}
      required={rest?.required}
    >
      <Input.Password
        onChange={props?.onChange}
        style={{ ...props.style, width: '100%' }}
        formatter={props?.formatter}
        placeholder={props?.placeholder}
        {...rest}
        autoComplete="off"
      />
    </Form.Item>
  )
}

const InputText = ({ value, name, label, style, ...rest }) => {
  return (
    <Form.Item
      value={value}
      name={name}
      label={label && rest?.display !== 'none' ? label || ' ' : ''}
      key={rest?.key}
      rules={[{ required: rest?.required, message: rest?.message }]}
      required={rest?.required}
    >
      <Input
        onChange={rest?.onChange}
        style={style}
        placeholder={rest?.placeholder}
        disabled={rest?.disabled}
        autoComplete={rest?.autocomplete || 'off'}
        value={rest?.value}
        maxLength={rest?.maxLength}
        {...rest}
      />
    </Form.Item>
  )
}

const InputSelect = ({ name, label, options, handleOptions, prefix, ...props }) => {
  return (
    <Form.Item
      name={name}
      label={label && props?.display !== 'none' ? label || ' ' : ''}
      rules={[{ required: props?.required, message: props?.message }]}
      required={props?.required}
    >
      <Select
        onSelect={props?.onSelect}
        onChange={props?.onChange}
        disabled={props?.disabled}
        defaultActiveFirstOption={props?.defaultActiveFirstOption}
        onDropdownVisibleChange={handleOptions}
        style={props?.style}
        placeholder={props?.placeholder}
        autoComplete="off"
        value={props?.value}
      >
        {options?.map((item, i) => {
          return (
            <Select.Option value={item.value} key={item.key ? item.key : [name, i, item.value]}>
              {item.name}
            </Select.Option>
          )
        })}
      </Select>
    </Form.Item>
  )
}

const InputDate = (props) => {
  const formInstance = Form.useFormInstance()
  const { name, label, value, onChange, style, placeholder, validateTrigger, otherRule = [], ...rest } = props
  if (!name) throw new Error(`Invalid name`)

  const currentValue = formInstance.getFieldValue(name)

  useEffect(() => {
    if (currentValue && typeof currentValue === 'string') {
      formInstance.setFields([
        {
          name,
          value: dayjs(currentValue),
        },
      ])
    }
  }, [currentValue])
  if (typeof currentValue === 'string') return
  // console.log('typeof currentValue', typeof currentValue, currentValue)
  if (props?.layout === 'horizontal') {
    return (
      <div className={styles.formHorizontal}>
        <div className={styles.formTitle}>{props?.label || ' '}</div>
        <Form.Item
          name={props.name}
          key={props?.key}
          layout={props?.layout}
          rules={[{ required: props?.required, message: rest?.message }]}
          required={props?.required}
          shouldUpdate
        >
          {typeof currentValue !== 'string' || !currentValue ? (
            <DatePicker
              style={{ ...props.style, width: '100%' }}
              format="DD/MM/YYYY"
              placeholder={props?.placeholder}
              autoComplete={props?.autocomplete || 'off'}
              onChange={props?.onChange}
              disabledDate={props?.disabledDate && props.disabledDate}
              {...rest}
            />
          ) : (
            ''
          )}
        </Form.Item>
      </div>
    )
  } else {
    return (
      <Form.Item
        name={props.name}
        label={props?.label || ' '}
        key={props?.key}
        rules={[{ required: props?.required, message: rest?.message }, ...otherRule]}
        required={props?.required}
        validateTrigger={validateTrigger}
        // shouldUpdate
      >
        {typeof currentValue !== 'string' || !currentValue ? (
          <DatePicker
            style={{ ...props.style, width: '100%' }}
            format="DD/MM/YYYY"
            placeholder={props?.placeholder}
            autoComplete={props?.autocomplete || 'off'}
            onChange={props?.onChange}
            {...rest}
          />
        ) : (
          ''
        )}
      </Form.Item>
    )
  }
}

const InputDateRange = (props) => {
  const { name, key, label, required, message, separator, autocomplete, placeholder, style = {} } = props
  return (
    <>
      <Form.Item name={name} style={{ display: 'none' }} key={key}>
        <DatePicker.RangePicker inputReadOnly format="MM/DD/YYYY" />
      </Form.Item>

      <Form.Item
        name={makeid(9)}
        label={label}
        key={key}
        rules={[{ required: required, message: message }]}
        required={required}
      >
        <DatePicker.RangePicker
          inputReadOnly={props?.inputReadOnly || true}
          onChange={props?.onChange}
          format="MM/DD/YYYY"
          style={{ ...style, width: '100%' }}
          placeholder={placeholder}
          autoComplete={autocomplete || 'off'}
          separator={separator}
          {...props}
        />
      </Form.Item>
    </>
  )
}

CCInput.Select = InputSelect
CCInput.Date = InputDate
CCInput.Text = InputText

export default CCInput
