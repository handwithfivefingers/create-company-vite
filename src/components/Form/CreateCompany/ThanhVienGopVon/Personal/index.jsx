import CCInput from '@/components/CCInput'
import CCSelect from '@/components/CCSelect'
import { SELECT } from '@/constant/Common'
import { htmlContent, onSetFields } from '@/helper/Common'
import { Form, InputNumber } from 'antd'
import { forwardRef, useState } from 'react'
import CCInputBirthDay from '../../../../CCInputBirthDay'
import styles from './styles.module.scss'

const Personal = forwardRef((props, ref) => {
  const { BASE_FORM, type } = props

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

      <CCInput
        type="select"
        name={[...BASE_FORM, 'doc_type']}
        label="Loại giấy tờ"
        options={SELECT.DOC_TYPE}
        required
      />

      <CCInput
        label={'Số CMND / CCCD / Hộ chiếu'}
        name={[...BASE_FORM, 'doc_code']}
        placeholder="0010829446357"
        required
      />

      <CCInput
        type="date"
        name={[...BASE_FORM, 'doc_time_provide']}
        label="Ngày cấp"
        placeholder="15/01/1966 - ENTER"
        inputReadOnly={false}
        required
      />

      <CCSelect.SelectDocProvide
        ref={ref}
        name={[...BASE_FORM, 'doc_place_provide']}
        label="Nơi cấp"
        placeholder="Bấm vào đây"
        required
      />

      <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')} className={styles.newLine}>
        <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'current']} required />
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
