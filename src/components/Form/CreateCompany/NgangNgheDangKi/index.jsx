import { Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import { forwardRef, useEffect, useState } from 'react'
import GlobalService from '@/service/GlobalService'
import styles from '../CreateCompany.module.scss'
import { useFetch } from '@/helper/Hook'
import { useQuery } from '@tanstack/react-query'
import { useStepData } from '@/context/StepProgressContext'

const NgangNgheDangKi = forwardRef((props, ref) => {
  const { currentStep } = useStepData()

  const { BASE_FORM, current } = props

  const [careerData, setCareerData] = useState([])

  const [selfSelect, setSelfSelect] = useState(null)

  const { status, fetchStatus, data } = useQuery(
    ['career'],
    async () => {
      let res = await GlobalService.fetchCareer()
      return res.data.data
    },
    {
      // The query will not execute until the userId exists
      enabled: selfSelect === 1,
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: true,
    },
  )

  const {
    data: careerCate,
    status: cateStatus,
    refetch: cateRefetch,
  } = useFetch({
    cacheName: ['careerCate'],
    fn: () => GlobalService.getCareerCategory(),
  })

  useEffect(() => {
    if (data && status === 'success') {
      setCareerData(data)
    }
  }, [data, selfSelect])

  /**
   *
   * @param {*} pathName
   * @param {*} val
   * @param {*} opt Object or Array
   */

  const handleChange = (pathName, opt) => {
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

  const handleCareerCateSelected = async (_id, opt) => {
    try {
      let res = await GlobalService.getSingleCareerCategory(_id)
      let { data } = res.data
      setCareerData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSelfSelectCareer = (val) => {
    setSelfSelect(val)
  }

  const handleFilterOptions = (input, option) => {
    const { children } = option
    const searchString = input?.toLowerCase() || ''
    if (!children) return false
    if (Array.isArray(children)) {
      return children.join('').toLowerCase()?.indexOf(searchString) >= 0
    }
    return children.toLowerCase()?.indexOf(searchString) >= 0
  }

  return (
    <Form.Item
      label={<h2>Ngành nghề đăng kí kinh doanh</h2>}
      className={clsx([
        styles.hide,
        props.className,
        {
          [styles.visible]: currentStep === 6,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <Form.Item
            label="Vui lòng chọn"
            required
            rules={[{ required: true, message: 'Vui lòng chọn ngành nghề đăng kí' }]}
          >
            <Select placeholder="Bấm vào đây" onChange={handleSelfSelectCareer}>
              <Select.Option value={1}>Tự chọn ngành nghề</Select.Option>
              <Select.Option value={2}>Chọn theo lĩnh vực đề xuất</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        {selfSelect && selfSelect === 2 && (
          <Col span={24}>
            <Form.Item
              label="Chọn nhóm ngành nghề"
              required
              rules={[{ required: true, message: 'Vui lòng chọn nhóm ngành nghề' }]}
            >
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={handleFilterOptions}
                onChange={handleCareerCateSelected}
                placeholder="Gõ nhóm ngành liên quan"
              >
                {careerCate?.map(({ name, _id }) => {
                  return (
                    <Select.Option value={_id} key={_id}>
                      {name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
        )}

        {careerData?.length > 0 && (
          <>
            <Col span={24}>
              <Form.Item name={[...BASE_FORM, 'company_main_career']} label="Chọn ngành nghề kinh doanh chính">
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={handleFilterOptions}
                  onChange={(val, opt) => handleChange([...BASE_FORM, 'company_main_career'], opt)}
                  placeholder="Gõ tên ngành hoặc mã ngành"
                  required
                  rules={[{ required: true, message: 'Vui lòng chọn nhóm ngành nghề' }]}
                >
                  {careerData?.map((item) => (
                    <Select.Option key={item._id} value={item._id} code={item.code} name={item.name}>
                      {item.code} - {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={[...BASE_FORM, 'company_opt_career']} label="Chọn thêm ngành nghề kinh doanh">
                <Select
                  showSearch
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  onChange={(val, opt) => handleChange([...BASE_FORM, 'company_opt_career'], opt)}
                  optionFilterProp="children"
                  placeholder="Gõ tên ngành hoặc mã ngành"
                  filterOption={handleFilterOptions}
                >
                  {careerData?.map((item) => (
                    <Select.Option key={item._id} value={item._id} code={item.code} name={item.name}>
                      {item.code}-{item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </>
        )}
      </Row>
    </Form.Item>
  )
})

export default NgangNgheDangKi
