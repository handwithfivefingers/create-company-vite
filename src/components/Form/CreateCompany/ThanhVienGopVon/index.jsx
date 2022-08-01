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

  const [radio, setRadio] = useState(null)

  useEffect(() => {
    if (present === 'organization') {
      let pathName = [...BASE_FORM, 'origin_person', 'company', 'national']
      onSetFields(pathName, 'Việt Nam')
    }
  }, [present])
  const onSetFields = (pathName, val, upper = false) => {
    ref.current.setFields([
      {
        name: pathName,
        value: upper ? val.toUpperCase() : val,
      },
    ])
  }
  // const setFields = (e, pathname) => {
  //   ref.current.setFields([
  //     {
  //       name: Array.isArray(pathname) ? [...pathname] : [pathname],
  //       value: e.target.value.toUpperCase(),
  //     },
  //   ]);
  // };

  const onRadioChange = (e) => {
    setRadio(e.target.value)
    if (e.target.value === 1) {
      let field = [...BASE_FORM, 'origin_person']
      let listField = ['address', 'town', 'district', 'city']

      listField.forEach((item) => {
        let val = ref.current.getFieldValue([...field, 'current', item])
        onSetFields([...field, 'contact', item], val)
      })
    }
    console.log(ref.current.getFieldsValue())
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
            onChange={(e) =>
              onSetFields(
                [...BASE_FORM, 'origin_person', 'name'],
                e.target.value,
                true,
              )
            }
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
            placeholder="Bấm vào đây"
          />

          <CCSelect.SelectPersonType
            ref={ref}
            name={[...BASE_FORM, 'origin_person', 'per_type']}
            label="Dân tộc"
            placeholder="Bấm vào đây"
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

          <CCSelect.SelectDocProvide
            ref={ref}
            name={[...BASE_FORM, 'origin_person', 'doc_place_provide']}
            label="Nơi cấp"
            placeholder="Bấm vào đây"
          />

          <Form.Item label="Địa chỉ thường trú" className={styles.newLine}>
            <CCSelect.SelectProvince
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
          {/* <CCInput
            name={[...BASE_FORM, 'organization_name', 'doc_place_provide']}
            label="Nơi cấp"
            placeholder="Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh – Phòng đăng ký kinh doanh"
          /> */}
           <CCSelect.SelectDocProvide
            ref={ref}
            name={[...BASE_FORM, 'organization_name', 'doc_place_provide']}
            label="Nơi cấp"
            placeholder="Bấm vào đây"
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
          <CCSelect.SelectTitle
            ref={ref}
            name={[...BASE_FORM, 'origin_person', 'title']}
            label={
              <div
                dangerouslySetInnerHTML={{
                  __html: '</>Chức danh <i>(ĐDPL)</i></>',
                }}
              />
            }
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
            placeholder="Bấm vào đây"
          />

          {/* <CCInput name={[...BASE_FORM, 'origin_person', 'per_type']} label='Dân tộc' /> */}

          <CCSelect.SelectPersonType
            ref={ref}
            name={[...BASE_FORM, 'origin_person', 'per_type']}
            label="Dân tộc"
            placeholder="Bấm vào đây"
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
            placeholder="Chọn ngày"
          />

          <CCSelect.SelectDocProvide
            ref={ref}
            name={[...BASE_FORM, 'origin_person', 'doc_place_provide']}
            label="Nơi cấp"
            placeholder="Bấm vào đây"
          />

          <Form.Item
            className={styles.newLine}
            label={
              <div
                dangerouslySetInnerHTML={{
                  __html: '</>Địa chỉ thường trú <i>(ĐDPL)</i></>',
                }}
              />
            }
          >
            <CCSelect.SelectProvince
              ref={ref}
              name={[...BASE_FORM, 'origin_person', 'company']}
              label="Nơi cấp"
            />
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
