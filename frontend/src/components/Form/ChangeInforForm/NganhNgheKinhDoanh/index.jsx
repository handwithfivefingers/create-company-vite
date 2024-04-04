import GlobalService from '@/service/GlobalService'
import { Form, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import { useStepData } from '../../../../context/StepProgressContext'

const BASE_FORM = ['change_info', 'company_career']

const NganhNgheKinhDoanh = (props) => {
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  const [career, setCareer] = useState([])
  useEffect(() => {
    onFetchCareer()
  }, [])

  const onFetchCareer = async () => {
    try {
      const res = await GlobalService.fetchCareer()
      if (res) {
        setCareer(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (value, opt, pathName) => {
    formInstance.setFieldsValue({
      change_info: {
        company_career: {
          [pathName]: opt,
        },
      },
    })
  }
  return (
    <Form.Item
      label={<h3>Thông báo thay đổi ngành, nghề kinh doanh</h3>}
      className={clsx(styles.current, {
        [styles.active]: currentStep === props.index,
      })}
    >
      <Form.Item label="Bổ sung ngành, nghề kinh doanh" name={[...BASE_FORM, 'include']}>
        <Select
          showSearch
          placeholder="Gõ tên ngành hoặc mã ngành"
          allowClear
          mode="multiple"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val, opt) => handleChange(val, opt, 'include')}
        >
          {career.map((item) => (
            <Select.Option key={item._id} value={item._id} name={item.name}>
              {item.code}-{item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Bỏ ngành, nghề kinh doanh"
        name={[...BASE_FORM, 'exclude']}
        placeholder="Gõ tên ngành hoặc mã ngành"
      >
        <Select
          showSearch
          placeholder="Gõ tên ngành hoặc mã ngành"
          allowClear
          mode="multiple"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val, opt) => handleChange(val, opt, 'exclude')}
        >
          {career.map((item) => (
            <Select.Option key={item._id} value={item._id} name={item.name}>
              {item.code}-{item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form.Item>
  )
}

export default NganhNgheKinhDoanh
