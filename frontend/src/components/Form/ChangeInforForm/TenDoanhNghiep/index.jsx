import { Form, Card, Alert, Input, Collapse, Row, Col } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
import CCInput from '@/components/CCInput'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import { htmlContent, onSetFields } from '@/helper/Common'
import ProductService from '@/service/UserService/ProductService'
import { CaretRightOutlined } from '@ant-design/icons'

const BASE_FORM = ['change_info', 'name']

const popData = {
  content: (
    <ul style={{ maxWidth: 600, listStyle: 'none' }}>
      <h4>
        <b>Cách đặt tên công ty</b>
      </h4>
      <li>
        Tên công ty bao gồm hai thành tố “Loại hình công ty” và “tên riêng” cấu thành theo thứ tự sau: Loại hình công ty
        + Tên riêng.
      </li>
      <li>
        Ví dụ:
        <ol>- Tên tiếng Việt: CÔNG TY TNHH FAMILY HOME;</ol>
        <ol> - Tên tiếng Anh: FAMILY HOME COMPANY LIMITED;</ol>
        <ol> - Tên viết tắt: FAMILY HOME CO.,LTD.</ol>
      </li>
      <h4>
        <b>4 điều cấm trong đặt tên công ty</b>
      </h4>
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

const TenDoanhNghiep = forwardRef((props, ref) => {
  let timeout

  const [companyData, setCompanyData] = useState([])
  const [loading, setLoading] = useState(false)

  const inputChange = ({ value, pathName, search = false } = {}) => {
    onSetFields(pathName, value, ref, true)

    if (search) {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        getCompanyByName(value)
      }, 500)
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
      <Form.Item label={htmlContent('<b>THAY ĐỔI TÊN DOANH NGHIỆP THÀNH</b>')}>
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name={[...BASE_FORM, 'name_vi']}
              label="Tên công ty bằng Tiếng Việt"
              hasFeedback
              validateStatus={loading ? 'validating' : companyData.length > 0 ? 'error' : 'success'}
              required
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên công ty',
                },
              ]}
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
          </Col>
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
        </Row>
      </Form.Item>
    </Form.Item>
  )
})

export default TenDoanhNghiep
