import { Form } from 'antd'
import CCSelect from '@/components/CCSelect'
import { htmlContent } from '@/helper/Common'
import clsx from 'clsx'
import { useEffect } from 'react'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import { useStepData } from '../../../../context/StepProgressContext'

const BASE_FORM = ['change_info', 'location']

const DiaChiTruSoChinh = (props) => {
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  const watchCity = Form.useWatch([...BASE_FORM, 'old', 'city'], formInstance)
  const watchDistrict = Form.useWatch([...BASE_FORM, 'old', 'district'], formInstance)
  const watchTown = Form.useWatch([...BASE_FORM, 'old', 'town'], formInstance)
  const watchAddress = Form.useWatch([...BASE_FORM, 'old', 'address'], formInstance)
  useEffect(() => {
    if (watchCity) formInstance.setFields([{ name: [...BASE_FORM, 'new_location', 'city'], value: watchCity }])
    if (watchDistrict)
      formInstance.setFields([{ name: [...BASE_FORM, 'new_location', 'district'], value: watchDistrict }])
    if (watchTown) formInstance.setFields([{ name: [...BASE_FORM, 'new_location', 'town'], value: watchTown }])
    if (watchAddress) formInstance.setFields([{ name: [...BASE_FORM, 'new_location', 'address'], value: watchAddress }])
  }, [watchCity, watchDistrict, watchTown, watchAddress])

  return (
    <Form.Item
      label={<h3>Đăng ký thay đổi địa chỉ trụ sở chính</h3>}
      className={clsx(styles.current, {
        [styles.active]: currentStep === props.index,
      })}
    >
      <Form.Item label={htmlContent('<b><u>ĐỊA CHỈ TRỤ SỞ HIỆN TẠI<u></b>')}>
        <CCSelect.SelectProvince
          label={'Địa chỉ trụ sở chính'}
          name={[...BASE_FORM, 'old']}
          placeholder="Địa chỉ trụ sở chính"
        />
      </Form.Item>

      <Form.Item label={htmlContent('<b><u>ĐỊA CHỈ TRỤ SỞ SAU KHI THAY ĐỔI</u></b>')}>
        <CCSelect.SelectProvince
          label={'Địa chỉ trụ sở chính'}
          name={[...BASE_FORM, 'new_location']}
          placeholder="Địa chỉ trụ sở chính"
        />
      </Form.Item>
    </Form.Item>
  )
}

export default DiaChiTruSoChinh
