import CCInput from '@/components/CCInput'
import CCInputBirthDay from '@/components/CCInputBirthDay'
import {
  CCInputDateProvideIdentify,
  CCInputNumberIdentify,
  CCInputProviderIdentify,
  CCInputTypeIdentify,
} from '@/components/CCInputIdentify'
import CCSelect from '@/components/CCSelect'
import { SELECT } from '@/constant/Common'
import { htmlContent } from '@/helper/Common'
import { Form, InputNumber } from 'antd'
import styles from './styles.module.scss'
import { useOrder } from '../../../../../store/reducer'
import { useEffect } from 'react'
const Personal = (props) => {
  const { BASE_FORM, type, index } = props
  const formInstance = Form.useFormInstance()
  const doctypeWatch = Form.useWatch([...BASE_FORM, 'doc_type'], formInstance)

  const origin_person = useOrder(['createCompany', 'approve', 'origin_person'])

  const setFields = ({ name, value }) => {
    formInstance.setFields([
      {
        name,
        value,
      },
    ])
  }

  useEffect(() => {
    if (origin_person) {
      const currentPerson = origin_person[index]
      console.log('currentPerson', currentPerson)
      const formValue = formInstance.getFieldValue(BASE_FORM)
      console.log('formValue', formValue)
    }
  }, [origin_person])
  return (
    <div className={styles.groupInput}>
      {type && type !== 1 && (
        <Form.Item name={[...BASE_FORM, 'capital']} label="Số tiền góp vốn" placeholder="Số tiền góp vốn">
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      <CCInput
        name={[...BASE_FORM, 'name']}
        label="Họ và Tên"
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => setFields({ name: [...BASE_FORM, 'name'], value: e.target.value?.toUpperCase() })}
        required
      />

      <CCInputBirthDay name={[...BASE_FORM, 'birth_day']} required />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'gender']}
        label="Giới tính"
        options={SELECT.GENDER}
        placeholder="Bấm vào đây"
        required
      />

      <CCSelect.SelectPersonType name={[...BASE_FORM, 'per_type']} label="Dân tộc" placeholder="Bấm vào đây" required />

      <CCInputTypeIdentify name={[...BASE_FORM, 'doc_type']} required />

      <CCInputNumberIdentify indentifyType={doctypeWatch} name={[...BASE_FORM, 'doc_code']} required />

      <CCInputDateProvideIdentify
        name={[...BASE_FORM, 'doc_time_provide']}
        required
        inputReadOnly={false}
        indentifyType={doctypeWatch}
      />

      <CCInputProviderIdentify name={[...BASE_FORM, 'doc_place_provide']} required indentifyType={doctypeWatch} />

      <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')} className={styles.newLine}>
        <CCSelect.SelectProvince name={[...BASE_FORM, 'current']} required />
      </Form.Item>

      <CCSelect.RadioAddress
        label={'<b>Địa chỉ liên lạc</b>'}
        prevField={[...BASE_FORM, 'current']}
        nextField={[...BASE_FORM, 'contact']}
        bodyStyle={styles}
        required
      />
    </div>
  )
}

export default Personal
