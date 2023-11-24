import CCInput from '@/components/CCInput'
import CCInputBirthDay from '@/components/CCInputBirthDay'
import {
  CCInputDateProvideIdentify,
  CCInputNumberIdentify,
  CCInputOutdateIdentify,
  CCInputProviderIdentify,
  CCInputTypeIdentify,
} from '@/components/CCInputIdentify'
import CCSelect from '@/components/CCSelect'
import { SELECT } from '@/constant/Common'
import { htmlContent } from '@/helper/Common'
import { Form, InputNumber } from 'antd'
import styles from './styles.module.scss'

const Personal = ({ name, type, handleFieldChange, docTypeWatch, handleIdentifyChange }) => {
  return (
    <div className={styles.groupInput}>
      {type && type !== 1 && (
        <Form.Item name={[name, 'capital']} label="Số tiền góp vốn" placeholder="Số tiền góp vốn">
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      <CCInput
        name={[name, 'name']}
        label="Họ và Tên"
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => handleFieldChange({ value: e.target.value, name: [name, 'name'], upper: true })}
        required
      />

      <CCInputBirthDay name={[name, 'birth_day']} required inputReadOnly />

      <CCInput
        type="select"
        name={[name, 'gender']}
        label="Giới tính"
        options={SELECT.GENDER}
        placeholder="Bấm vào đây"
        required
      />

      <CCSelect.SelectPersonType name={[name, 'per_type']} label="Dân tộc" placeholder="Bấm vào đây" required />

      <CCInputTypeIdentify name={[name, 'doc_type']} required onChange={handleIdentifyChange} />

      <CCInputNumberIdentify indentifyType={docTypeWatch} name={[name, 'doc_code']} required />

      <CCInputDateProvideIdentify
        name={[name, 'doc_time_provide']}
        required
        inputReadOnly={false}
        indentifyType={docTypeWatch}
      />

      <CCInputOutdateIdentify name={[name, 'doc_outdate']} indentifyType={docTypeWatch} />

      <CCInputProviderIdentify name={[name, 'doc_place_provide']} required indentifyType={docTypeWatch} />

      <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')} className={styles.newLine}>
        <CCSelect.SelectProvince name={[name, 'current']} required />
      </Form.Item>

      <CCSelect.RadioAddress prevField={[name, 'current']} nextField={[name, 'contact']} bodyStyle={styles} required />
    </div>
  )
}

export default Personal
