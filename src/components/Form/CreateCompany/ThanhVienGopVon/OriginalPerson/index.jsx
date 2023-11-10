import CCInput from '@/components/CCInput'
import CCSelect from '@/components/CCSelect'
import { SELECT } from '@/constant/Common'
import { htmlContent, onSetFields } from '@/helper/Common'
import { Form, InputNumber } from 'antd'
import { forwardRef, useEffect } from 'react'
import styles from './styles.module.scss'
import CCInputBirthDay from '../../../../CCInputBirthDay'
import {
  CCInputTypeIdentify,
  CCInputNumberIdentify,
  CCInputDateProvideIdentify,
  CCInputOutdateIdentify,
  CCInputProviderIdentify,
} from '@/components/CCInputIdentify'
import { useLocation } from 'react-router-dom'

const OriginalPerson = forwardRef((props, ref) => {
  const { BASE_FORM, type } = props
  const formInstance = Form.useFormInstance()
  const doctypeWatch = Form.useWatch([...BASE_FORM, 'doc_type'], formInstance)
  const location = useLocation()
  useEffect(() => {
    const form = ref.current
    window.form = form
  }, [])

  return (
    <div className={styles.groupInput}>
      {/* START Nhập thông tin của tổ chức */}
      <CCInput.Select options={SELECT.PRESENT_CASE} name={[...BASE_FORM, 'present_case']} label="Trường hợp đại diện" />
      {type && type !== 1 && (
        <Form.Item name={[...BASE_FORM, 'capital']} label="Số tiền góp vốn" placeholder="Số tiền góp vốn" required>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      <CCInput
        label="Tên tổ chức"
        name={[...BASE_FORM, 'organization', 'name']}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        onChange={(e) => onSetFields([...BASE_FORM, 'organization', 'name'], e.target.value, ref, true)}
        required
      />
      <CCInput
        label="Mã số DN hoặc Mã số thuế"
        name={[...BASE_FORM, 'organization', 'mst']}
        placeholder="0316184427"
        required
      />
      <CCInput
        type="date"
        name={[...BASE_FORM, 'organization', 'doc_time_provide']}
        label={htmlContent('Ngày cấp <i>(ngày đăng ký lần đầu)</i>')}
        placeholder="15/01/1966 - ENTER"
        inputReadOnly={false}
        required
        message="Ngày cấp (ngày đăng ký lần đầu) là bắt buộc!"
      />

      <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')} className={styles.newLine}>
        <CCSelect.SelectProvince name={[...BASE_FORM, 'organization', 'doc_place_provide']} required />
      </Form.Item>

      <CCInput
        name={[...BASE_FORM, 'name']}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</>Họ và Tên đại diện pháp luật <i>(ĐDPL)</i></>',
            }}
          />
        }
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => onSetFields([...BASE_FORM, 'name'], e.target.value, ref, true)}
        required
        message="Họ và Tên đại diện pháp luật (ĐDPL) là bắt buộc!"
      />
      <CCSelect.SelectTitle
        name={[...BASE_FORM, 'title']}
        label={htmlContent('Chức danh <i>(ĐDPL)</i>')}
        placeholder="Bấm vào đây"
        options={SELECT.TITLE_2}
        required
        message="Chức danh (ĐDPL) là bắt buộc!"
      />

      <CCInputBirthDay name={[...BASE_FORM, 'birth_day']} inputReadOnly={false} required />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'gender']}
        label="Giới tính"
        options={SELECT.GENDER}
        placeholder="Bấm vào đây"
        required
      />

      <CCSelect.SelectPersonType
        name={[...BASE_FORM, 'per_type']}
        label="Dân tộc 2"
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

      {/* <CCInputOutdateIdentify name={[...BASE_FORM, 'doc_outdate']} indentifyType={doctypeWatch} /> */}

      <CCInputProviderIdentify name={[...BASE_FORM, 'doc_place_provide']} required indentifyType={doctypeWatch} />

      <Form.Item className={styles.newLine} label={htmlContent('<b>Địa chỉ thường trú <i>(ĐDPL)</i></b>')}>
        <CCSelect.SelectProvince name={[...BASE_FORM, 'current']} required />
      </Form.Item>

      <CCSelect.RadioAddress
        prevField={[...BASE_FORM, 'current']}
        nextField={[...BASE_FORM, 'contact']}
        bodyStyle={styles}
        required
      />
    </div>
  )
})

export default OriginalPerson
