import React, { forwardRef, useState, useEffect, useRef } from 'react'
import { Form, Row, Col, InputNumber, Radio, Space } from 'antd'
import CCInput from '@/components/CCInput'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { SELECT } from '@/constant/Common'
import CCSelect from '../../../CCSelect'

const ThanhVienGopVon = forwardRef((props, ref) => {
  const [present, setPresent] = useState('')
  const { current, BASE_FORM } = props

  const [radio, setRadio] = useState(1)

  useEffect(() => {
    if (present === 'organization') {
      ref.current.setFields([
        {
          name: [
            'create_company',
            'approve',
            'origin_person',
            'company',
            'national',
          ],
          value: 'Việt Nam',
        },
      ])
    }
  }, [present])

  const onRadioChange = (e) => {
    setRadio(e.target.value)
    if (e.target.value === 1) {
      let field = [...BASE_FORM, 'origin_person', 'contact']
      let listField = ['address', 'town', 'district', 'city']
    }
  }
  const renderPresentPerson = () => {
    let xhtml = null

    if (present === 'personal') {
      xhtml = (
        <div className={styles.groupInput}>
          <CCInput
            name={[...BASE_FORM, 'origin_person', 'name']}
            label="Họ và Tên"
            placeholder="NGUYỄN VĂN A"
          />

          <CCInput
            type="date"
            name={[...BASE_FORM, 'origin_person', 'birth_day']}
            label="Ngày sinh"
            placeholder="Chọn ngày"
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, 'origin_person', 'gender']}
            label="Giới tính"
            options={SELECT.GENDER}
            placeholder="Bấm chọn"
          />

          {/* <CCInput name={[...BASE_FORM, 'origin_person', 'per_type']} label='Dân tộc' /> */}

          <CCSelect.SelectPersonType
            ref={ref}
            name={[...BASE_FORM, 'origin_person', 'per_type']}
            label="Dân tộc"
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, 'origin_person', 'doc_type']}
            label="Loại giấy tờ"
            defaultValue="Chứng minh nhân dân"
            options={SELECT.DOC_TYPE}
          />

          <CCInput
            label={'Số CMND/ CCCD/ Hộ chiếu'}
            name={[...BASE_FORM, 'origin_person', 'doc_code']}
            placeholder="0010829446357"
          />

          <CCInput
            type="date"
            name={[...BASE_FORM, 'origin_person', 'doc_time_provide']}
            label="Ngày cấp"
            placeholder="Chọn ngày"
          />

          {/* <CCInput name={[...BASE_FORM, 'origin_person', 'doc_place_provide']} label='Nơi cấp' /> */}

          <CCSelect.SelectDocProvide
            ref={ref}
            name={[...BASE_FORM, 'origin_person', 'doc_place_provide']}
            label="Nơi cấp"
          />

          <Form.Item label="Địa chỉ thường trú" className={styles.newLine}>
            {/* <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'origin_person', 'current']} /> */}

            <CCSelect.SelectCascader
              ref={ref}
              name={[...BASE_FORM, 'origin_person', 'current']}
            />
          </Form.Item>

          <Form.Item label="Địa chỉ liên lạc" className={styles.newLine}>
            <Radio.Group onChange={onRadioChange} value={radio}>
              <Space direction="vertical">
                <Radio value={1}>Giống với địa chỉ thường trú</Radio>
                <Radio value={2}>Khác</Radio>
              </Space>
            </Radio.Group>

            {radio === 2 && (
              <div style={{ padding: '8px 0' }}>
                <CCSelect.SelectProvince
                  ref={ref}
                  name={[...BASE_FORM, 'origin_person', 'contact']}
                  label="Nơi cấp"
                />
              </div>
            )}
          </Form.Item>
        </div>
      )
    } else if (present === 'organization') {
      xhtml = (
        <div className={styles.groupInput}>
          {/* START Nhập thông tin của tổ chức */}
          <CCInput
            label={'Tên tổ chức'}
            name={[...BASE_FORM, 'origin_person', 'organization_name']}
            placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
          />
          <CCInput
            label="Nhập mã số doanh nghiệp hoặc Mã số thuế"
            name={[...BASE_FORM, 'mst']}
            placeholder="0316184427"
          />
          <CCInput
            type="date"
            name={[...BASE_FORM, 'organization_name', 'doc_time_provide']}
            label={
              <div
                dangerouslySetInnerHTML={{
                  __html: '</>Ngày cấp <i>(ngày đăng ký lần đầu)</i></>',
                }}
              />
            }
            placeholder="Chọn ngày"
          />
          <CCInput
            name={[...BASE_FORM, 'organization_name', 'doc_place_provide']}
            label="Nơi cấp"
            placeholder="Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh – Phòng đăng ký kinh doanh"
          />

          <Form.Item label="Địa chỉ trụ sở chính" className={styles.newLine}>
            <CCSelect.SelectProvince
              ref={ref}
              name={[...BASE_FORM, 'organization_name', 'company']}
              label="Nơi cấp"
            />

            {/* END thông tin của tổ chức */}
          </Form.Item>

          {/* START Nhập thông tin của người ĐDPL (của tổ chức trên) */}
          <CCInput
            name={[...BASE_FORM, 'origin_person', 'name']}
            label={
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '</>Họ và Tên người đại diện theo pháp luật <i>(ĐDPL)</i></>',
                }}
              />
            }
            placeholder="NGUYỄN VĂN A"
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, 'origin_person', 'title']}
            label={
              <div
                dangerouslySetInnerHTML={{
                  __html: '</>Chức danh <i>(ĐDPL)</i></>',
                }}
              />
            }
            options={SELECT.TITLE_2}
          />

          <CCInput
            type="date"
            name={[...BASE_FORM, 'origin_person', 'birth_day']}
            label="Ngày sinh"
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, 'origin_person', 'gender']}
            label="Giới tính"
            options={SELECT.GENDER}
          />

          {/* <CCInput name={[...BASE_FORM, 'origin_person', 'per_type']} label='Dân tộc' /> */}

          <CCSelect.SelectPersonType
            ref={ref}
            name={[...BASE_FORM, 'origin_person', 'per_type']}
            label="Dân tộc"
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, 'origin_person', 'doc_type']}
            label="Loại giấy tờ"
            defaultValue="Chứng minh nhân dân"
            disabled
            defaultActiveFirstOption
            options={[
              {
                name: 'Chứng minh nhân dân',
                value: 'Chứng minh nhân dân',
              },
            ]}
          />

          <CCInput
            label={'Chứng minh nhân dân'}
            name={[...BASE_FORM, 'origin_person', 'doc_code']}
          />

          <CCInput
            type="date"
            name={[...BASE_FORM, 'origin_person', 'doc_time_provide']}
            label="Ngày cấp"
          />

          <CCSelect.SelectDocProvide
            ref={ref}
            name={[...BASE_FORM, 'origin_person', 'doc_place_provide']}
            label="Nơi cấp"
          />

          <Form.Item
            className={styles.newLine}
            // name={[...BASE_FORM, 'origin_person', 'title']}
            label={
              <div
                dangerouslySetInnerHTML={{
                  __html: '</>Địa chỉ thường trú <i>(ĐDPL)</i></>',
                }}
              />
            }
          >
            {/* <CCInput
							name={[...BASE_FORM, 'origin_person', 'company', 'address']}
							label='Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn'
						/>

						<CCInput name={[...BASE_FORM, 'origin_person', 'company', 'town']} label='Xã/Phường/Thị trấn' />

						<CCInput
							name={[...BASE_FORM, 'origin_person', 'company', 'district']}
							label='Quận/Huyện/Thị xã/Thành phố thuộc tỉnh'
						/>

						<CCInput name={[...BASE_FORM, 'origin_person', 'company', 'city']} label='Tỉnh/Thành phố' /> */}

            <CCSelect.SelectProvince
              ref={ref}
              name={[...BASE_FORM, 'origin_person', 'company']}
              label="Nơi cấp"
            />

            {/* <CCInput name={[...BASE_FORM, "origin_person", "company", "national"]} label="Quốc gia" /> */}
          </Form.Item>

          <Form.Item
            label={
              <div
                dangerouslySetInnerHTML={{
                  __html: '</>Địa chỉ liên lạc <i>(ĐDPL)</i></>',
                }}
              />
            }
            className={styles.newLine}
          >
            {/* <CCInput
							name={[...BASE_FORM, 'origin_person', 'contact', 'address']}
							label='Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn'
						/>

						<CCInput name={[...BASE_FORM, 'origin_person', 'company_town']} label='Xã/Phường/Thị trấn' />

						<CCInput
							name={[...BASE_FORM, 'origin_person', 'contact', 'district']}
							label='Quận/Huyện/Thị xã/Thành phố thuộc tỉnh'
						/>

						<CCInput name={[...BASE_FORM, 'origin_person', 'contact', 'city']} label='Tỉnh/Thành phố' /> */}

            <Radio.Group onChange={onRadioChange} value={radio}>
              <Space direction="vertical">
                <Radio value={1}>Giống với địa chỉ thường trú</Radio>
                <Radio value={2}>Khác</Radio>
              </Space>
            </Radio.Group>

            {radio === 2 && (
              <div style={{ padding: '8px 0' }}>
                <CCSelect.SelectProvince
                  ref={ref}
                  name={[...BASE_FORM, 'origin_person', 'contact']}
                  label="Nơi cấp"
                />
              </div>
            )}
          </Form.Item>
        </div>
      )
    }
    return xhtml
  }
  return (
    <Form.Item
      label={<h3>Thành viên góp vốn</h3>}
      className={clsx([
        styles.hide,
        {
          [styles.visible]: current === 2,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <CCInput
            type="select"
            name={[...BASE_FORM, 'present_person']}
            onSelect={(e) => setPresent(e)}
            // defaultValue="personal"
            defaultActiveFirstOption
            placeholder="Bấm vào đây"
            options={[
              { value: 'personal', name: 'Thành viên góp vốn là cá nhân' },
              { value: 'organization', name: 'Thành viên góp vốn là tổ chức' },
            ]}
          />
        </Col>
        <Col span={24}>{renderPresentPerson()}</Col>
      </Row>
    </Form.Item>
  )
})

export default ThanhVienGopVon
