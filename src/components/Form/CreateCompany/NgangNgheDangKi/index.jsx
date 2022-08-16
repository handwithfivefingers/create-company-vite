import { Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import HomepageService from '@/service/GlobalService'
import styles from '../CreateCompany.module.scss'
import { useFetch } from '@/helper/Hook'

const NgangNgheDangKi = forwardRef((props, ref) => {
  const { BASE_FORM, current } = props

  const [careerData, setCareerData] = useState([])

  const { data, isLoading, status, refetch } = useFetch({
    cacheName: ['careerData'],
    fn: () => HomepageService.fetchCareer(),
  })

  useEffect(() => {
    if (data && status === 'success') {
      setCareerData(data)
    }
  }, [data])

  /**
   *
   * @param {*} pathName
   * @param {*} val
   * @param {*} opt Object or Array
   */
  const handleChange = (pathName, opt) => {
    console.log(opt)
    let value
    if (Array.isArray(opt)) {
      value = opt.map(({ code, name, value }) => ({ code, name, value }))
    } else {
      value = { code: opt.code, name: opt.name, value: opt.value }
    }
    ref.current.setFields([
      {
        name: pathName,
        value,
      },
    ])
  }
  return (
    <Form.Item
      label={<h2>Ngành nghề đăng kí kinh doanh</h2>}
      className={clsx([
        styles.hide,
        props.className,
        {
          [styles.visible]: current === 6,
        },
      ])}
    >
      <Form.Item label="Chọn ngành nghề kinh doanh chính">
        <Row gutter={[16, 12]}>
          <Col span={24}>
            <Form.Item name={[...BASE_FORM, 'company_main_career']}>
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children
                    .join('')
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val, opt) =>
                  handleChange([...BASE_FORM, 'company_main_career'], opt)
                }
                placeholder="Gõ tên ngành hoặc mã ngành"
              >
                {careerData.map((item) => (
                  <Select.Option
                    key={item._id}
                    value={item._id}
                    code={item.code}
                    name={item.name}
                  >
                    {item.code}-{item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <Form.Item
            name={[...BASE_FORM, 'company_opt_career']}
            label="Chọn thêm ngành nghề kinh doanh"
          >
            <Select
              showSearch
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              onChange={(val, opt) =>
                handleChange([...BASE_FORM, 'company_opt_career'], opt)
              }
              optionFilterProp="children"
              placeholder="Gõ tên ngành hoặc mã ngành"
              filterOption={(input, option) =>
                option.children
                  .join('')
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {careerData.map((item) => (
                <Select.Option
                  key={item._id}
                  value={item._id}
                  code={item.code}
                  name={item.name}
                >
                  {item.code}-{item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  )
})

export default NgangNgheDangKi
