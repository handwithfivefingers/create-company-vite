import { useState } from 'react'
import CCInput from '@/components/CCInput'
import { IDENTIFY_NUMBER, SELECT } from '../../constant/Common'
import CCSelect from '../CCSelect'

// Fixed 20/08/2023
// Age: 18 or higher

const CCInputNumberIdentify = ({ name, label, placeholder, type, ...props }) => {
  const maxLength = IDENTIFY_NUMBER[type] || 12
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

const IndentifySelectionComponent = ({ BASE_FORM, column }) => {
  const [selected, setSelected] = useState(undefined)

  const handleSelected = (value) => {
    if (value === 'Căn cước công dân') {
      setSelected('CCCD')
    } else if (value === 'Chứng minh nhân dân') {
      setSelected('CMND')
    } else if (value === 'Hộ chiếu') setSelected('HC')
  }

  if (column) {
  }

  return (
    <>
      <CCInput
        type="select"
        name={[...BASE_FORM, 'doc_type']}
        label="Loại giấy tờ"
        options={SELECT.DOC_TYPE}
        required
        onSelect={handleSelected}
      />

      <CCInputNumberIdentify name={[...BASE_FORM, 'doc_code']} required type={selected} />

      <CCInput
        name={[...BASE_FORM, 'doc_time_provide']}
        label="Ngày cấp"
        type="date"
        placeholder="15/01/2015 - ENTER"
      />
      <CCInput
        name={[...BASE_FORM, 'doc_time_provide']}
        label="Ngày cấp"
        type="date"
        placeholder="15/01/2015 - ENTER"
      />

      <CCSelect.SelectDocProvide
        ref={forwardRef}
        name={[...BASE_FORM, 'information', 'doc_place_provide']}
        label="Nơi cấp"
        placeholder="Bấm vào đây"
        required
      />
    </>
  )
}

export { IndentifySelectionComponent }

export default CCInputNumberIdentify
