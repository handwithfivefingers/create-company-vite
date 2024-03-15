import CCInput from '@/components/CCInput'
import {
  CCInputDateProvideIdentify,
  CCInputNumberIdentify,
  CCInputProviderIdentify,
  CCInputTypeIdentify,
} from '@/components/CCInputIdentify'
import CCSelect from '@/components/CCSelect'
import { SELECT } from '@/constant/Common'
import { htmlContent, onSetFields } from '@/helper/Common'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import { forwardRef, useMemo } from 'react'
import CCInputBirthDay from '../../../../CCInputBirthDay'
import styles from '../../CreateCompany.module.scss'

const FormListPersonType = forwardRef((props, ref) => {
  const { i, presentState, listFormState, BASE_FORM, type } = props
  const { state, setState } = listFormState
  const { state: present, setState: setPresent } = presentState
  const formInstance = Form.useFormInstance()
  const doctypeWatch = Form.useWatch([...BASE_FORM, 'legal_respon', i, 'doc_type'], formInstance)

  const removeItem = (index) => {
    let val = formInstance.getFieldValue([...BASE_FORM, 'legal_respon'])

    val = [...val.slice(0, index), ...val.slice(index + 1)]

    let objPresent = [...present]

    objPresent[index] = null

    objPresent = [...objPresent.filter((item) => item !== null), null]

    setPresent(objPresent)

    onSetFields([...BASE_FORM, 'legal_respon'], val, { current: formInstance })

    setState(val)
  }

  const titleOptions = useMemo(() => {
    const result = []
    if (type == 1) {
      result.push(...SELECT.TITLE_1TV.concat({ name: 'Khác', value: 1 }))
    } else if (type == 2) {
      result.push(...SELECT.TITLE_2TV.concat({ name: 'Khác', value: 1 }))
    } else if (type == 3) {
      result.push(...SELECT.TITLE_CP.concat({ name: 'Khác', value: 1 }))
    }
    return result
  }, [type])

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

      {titleOptions ? (
        <CCSelect.SelectTitle
          name={[...BASE_FORM, 'legal_respon', i, 'title']}
          label="Chức danh"
          placeholder="Bấm vào đây"
          options={titleOptions}
          required
        />
      ) : (
        ''
      )}

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

        <CCSelect.SelectPersonType name={[...BASE_FORM, 'legal_respon', i, 'per_type']} label="Dân tộc" required />

        <CCInputTypeIdentify name={[...BASE_FORM, 'legal_respon', i, 'doc_type']} required />

        <CCInputNumberIdentify
          indentifyType={doctypeWatch}
          name={[...BASE_FORM, 'legal_respon', i, 'doc_code']}
          required
        />

        <CCInputDateProvideIdentify
          name={[...BASE_FORM, 'legal_respon', i, 'doc_time_provide']}
          required
          inputReadOnly={false}
          indentifyType={doctypeWatch}
        />

        {/* <CCInputOutdateIdentify name={[...BASE_FORM, 'legal_respon', i, 'doc_outdate']} indentifyType={doctypeWatch} /> */}

        <CCInputProviderIdentify
          name={[...BASE_FORM, 'legal_respon', i, 'doc_place_provide']}
          required
          indentifyType={doctypeWatch}
        />

        <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')}>
          <CCSelect.SelectProvince name={[...BASE_FORM, 'legal_respon', i, 'current']} required />
        </Form.Item>

        <CCSelect.RadioAddress
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
