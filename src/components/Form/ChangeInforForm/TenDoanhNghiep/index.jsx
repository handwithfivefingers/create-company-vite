import { Form, Card, Alert, Input } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
import CCInput from '@/components/CCInput'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import { htmlContent, onSetFields } from '@/helper/Common'
import ProductService from '@/service/UserService/ProductService'

const BASE_FORM = ['change_info', 'name']

const TenDoanhNghiep = forwardRef((props, ref) => {
  let timeout

  const [companyData, setCompanyData] = useState([])
  const [loading, setLoading] = useState(false)

  const inputChange = ({ value, pathName, search = false } = {}) => {
    onSetFields(pathName, value, ref, true)

    if (search) {
      console.log('call api')
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        getCompanyByName(value)
      }, 700)
    }
  }

  const getCompanyByName = async (val) => {
    if (val.length <= 4) {
      setCompanyData([])
      return
    }
    try {
      setLoading(true)
      let params = {
        q: val,
      }
      let res = await ProductService.checkCompany(params)
      let { data } = res.data
      setCompanyData(data)
    } catch (err) {
      console.log('getCompanyByName', err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form.Item
      label={<h3>Đăng ký thay đổi tên doanh nghiệp</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label={htmlContent('<b>Thay đổi tên công ty thành</b>')}>
        <Form.Item
          name={[...BASE_FORM, 'name_vi']}
          label="Tên công ty bằng Tiếng Việt"
          hasFeedback
          validateStatus={loading ? 'validating' : companyData.length > 0 ? 'error' : 'success'}
        >
          <Input
            size="small"
            onChange={(e) =>
              inputChange({
                value: e.target.value,
                pathName: [...BASE_FORM, 'name_vi'],
                search: true,
              })
            }
            rule
          />
        </Form.Item>

        <div className="" style={{ minHeight: 30 }}>
          {companyData && companyData?.length > 0 && (
            <Card size="small" title="Công ty đã đăng kí">
              {companyData?.map((item) => {
                return <Alert key={item} message={item} type="error" />
              })}
            </Card>
          )}
        </div>
        <CCInput
          label={htmlContent('Tên công ty bằng tiếng nước ngoài <i>(chỉ điền nếu có thay đổi)</i>')}
          name={[...BASE_FORM, 'name_en']}
          onChange={(e) => onSetFields([...BASE_FORM, 'name_en'], e.target.value, ref, true)}
        />
        <CCInput
          label={htmlContent('Tên công ty viết tắt <i>(chỉ điền nếu có thay đổi)</i>')}
          name={[...BASE_FORM, 'name_etc']}
          onChange={(e) => onSetFields([...BASE_FORM, 'name_etc'], e.target.value, ref, true)}
        />
      </Form.Item>
    </Form.Item>
  )
})

export default TenDoanhNghiep
