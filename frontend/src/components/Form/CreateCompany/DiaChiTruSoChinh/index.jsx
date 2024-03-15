import CCInput from '@/components/CCInput'
import { useStepData } from '@/context/StepProgressContext'
import { htmlContent } from '@/helper/Common'
import { Form } from 'antd'
import clsx from 'clsx'
import CCSelect from '../../../CCSelect'
import styles from '../CreateCompany.module.scss'

const DiaChiTruSoChinh = (props) => {
  const { BASE_FORM, current } = props
  const { currentStep } = useStepData()

  return (
    <Form.Item
      label={<h2>Địa chỉ đặt trụ sở</h2>}
      className={clsx([
        styles.hide,
        props.className,
        {
          [styles.visible]: currentStep === 5,
        },
      ])}
    >
      <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính<b>')}>
        <CCSelect.SelectProvince name={[...BASE_FORM, 'core', 'address']} label="Nơi cấp" required />
        <CCInput label="Số điện thoại liên hệ" name={[...BASE_FORM, 'core', 'contact', 'phone']} required />

        <CCInput type="email" label="Email liên hệ (nếu có)" name={[...BASE_FORM, 'core', 'contact', 'email']} />
      </Form.Item>
    </Form.Item>
  )
}

export default DiaChiTruSoChinh
