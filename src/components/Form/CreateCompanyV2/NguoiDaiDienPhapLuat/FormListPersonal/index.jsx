import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { htmlContent, onSetFieldsWithInstance } from '@/helper/Common'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import { useEffect, useState } from 'react'
import CCSelect from '@/components/CCSelect'
import styles from '../../CreateCompany.module.scss'
import CCInputBirthDay from '../../../../CCInputBirthDay'
import {
  CCInputTypeIdentify,
  CCInputNumberIdentify,
  CCInputDateProvideIdentify,
  CCInputOutdateIdentify,
  CCInputProviderIdentify,
} from '@/components/CCInputIdentify'

const FormListPersonType = (props) => {
  const { i, presentState, listFormState, removeItem: removeItemProps } = props

  const { state: present, setState: setPresent } = presentState
  const [type, setType] = useState(null)

  const formInstance = Form.useFormInstance()

  const doctypeWatch = Form.useWatch([i, 'doc_type'], formInstance)

  const removeItem = async (index) => {
    const listLegalPersonal = JSON.parse(JSON.stringify(formInstance.getFieldsValue()))
    delete listLegalPersonal[index]
    let objPresent = [...present]
    objPresent[index] = null
    objPresent = [...objPresent.filter((item) => item !== null), null]
    setPresent(objPresent)

    formInstance.resetFields()

    removeItemProps()

    let latestIndex = 0
    for (let key in listLegalPersonal) {
      // formInstance.setFieldsValue({
      //   listLegalPersonal,
      // })
      console.log(listLegalPersonal)
      // formInstance.setFields([
      //   {
      //     name: latestIndex,
      //     value: listLegalPersonal[key],
      //   },
      // ])
      latestIndex++
    }

    // await new Promise((resolve) => setTimeout(resolve, 5000))

    // formInstance.setFieldsValue({
    //   listLegalPersonal,
    // })
  }

  useEffect(() => {
    let value = formInstance.getFieldsValue()
    setType(value?.category?.type)
  }, [props])

  const handleChangeInput = (e) => {
    onSetFieldsWithInstance([i, 'name'], e.target.value, formInstance, true)
  }

  console.log(formInstance.getFieldsValue())

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
            // style={{
            //   display: state.length > 1 ? 'block' : 'none',
            // }}
          />
        </div>
      }
    >
      <CCInput name={[i, 'name']} label="Họ và tên" onChange={handleChangeInput} required />

      <CCSelect.SelectTitle
        name={[i, 'title']}
        label="Chức danh"
        placeholder="Bấm vào đây"
        options={+type === 1 ? SELECT.TITLE_1TV : +type === 2 ? SELECT.TITLE_2TV : +type === 3 ? SELECT.TITLE_CP : ''}
        required
      />

      <div style={{ display: +present[i] != -1 ? 'none' : 'block' }}>
        <CCInput
          type="select"
          name={[i, 'gender']}
          label="Giới tính"
          options={SELECT.GENDER}
          placeholder="Bấm vào đây"
          required
        />

        <CCInputBirthDay name={[i, 'birth_day']} required inputReadOnly={false} />

        <CCSelect.SelectPersonType name={[i, 'per_type']} label="Dân tộc" required />

        <CCInputTypeIdentify name={[i, 'doc_type']} required />

        <CCInputNumberIdentify indentifyType={doctypeWatch} name={[i, 'doc_code']} required />

        <CCInputDateProvideIdentify
          name={[i, 'doc_time_provide']}
          required
          inputReadOnly={false}
          indentifyType={doctypeWatch}
        />

        <CCInputOutdateIdentify name={[i, 'doc_outdate']} indentifyType={doctypeWatch} />

        <CCInputProviderIdentify name={[i, 'doc_place_provide']} required indentifyType={doctypeWatch} />

        <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')}>
          <CCSelect.SelectProvince name={[i, 'current']} required />
        </Form.Item>

        <CCSelect.RadioAddress
          prevField={[i, 'current']}
          nextField={[i, 'contact']}
          label={'<b>Nơi ở hiện tại</b>'}
          required
        />
      </div>
    </Form.Item>
  )
}

export default FormListPersonType
