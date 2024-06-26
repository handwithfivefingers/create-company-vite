import CCInput from '@/components/CCInput'
import CCSelect from '@/components/CCSelect'
import CCListForm from '@/components/CCListForm'
import { PENDING_FORM } from '@/constant/FormConstant'
import { useStepData } from '@/context/StepProgressContext'
import { htmlContent, onSetFields } from '@/helper/Common'
import { Col, Form, InputNumber, Row, Select, Spin } from 'antd'
import clsx from 'clsx'
import React, { Suspense, memo, lazy, useMemo, useState, useEffect } from 'react'
import styles from './styles.module.scss'
import GlobalService from '@/service/GlobalService'
import { useFetch } from '@/helper/Hook'

const CCListFormV2 = lazy(() =>
  import('@/components/CCListForm').then(({ default: module }) => ({ default: module.V2 })),
)

const BASE_FORM = ['change_info', 'base_inform']

const BaseInformation = memo((props) => {
  const formInstance = Form.useFormInstance()
  const { currentStep } = useStepData()
  const renderFormByType = useMemo(() => {
    if (+props.type === 2) return <BoardMembers2Member BASE_FORM={BASE_FORM} key={`board_members`} />
    else if (+props.type === 3) return <BoardMembersCoopMember BASE_FORM={BASE_FORM} key={`board_members`} />
  }, [props.type])

  return (
    <div
      className={clsx(styles.current, {
        [styles.active]: currentStep === 1,
      })}
    >
      <Row gutter={[12, 12]}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput
            label="Tên doanh nghiệp"
            name={['change_info', 'base_inform', 'company_name']}
            onBlur={() => {
              formInstance.setFields([
                {
                  name: ['change_info', 'base_inform', 'company_name'],
                  value: formInstance.getFieldValue(['change_info', 'base_inform', 'company_name'])?.toUpperCase(),
                },
              ])
            }}
            placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
            required
          />
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput
            label="Mã số doanh nghiệp hoặc Mã số thuế"
            name={['change_info', 'base_inform', 'mst']}
            placeholder="0316184427"
            required
          />
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <CCInput.Date
            label="Ngày cấp"
            name={['change_info', 'base_inform', 'mst_provide']}
            placeholder="15/01/1966 - ENTER"
            inputReadOnly={false}
            required
          />
        </Col>

        <Col lg={12} md={24} sm={24} xs={24}>
          <SelectDoc baseName={['change_info', 'base_inform', 'mst_place_provide']} label="Nơi cấp" required />
        </Col>

        <Col span={24}>
          <CCInput
            label={htmlContent('</>Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i></>')}
            name={['change_info', 'base_inform', 'org_person']}
            placeholder="NGUYỄN VĂN A"
            onBlur={() => {
              formInstance.setFields([
                {
                  name: ['change_info', 'base_inform', 'org_person'],
                  value: formInstance.getFieldValue(['change_info', 'base_inform', 'org_person'])?.toUpperCase(),
                },
              ])
            }}
            required
            message="Vui lòng nhập Người đại diện pháp luật"
          />
        </Col>
        <Col span={24}>
          <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')}>
            <CCSelect.SelectProvince
              label={'Địa chỉ trụ sở chính'}
              name={[...BASE_FORM, 'location']}
              placeholder="Địa chỉ trụ sở chính"
              required
            />
          </Form.Item>
        </Col>

        {renderFormByType}
      </Row>
    </div>
  )
})

