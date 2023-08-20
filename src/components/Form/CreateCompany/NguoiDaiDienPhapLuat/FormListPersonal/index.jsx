import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { htmlContent, onSetFields } from '@/helper/Common'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import { forwardRef, useEffect, useState } from 'react'
import CCSelect from '@/components/CCSelect'
import styles from '../../CreateCompany.module.scss'
import CCInputBirthDay from '../../../../CCInputBirthDay'

const FormListPersonType = forwardRef((props, ref) => {
  const { i, presentState, listFormState, BASE_FORM } = props

  const { state, setState } = listFormState

  const { state: present, setState: setPresent } = presentState
  const [type, setType] = useState(null)

  const removeItem = (index) => {
    let val = ref.current.getFieldValue([...BASE_FORM, 'legal_respon'])

    val = [...val.slice(0, index), ...val.slice(index + 1)]

    let objPresent = [...present]

    objPresent[index] = null

    objPresent = [...objPresent.filter((item) => item !== null), null]

    setPresent(objPresent)

    onSetFields([...BASE_FORM, 'legal_respon'], val, ref)

    setState(val)
  }

  useEffect(() => {
    let value = ref.current.getFieldsValue()
    setType(value?.category?.type)
  }, [props])

  return (
    <Form.Item
      label={
        <div className={styles.label}>
          <div className={styles.title}>Thông tin người đại diện thứ {i + 1}</div>
          <Button
            type="text"
            shape="circle"
            danger
            icon={<MinusCircleOutlined onClick={() => removeItem(i)} />}
            style={{
              display: state.length > 1 ? 'block' : 'none',
            }}
          />
        </div>
      }
    >
      <CCInput
        name={[...BASE_FORM, 'legal_respon', i, 'name']}
        label="Họ và tên"
        onChange={(e) => onSetFields([...BASE_FORM, 'legal_respon', i, 'name'], e.target.value, ref, true)}
        required
      />

      <CCSelect.SelectTitle
        name={[...BASE_FORM, 'legal_respon', i, 'title']}
        label="Chức danh"
        placeholder="Bấm vào đây"
        options={+type === 1 ? SELECT.TITLE_1TV : +type === 2 ? SELECT.TITLE_2TV : +type === 3 ? SELECT.TITLE_CP : ''}
        ref={ref}
        required
      />

      <div style={{ display: +present[i] != -1 ? 'none' : 'block' }}>
        <CCInput
          type="select"
          name={[...BASE_FORM, 'legal_respon', i, 'gender']}
          label="Giới tính"
          options={SELECT.GENDER}
          placeholder="Bấm vào đây"
          required
        />

        <CCInputBirthDay name={[...BASE_FORM, 'legal_respon', i, 'birth_day']} required inputReadOnly={false} />

        <CCSelect.SelectPersonType
          name={[...BASE_FORM, 'legal_respon', i, 'per_type']}
          label="Dân tộc"
          ref={ref}
          required
        />

        <CCInput
          type="select"
          name={[...BASE_FORM, 'legal_respon', i, 'doc_type']}
          label="Loại giấy tờ"
          options={SELECT.DOC_TYPE}
          placeholder="Bấm vào đây"
          required
        />

        <CCInput
          name={[...BASE_FORM, 'legal_respon', i, 'doc_code']}
          label="Số CMND / CCCD / Hộ chiếu"
          placeholder="0316184427"
          required
        />

        <CCInput
          type="date"
          name={[...BASE_FORM, 'legal_respon', i, 'doc_time_provide']}
          label="Ngày cấp"
          placeholder="15/01/1966 - ENTER"
          inputReadOnly={false}
          required
        />

        <CCSelect.SelectDocProvide
          name={[...BASE_FORM, 'legal_respon', i, 'doc_place_provide']}
          label="Nơi cấp"
          ref={ref}
          required
        />

        <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')}>
          <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'legal_respon', i, 'current']} required />
        </Form.Item>

        <CCSelect.RadioAddress
          ref={ref}
          prevField={[...BASE_FORM, 'legal_respon', i, 'current']}
          nextField={[...BASE_FORM, 'legal_respon', i, 'contact']}
          label={'<b>Nơi ở hiện tại</b>'}
          required
        />
      </div>
    </Form.Item>
  )
})

export default FormListPersonType
