import { useStepData } from '@/context/StepProgressContext'
import { useFetch } from '@/helper/Hook'
import GlobalService from '@/service/GlobalService'
import { useQuery } from '@tanstack/react-query'
import { Col, Form, Input, Row, Select, Tag, Typography } from 'antd'
import clsx from 'clsx'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { BsTags } from 'react-icons/bs'
import styles from './styles.module.scss'
const NgangNgheDangKi = memo(({ BASE_FORM, className }) => {
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  const watchCompanyCareerType = Form.useWatch([...BASE_FORM, 'company_career_type'], formInstance)
  const watchCompanyCareerGroup = Form.useWatch([...BASE_FORM, 'company_career_group'], formInstance)
  const [autofill, setAutofill] = useState(false)
  // const [data, setData] = useState([])
  const listCareer = useQuery({
    queryKey: ['listCategory', watchCompanyCareerGroup],
    queryFn: async () => (await GlobalService.getListCareerByCategory({ category: watchCompanyCareerGroup })).data.data,
    enabled: !!watchCompanyCareerGroup || !!watchCompanyCareerType,
  })

  const { data: careerCategory, refetch } = useFetch({
    cacheName: ['careerCate'],
    fn: () => GlobalService.getCareerCategory(),
  })
  useEffect(() => {
    window.form = formInstance
  }, [])

  // useEffect(() => {
  //   if (watchCompanyCareerGroup || watchCompanyCareerType) {
  //     getListCareerByCategory()
  //   }
  // }, [watchCompanyCareerGroup, watchCompanyCareerType])

  const autofillOptions = useMemo(() => {
    if (autofill && watchCompanyCareerType === 2 && watchCompanyCareerGroup?.length && listCareer?.data?.length) {
      return listCareer?.data?.map((item) => ({ ...item, value: item._id, code: item.code, name: item.name }))
    }
    return []
  }, [watchCompanyCareerGroup, watchCompanyCareerType, listCareer, autofill])

  console.log('listCareer', listCareer)

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

  console.log('autofill', autofill)

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
                tagRender={tagRender}
                onChange={() => !autofill && setAutofill(true)}
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
              <OptCareerComponent data={careerData} BASE_FORM={BASE_FORM} autofillOptions={autofillOptions} />
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

const OptCareerComponent = memo(({ BASE_FORM, data, autofillOptions }) => {
  const formInstance = Form.useFormInstance()
  const watchMirrorOptions = Form.useWatch([...BASE_FORM, 'company_opt_career_mirror'], formInstance)

  const activeOptions = useMemo(() => {
    const result = []
    if (data?.length) {
      for (let option of data) {
        const isIncludes = watchMirrorOptions?.some((item) => item._id === option._id || item.value === option._id)
        if (isIncludes) continue
        result.push(option)
      }
    }
    return result
  }, [watchMirrorOptions])

  const selectedOptions = useMemo(() => {
    const result = watchMirrorOptions?.length ? watchMirrorOptions : []
    if (autofillOptions?.length) {
      for (let option of autofillOptions) {
        const isIncludes = watchMirrorOptions?.some((item) => item._id === option._id || item.value === option._id)
        if (isIncludes) continue
        result.push(option)
      }
    }
    return result
  }, [autofillOptions, watchMirrorOptions])

  const handleFilterOptions = (input, option) => {
    const { children } = option
    const searchString = input?.toLowerCase() || ''
    if (!children) return false
    if (Array.isArray(children)) {
      return children.join('').toLowerCase()?.indexOf(searchString) >= 0
    }
    return children.toLowerCase()?.indexOf(searchString) >= 0
  }

  const onClose = (item) => {
    const nextState = [...watchMirrorOptions]
    const result = nextState.filter((opt) => opt.value !== item.value)
    updateOptionsCareerForm(result)
  }

  const getOptCareer = () => {
    let html = null
    html = selectedOptions?.map((opt) => {
      return tagRender({
        label: `${opt.code} ${opt.name}`,
        closable: true,
        onClose: () => onClose(opt),
        key: `tag_opt_career${opt.code}`,
      })
    })
    return html
  }

  const handleChange = (val, opt) => {
    const nextState = watchMirrorOptions?.length ? [...watchMirrorOptions] : []
    let result = []
    let isIncludes = nextState?.some((item) => item.value === opt.value)
    if (isIncludes) {
      result = nextState?.filter((item) => item.value !== opt.value) || []
    } else {
      result = [...nextState, opt]
    }
    updateOptionsCareerForm(result)
  }

  const updateOptionsCareerForm = (opts) => {
    formInstance.setFields([
      {
        name: [...BASE_FORM, 'company_opt_career'],
        value: opts,
      },
    ])
    formInstance.setFields([
      {
        name: [...BASE_FORM, 'company_opt_career_mirror'],
        value: opts,
      },
    ])
  }

  console.log('watchMirrorOptions', watchMirrorOptions)
  return (
    <Form.Item
      name={[...BASE_FORM, 'company_opt_career_mirror']}
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
        showSearch
        allowClear
        style={{ width: '100%' }}
        onChange={handleChange}
        optionFilterProp="children"
        filterOption={handleFilterOptions}
        tagRender={tagRender}
        showArrow
        value={'Bấm vào đây để thêm ngành nghề mới'}
      >
        {activeOptions?.map((item) => (
          <Select.Option
            key={'company_opt_career_mirror' + item._id}
            value={item._id}
            code={item.code}
            name={item.name}
          >
            {item.code}-{item.name}
          </Select.Option>
        ))}
      </Select>

      <div className={styles.list}>
        <Form.Item name={[...BASE_FORM, 'company_opt_career']} noStyle>
          <Input type="hidden" />
        </Form.Item>
        {getOptCareer()}
      </div>
    </Form.Item>
  )
})

const tagRender = (props) => {
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
    >
      {label}
    </Tag>
  )
}

export default NgangNgheDangKi
