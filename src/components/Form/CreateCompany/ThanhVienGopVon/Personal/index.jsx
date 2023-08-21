import CCInput from '@/components/CCInput'
import CCSelect from '@/components/CCSelect'
import { SELECT } from '@/constant/Common'
import { htmlContent, onSetFields } from '@/helper/Common'
import { Form, InputNumber } from 'antd'
import { forwardRef, useState } from 'react'
import CCInputBirthDay from '@/components/CCInputBirthDay'
import styles from './styles.module.scss'
import {
  CCInputTypeIdentify,
  CCInputNumberIdentify,
  CCInputDateProvideIdentify,
  CCInputOutdateIdentify,
  CCInputProviderIdentify,
} from '@/components/CCInputIdentify'

const Personal = forwardRef((props, ref) => {
  const { BASE_FORM, type } = props
  const formInstance = Form.useFormInstance()
  const doctypeWatch = Form.useWatch([...BASE_FORM, 'doc_type'], formInstance)

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
        onChange={(e) => onSetFields([...BASE_FORM, 'name'], e.target.value, ref, true)}
        required
      />

      <CCInputBirthDay name={[...BASE_FORM, 'birth_day']} required inputReadOnly />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'gender']}
        label="Giới tính"
        options={SELECT.GENDER}
        placeholder="Bấm vào đây"
        required
      />

      <CCSelect.SelectPersonType
        ref={ref}
        name={[...BASE_FORM, 'per_type']}
        label="Dân tộc"
        placeholder="Bấm vào đây"
        required
      />

      <CCInputTypeIdentify name={[...BASE_FORM, 'doc_type']} required />

      <CCInputNumberIdentify indentifyType={doctypeWatch} name={[...BASE_FORM, 'doc_code']} required />

      <CCInputDateProvideIdentify
        name={[...BASE_FORM, 'doc_time_provide']}
        required
        inputReadOnly={false}
        indentifyType={doctypeWatch}
      />

      <CCInputOutdateIdentify name={[...BASE_FORM, 'doc_outdate']} indentifyType={doctypeWatch} />

      <CCInputProviderIdentify name={[...BASE_FORM, 'doc_place_provide']} required indentifyType={doctypeWatch} />

      <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')} className={styles.newLine}>
        <CCSelect.SelectProvince name={[...BASE_FORM, 'current']} required />
      </Form.Item>

      <CCSelect.RadioAddress
        prevField={[...BASE_FORM, 'current']}
        nextField={[...BASE_FORM, 'contact']}
        ref={ref}
        bodyStyle={styles}
        required
      />
    </div>
  )
})

export default Personal
