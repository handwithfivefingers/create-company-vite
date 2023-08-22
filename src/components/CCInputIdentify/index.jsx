import CCInput from '@/components/CCInput'
import { IDENTIFY_NUMBER, SELECT } from '@/constant/Common'
import { useFetch } from '@/helper/Hook'
import GlobalService from '@/service/GlobalService'
import { Form } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'

// Fixed 20/08/2023
// Age: 18 or higher

const CCInputNumberIdentify = ({ name, label, placeholder, indentifyType, ...props }) => {
  const maxLength = IDENTIFY_NUMBER[indentifyType] || 12
  return (
    <CCInput
      label={label || 'Số CMND / CCCD / Hộ chiếu'}
      name={name}
      placeholder={placeholder || '0010829446357'.slice(0, maxLength)}
      maxLength={maxLength}
      {...props}
    />
  )
}

const CCInputTypeIdentify = ({ name, label, placeholder, ...props }) => {
  return <CCInput type="select" name={name} label={label || 'Loại giấy tờ'} options={SELECT.DOC_TYPE} {...props} />
}

const CCInputDateProvideIdentify = ({ name, label, placeholder, indentifyType, ...props }) => {
  const [isOutDate, setIsOutDate] = useState(new Date())

  const handleChange = (value, dateString) => {
    setIsOutDate(value)
  }

  const isShowValidate =
    indentifyType === 'Chứng minh nhân dân' && isOutDate && moment(isOutDate).year() + 15 < moment().year()

  return (
    <div className="d-flex flex-column">
      <CCInput
        type="date"
        name={name}
        label={label || 'Ngày cấp'}
        placeholder="15/01/1966 - ENTER"
        onChange={handleChange}
        {...props}
      />
      {isShowValidate && (
        <div>
          <div class="ant-form-item-explain ant-form-item-explain-connected" role="alert">
            <div class="ant-form-item-explain-error">CMND được cấp quá 15 năm</div>
          </div>
        </div>
      )}
    </div>
  )
}

const CCInputOutdateIdentify = ({ name, label, placeholder, indentifyType, ...props }) => {
  if (indentifyType && indentifyType !== 'Chứng minh nhân dân') {
    return (
      <CCInput type="date" name={name} label={label || 'Ngày hết hạn'} placeholder="15/01/1966 - ENTER" {...props} />
    )
  }
  return undefined
}

const IDENTIFY_SELECT = [
  'Cục Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội',
  'Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư',
]

const CCInputProviderIdentify = ({ name, label, placeholder, indentifyType, ...props }) => {
  const formInstance = Form.useFormInstance()
  const { data: province } = useFetch({
    cacheName: ['careerData', 'province'],
    fn: () => GlobalService.getProvince(),
  })

  useEffect(() => {
    if (indentifyType === 'Chứng minh nhân dân') {
      formInstance.setFields([
        {
          name: name,
          value: '',
        },
      ])
    } else {
      formInstance.setFields([
        {
          name: name,
          value: IDENTIFY_SELECT[0],
        },
      ])
    }
  }, [indentifyType])

  if (indentifyType) {
    if (indentifyType === 'Căn cước công dân') {
      return (
        <CCInput
          type="select"
          name={name}
          label={label || 'Nơi cấp'}
          placeholder="Bấm vào đây"
          options={IDENTIFY_SELECT.map((item) => ({ label: item, value: item }))}
          prefix="Công an tỉnh"
          {...props}
        />
      )
    }
    if (indentifyType === 'Chứng minh nhân dân') {
      return (
        <Form.Item label={label || 'Nơi cấp'} required>
          <div className="d-flex" style={{ width: '100%', alignItems: 'end', flexWrap: 'wrap' }}>
            <div style={{ width: '100px', marginBottom: 6 }}>Công an tỉnh</div>
            <div style={{ flex: 1 }}>
              <CCInput
                type="select"
                name={name}
                placeholder="Bấm vào đây"
                options={province.map(({ name }) => ({ label: name, value: name }))}
                {...props}
              />
            </div>
          </div>
        </Form.Item>
      )
    }
  }
  return <CCInput name={name} label={label || 'Nơi cấp'} placeholder="Nhập vào đây" {...props} />
}

export {
  CCInputDateProvideIdentify, CCInputNumberIdentify, CCInputOutdateIdentify,
  CCInputProviderIdentify, CCInputTypeIdentify
}

