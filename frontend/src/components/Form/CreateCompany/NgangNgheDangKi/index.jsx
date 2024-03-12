import { useStepData } from '@/context/StepProgressContext'
import { useFetch } from '@/helper/Hook'
import GlobalService from '@/service/GlobalService'
import { useQuery } from '@tanstack/react-query'
import { Col, Form, Row, Select, Tag, Typography } from 'antd'
import clsx from 'clsx'
import { memo, useEffect, useMemo, useState } from 'react'
import { BsTags } from 'react-icons/bs'
import styles from './styles.module.scss'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'

const NgangNgheDangKi = memo(({ BASE_FORM, className }) => {
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  const watchCompanyCareerType = Form.useWatch([...BASE_FORM, 'company_career_type'], formInstance)
  const watchCompanyCareerGroup = Form.useWatch([...BASE_FORM, 'company_career_group'], formInstance)

  const listCareer = useQuery({
    queryKey: ['listCategory', watchCompanyCareerGroup],
    queryFn: async () => (await GlobalService.getListCareerByCategory({ category: watchCompanyCareerGroup })).data.data,
    enabled: !!watchCompanyCareerGroup || !!watchCompanyCareerType,
  })

  const { data: careerCategory, refetch } = useFetch({
    cacheName: ['careerCate'],
    fn: () => GlobalService.getCareerCategory(),
  })

  const { data: careerData } = useQuery(['career'], async () => {
    let res = await GlobalService.fetchCareer()
    return res.data.data
  })

  const handleChange = (pathName, opt) => {
    let value
    if (Array.isArray(opt)) {
      value = opt.map(({ code, name, value }) => ({ code, name, value }))
    } else {
      value = { code: opt.code, name: opt.name, value: opt.value }
    }
    formInstance.setFields([
      {
        name: pathName,
        value,
      },
    ])
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
  const handleChangeCareerType = () => {
    refetch()
  }

  const groupData = useMemo(() => {
    if (!listCareer.isLoading && watchCompanyCareerGroup?.length) {
      return listCareer.data
    }
    return []
  }, [watchCompanyCareerGroup, listCareer])

  return (
    <Form.Item
      label={<h2>Ngành nghề đăng kí kinh doanh</h2>}
      className={clsx([
        styles.hide,
        className,
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
            name={[...BASE_FORM, 'company_career_type']}
            rules={[{ required: true, message: 'Vui lòng chọn ngành nghề đăng kí' }]}
          >
            <Select placeholder="Bấm vào đây" onChange={handleChangeCareerType}>
              <Select.Option value={1}>Tự chọn ngành nghề</Select.Option>
              <Select.Option value={2}>Chọn theo lĩnh vực đề xuất</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        {watchCompanyCareerType === 2 && (
          <Col span={24}>
            <Form.Item
              label="Chọn nhóm ngành nghề"
              required
              rules={[{ required: true, message: 'Vui lòng chọn nhóm ngành nghề' }]}
              name={[...BASE_FORM, 'company_career_group']}
            >
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={handleFilterOptions}
                placeholder="Vui lòng bấm vào đây để chọn nhóm ngành liên quan"
                mode="tags"
                tagRender={TagRender}
                showArrow
              >
                {careerCategory?.map(({ name, _id }) => {
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

        {!!watchCompanyCareerType && (
          <>
            <Col span={24}>
              <OptCareerComponent data={careerData} BASE_FORM={BASE_FORM} groupData={groupData} />
            </Col>

            <Col span={24}>
              <Form.Item
                name={[...BASE_FORM, 'company_main_career']}
                label={
                  <div>
                    Chọn ngành nghề kinh doanh chính <br />
                    <Typography.Text italic>(Giới hạn tối đa 1 ngành nghề chính)</Typography.Text>
                  </div>
                }
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={handleFilterOptions}
                  onChange={(val, opt) => handleChange([...BASE_FORM, 'company_main_career'], opt)}
                  required
                  placeholder="Bấm vào đây để chọn ngành nghề"
                  rules={[{ required: true, message: 'Vui lòng chọn nhóm ngành nghề' }]}
                >
                  {listCareer?.data?.map((item) => (
                    <Select.Option key={item._id} value={item._id} code={item.code} name={item.name}>
                      {item.code} - {item.name}
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
const OptCareerComponent = memo(({ BASE_FORM, data, groupData }) => {
  const formInstance = Form.useFormInstance()
  const watchOptCareer = Form.useWatch([...BASE_FORM, 'company_opt_career'], formInstance)
  useEffect(() => {
    const isFieldTouch = formInstance?.isFieldTouched([...BASE_FORM, 'company_career_group'])
    if (groupData?.length && isFieldTouch) {
      const dataFormat = groupData?.map((item) => ({
        name: item.name,
        code: item.code,
        value: item._id,
        _id: item._id,
      }))
      const prevState = (watchOptCareer?.length && [...watchOptCareer]) || []
      const nextState = [...prevState, ...dataFormat]
      setFields(nextState)
    }
  }, [groupData])

  // useEffect()
  const setFields = (value) => {
    formInstance.setFields([
      {
        name: [...BASE_FORM, 'company_opt_career'],
        value,
      },
    ])
  }

  const handleChangeCareer = (val, opt) => {
    console.log('opt', opt)
    const prevState = watchOptCareer?.length ? [...watchOptCareer] : []
    const nextState = [...prevState, { ...opt.data, value: val }]
    setFields(nextState)
  }
  const handleDeselect = (val, opt) => {
    const nextState = watchOptCareer?.filter((item) => item.value !== val) || []
    setFields(nextState)
  }

  return (
    <>
      <Form.Item
        label={
          <div>
            Chọn ngành nghề kinh doanh <br />
            <Typography.Text type="danger" italic>
              Nếu muốn bỏ bớt ngành vui lòng bấm dấu X
            </Typography.Text>
          </div>
        }
      >
        <Select
          onSelect={handleChangeCareer}
          value={null}
          onDeselect={handleDeselect}
          placeholder="Bấm vào đây để chọn thêm ngành nghề"
        >
          {data?.map((item) => (
            <Select.Option value={item._id} data={item} key={item._id}>
              {item.code} - {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={[...BASE_FORM, 'company_opt_career']}>
        {watchOptCareer?.map((item, i) => (
          <TagRender
            label={item.code + '-' + item.name}
            closable
            onClose={() => handleDeselect(item.value, item)}
            key={['company_opt_career', i]}
          />
        ))}

        {/* <Select
          showSearch
          allowClear
          style={{ width: '100%' }}
          optionFilterProp="children"
          filterOption={handleFilterOptions}
          mode="tags"
          tagRender={tagRender}
          showArrow
          onChange={handleChange}
          placeholder={'Bấm vào đây để thêm ngành nghề mới'}
          onClear={() => setFields([])}
        >
          {data?.map((item) => (
            <Select.Option value={item._id} data={item} key={item._id}>
              {item.code} - {item.name}
            </Select.Option>
          ))}
          <Select.Option key={null} value={null} data={DEFAULT_SELECTED} style={{ display: 'none' }}>
            {DEFAULT_SELECTED.code}
          </Select.Option>
        </Select> */}
      </Form.Item>
    </>
  )
})

const TagRender = (props) => {
  const { label, closable, onClose } = props
  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color="purple"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
        display: 'flex',
        gap: 4,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2px 4px',
        margin: 1,
      }}
      icon={<BsTags fontSize={16} style={{ flex: 1, width: 16, height: 16 }} />}
      key={`${label}`}
      className={styles.tag}
    >
      {label}
    </Tag>
  )
}

export default NgangNgheDangKi
