import CCInput from '@/components/CCInput'
import { onSetFields } from '@/helper/Common'
import ProductService from '@/service/UserService/ProductService'
import { CaretRightOutlined } from '@ant-design/icons'
import { Alert, Card, Col, Collapse, Form, Input, Row } from 'antd'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import styles from '../CreateCompany.module.scss'
import { useStepData } from '@/context/StepProgressContext'

const popData = {
  content: (
    <ul style={{ maxWidth: 600, listStyle: 'none' }}>
      <li>1.Tên riêng trùng với tên riêng của doanh nghiệp đã đăng ký.</li>
      <li>
        2. Tên riêng chỉ khác với tên riêng của doanh nghiệp cùng loại đã đăng ký:
        <ol
          style={{
            listStyle: 'none',
          }}
        >
          <li>
            a. Bởi một số tự nhiên, một số thứ tự hoặc một chữ cái trong bảng chữ cái tiếng Việt, chữ F, J, Z, W được
            viết liền hoặc cách ngay sau tên riêng của doanh nghiệp đó;
          </li>
          <li>b. Bởi một ký hiệu “&” hoặc “và”, “.”, “,”, “+”, “-”, “_”;</li>
          <li>
            c. Bởi từ “tân” ngay trước hoặc từ “mới” được viết liền hoặc cách ngay sau hoặc trước tên riêng của doanh
            nghiệp đã đăng ký;
          </li>
          <li>d. Bởi một cụm từ “miền Bắc”, “miền Nam”, “miền Trung”, “miền Tây”, “miền Đông”;</li>
        </ol>
      </li>
      <li>
        3. Sử dụng tên cơ quan nhà nước, đơn vị lực lượng vũ trang nhân dân, tên của tổ chức chính trị, tổ chức chính
        trị - xã hội, tổ chức chính trị xã hội - nghề nghiệp, tổ chức xã hội, tổ chức xã hội - nghề nghiệp để làm toàn
        bộ hoặc một phần tên riêng của doanh nghiệp, trừ trường hợp có sự chấp thuận của cơ quan, đơn vị hoặc tổ chức
        đó.
      </li>
      <li>
        4. Sử dụng từ ngữ, ký hiệu vi phạm truyền thống lịch sử, văn hóa, đạo đức và thuần phong mỹ tục của dân tộc.
      </li>
    </ul>
  ),
  title: 'Quy tắc đặt tên công ty',
}

const TenCongTy = forwardRef((props, ref) => {
  const { currentStep } = useStepData()

  let timeout

  const { BASE_FORM} = props

  const [companyData, setCompanyData] = useState([])

  const [loading, setLoading] = useState(false)

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

  const inputChange = ({ value, pathName, search = false } = {}) => {
    onSetFields(pathName, value, ref, true)

    if (search) {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        getCompanyByName(value)
      }, 700)
    }
  }

  return (
    <Form.Item
      label={<h2>Tên công ty </h2>}
      className={clsx([
        styles.hide,
        props.className,
        {
          [styles.visible]: currentStep === 4,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Collapse
            bordered={false}
            defaultActiveKey={[]}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
            ghost
          >
            <Collapse.Panel header={popData.title} key="1" className="site-collapse-custom-panel">
              {popData.content}
            </Collapse.Panel>
          </Collapse>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            name={[...BASE_FORM, 'core', 'name']}
            label="Tên công ty bằng Tiếng Việt"
            hasFeedback
            validateStatus={loading ? 'validating' : companyData.length > 0 ? 'error' : 'success'}
            rules={[
              {
                required: true,
                message: 'Tên công ty là bắt buộc',
              },
            ]}
            required
          >
            <Input
              size="small"
              onChange={(e) =>
                inputChange({
                  value: e.target.value,
                  pathName: [...BASE_FORM, 'core', 'name'],
                  search: true,
                })
              }
              rule
            />
          </Form.Item>
          <div className="container" style={{ minHeight: 30 }}>
            {companyData && companyData?.length > 0 && (
              <Card size="small" title="Công ty đã đăng kí">
                {companyData?.map((item) => {
                  return <Alert key={item} message={item} type="error" />
                })}
              </Card>
            )}
          </div>

          <CCInput
            name={[...BASE_FORM, 'core', 'name_en']}
            label="Tên công ty bằng Tiếng Anh (nếu có)"
            onChange={(e) =>
              inputChange({
                value: e.target.value,
                pathName: [...BASE_FORM, 'core', 'name_en'],
              })
            }
          />

          <CCInput
            name={[...BASE_FORM, 'core', 'name_vn']}
            label="Tên công ty viết tắt (nếu có)"
            onChange={(e) =>
              inputChange({
                value: e.target.value,
                pathName: [...BASE_FORM, 'core', 'name_vn'],
              })
            }
          />
        </Col>
      </Row>
    </Form.Item>
  )
})

export default TenCongTy
