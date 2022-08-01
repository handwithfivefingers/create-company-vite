import { Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import HomepageService from '@/service/GlobalService'
import styles from '../CreateCompany.module.scss'

const NgangNgheDangKi = forwardRef((props, ref) => {
  const { BASE_FORM, current } = props

  const [careerData, setCareerData] = useState([])
  useEffect(() => {
    onFetchCareer()
  }, [])

  const onFetchCareer = () => {
    HomepageService.fetchCareer()
      .then((res) => {
        setCareerData(res.data.data)
      })
      .catch((err) => console.log(err))
      .finally(() => {})
  }

  const handleChange = (pathName, value, opt) => {
    ref.current.setFieldsValue({
      create_company: {
        approve: {
          [pathName]: opt,
        },
      },
    })
  }
  return (
    <Form.Item
      label={<h2>Ngành nghề đăng kí kinh doanh</h2>}
      className={clsx([
        styles.hide,
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
                  handleChange('company_main_career', val, opt)
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
                handleChange('company_opt_career', val, opt)
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