const BoardMembers2Member = memo(({ BASE_FORM, ...props }) => {
  let listForm = [
    {
      label: 'Thành viên góp vốn thứ 1',
      placeholder: 'NGUYỄN VĂN A',
      name: ['name'],
      onChange: true,
      options: {
        toUpperCase: true,
        compare: {
          end: 5,
          index: 2,
        },
        customLabel: 'Thành viên góp vốn thứ ',
      },
    },
    // Vốn góp
    {
      label: PENDING_FORM.approve.fields.contribute_members.fields.capital,
      placeholder: '80,000,000',
      name: ['capital'],
      options: {
        column: 8,
        layout: 'horizontal',
        format: true,
        formatter: (v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`,
      },
    },
    // Chiếm % vốn điều lệ
    {
      label: PENDING_FORM.approve.fields.contribute_members.fields.capital_percent,
      placeholder: '80',
      name: ['capital_percent'],
      options: {
        column: 16,
        layout: 'horizontal',
        format: true,
        formatter: (v) => `${v.replace('%', '')}%`,
        max: 100,
        min: 0,
        length: 3,
      },
    },
    // Số giấy chứng nhận góp vốn
    {
      label: PENDING_FORM.approve.fields.contribute_members.fields.doc_code,
      placeholder: '123456789',
      name: ['doc_code'],
      options: {
        column: 12,
        layout: 'vertical',
      },
    },
    // Ngày cấp giấy chứng nhận góp vốn
    {
      label: PENDING_FORM.approve.fields.contribute_members.fields.time_provide,
      placeholder: '01/01/1999',
      name: ['time_provide'],
      type: 'date',
      options: {
        column: 12,
        layout: 'vertical',
      },
    },
  ]

  return (
    <Col span={24}>
      <CCListForm
        label="Hội đồng thành viên"
        BASE_FORM={BASE_FORM}
        listForm={listForm}
        formLength={5}
        defaultLength={2}
        btnText="Thêm thành viên góp vốn (nếu có)"
        listName="contribute_members"
      />
    </Col>
  )
})

const BoardMembersCoopMember = memo(({ BASE_FORM }) => {
  const [defaultLength, setDefaultLength] = useState(3)

  const formInstance = Form.useFormInstance()
  useEffect(() => {
    const data = formInstance.getFieldsValue(true)
    if (data.change_info?.base_inform?.list_president) {
      const length = data.change_info?.base_inform?.list_president?.length
      setDefaultLength(length)
    }
  }, [])

  const handleShowLabel = (position) => {
    if (position > 2) return `Cổ đông dự họp ${position - 2}`
    if (position > 0) return `Thành viên HĐQT ${position}`
    return 'Tên Chủ tịch HĐQT'
  }

  const handleNameChange = ({ event, path, upper = false }) => {
    const position = event.target.getAttribute('position')
    const value = event.target.value
    const val = (upper && value.toUpperCase()) || value
    formInstance.setFields([
      {
        name: [...BASE_FORM, 'list_president', position, path],
        value: val,
      },
    ])
  }

  return (
    <Suspense fallback={<Spin />}>
      <Col span={24}>
        {defaultLength && (
          <CCListFormV2
            label="Đại hội đồng cổ đông"
            formName={[...BASE_FORM, 'list_president']}
            column={12}
            addText="Thêm thành viên HĐQT (nếu có)"
            removeText=""
            defaultLength={defaultLength}
            maxLength={5}
          >
            <CCInput
              label={handleShowLabel}
              name={'president'}
              placeholder={'NGUYỄN VĂN A'}
              onChange={(e) =>
                handleNameChange({
                  event: e,
                  path: 'president',
                  upper: true,
                })
              }
            />

            <Form.Item label={'Cổ phần đang sở hữu'} name={'capital'}>
              <InputNumber
                style={{ width: '100%' }}
                placeholder={'80,000,000'}
                stringMode={true}
                formatter={(v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`}
              />
            </Form.Item>
          </CCListFormV2>
        )}
        <Form.Item label="Tổng số vốn điều lệ" name={[...BASE_FORM, 'total_capital']}>
          <InputNumber
            placeholder="100,000,000"
            formatter={(v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
    </Suspense>
  )
})

const SelectDoc = ({ baseName, label }) => {
  const { data: province } = useFetch({
    cacheName: ['careerData', 'province'],
    fn: () => GlobalService.getProvince(),
  })

  const formInstance = Form.useFormInstance()

  const watchType = Form.useWatch([...baseName, 'type'], formInstance)
  const watchValue = Form.useWatch([...baseName, 'value'], formInstance)

  return (
    <Form.Item label={label}>
      <Row gutter={[8]}>
        <Col span={12}>
          <Form.Item name={[...baseName, 'type']}>
            <Select
              // defaultValue={1}
              defaultActiveFirstOption
              options={[
                {
                  label: 'Phòng Đăng ký kinh doanh thuộc Sở Kế hoạch và đầu tư tỉnh',
                  value: 1,
                },
                {
                  label: 'Khác',
                  value: 2,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <CCInput
            name={[...baseName, 'value']}
            type={!watchType || watchType != 2 ? 'select' : 'text'}
            options={!watchType || watchType != 2 ? province?.map(({ name }) => ({ label: name, value: name })) : []}
            required
            placeholder={!watchType || watchType != 2 ? 'Chọn tỉnh/thành' : 'Nhập vào đây'}
            key={[...baseName, 'value']}
          />
        </Col>
      </Row>
    </Form.Item>
  )
}

export default BaseInformation
