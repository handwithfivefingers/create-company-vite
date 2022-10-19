import { Button, Col, Form, InputNumber, Row, Space } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useState, useMemo } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import CCAddress from '../../../CCAddress'
import { onSetFields, htmlContent, numToWord } from '@/helper/Common'
import CCSelect from '../../../CCSelect'
import CCListForm from '@/components/CCListForm'
/**
 * @description Bên bán -> A
 * @description Bên mua -> B
 */
const BASE_FORM = ['change_info', 'transfer_contract']
const HopDongChuyenNhuong = forwardRef((props, ref) => {
  const [sohuuA, setSohuuA] = useState()
  const [sohuuB, setSohuuB] = useState()
  const [type, setType] = useState('')

  let timer

  const onInputChange = (e, pathName) => {
    let numInp = ref.current.getFieldValue([...pathName, 'num'])
    let targetInp = [...pathName, 'char']

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      let transform = numToWord(numInp)

      let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)

      onSetFields(targetInp, upperLetter, ref)
    }, 1000)
  }

  const renderFormByType = useMemo(
    () => (fieldName) => {
      let xhtml = null

      xhtml = (
        <Row gutter={[4, 16]}>
          <Col span={12}>
            {/* <Form.Item label="Phần vốn góp Bên bán hiện đang sở hữu là"> */}
            <Form.Item label={htmlContent('<b>Phần vốn góp Bên bán hiện đang sở hữu là</b>')}>
              <Row gutter={[4, 16]}>
                <Col span={12}>
                  <Form.Item name={[...fieldName, 'capital_current', 'num']} label="Bằng số">
                    <InputNumber
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      style={{ width: '100%' }}
                      onChange={(e) => onInputChange(e, [...fieldName, 'capital_current'])}
                      stringMode
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <CCInput name={[...fieldName, 'capital_current', 'char']} placeholder="Bấm vào đây" label="Bằng chữ" />
                </Col>
                <Col span={12}>
                  <Form.Item label="Chiếm % vốn điều lệ" name={[...fieldName, 'capital_current', 'percent']}>
                    <InputNumber style={{ width: '100%' }} placeholder="Bấm vào đây" max={100} min={0} stringMode formatter={(v) => `${v.replace('%', '')}%`} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* <Form.Item label="Phần vốn góp Bên bán chuyển nhượng là"> */}
            <Form.Item label={htmlContent('<b>Phần vốn góp Bên bán chuyển nhượng là</b>')}>
              <Row gutter={[4, 16]}>
                <Col span={12}>
                  <Form.Item name={[...fieldName, 'capital_transfer', 'num']} label="Bằng số">
                    <InputNumber
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      style={{ width: '100%' }}
                      onChange={(e) => onInputChange(e, [...fieldName, 'capital_transfer'])}
                      stringMode
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <CCInput name={[...fieldName, 'capital_transfer', 'char']} placeholder="Bấm vào đây" label="Bằng chữ" />
                </Col>
                <Col span={12}>
                  <Form.Item label="Chiếm % vốn điều lệ" name={[...fieldName, 'capital_transfer', 'percent']}>
                    <InputNumber style={{ width: '100%' }} placeholder="Bấm vào đây" max={100} min={0} stringMode formatter={(v) => `${v.replace('%', '')}%`} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      )

      return xhtml
    },
    [],
  )

  const renderFormOnwerA = (condition, fieldName) => {
    let xhtml = null

    if (condition === 'personal') {
      xhtml = (
        <Row gutter={[12, 0]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              name={[...fieldName, 'personal', 'name']}
              label="Họ và tên"
              placeholder="NGUYỄN VĂN A"
              onChange={(e) => onSetFields([...fieldName, 'personal', 'name'], e.target.value, ref, true)}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput type="date" name={[...fieldName, 'personal', 'birth_day']} label="Ngày sinh" placeholder="Bấm chọn" />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              type="select"
              name={[...fieldName, 'personal', 'doc_type']}
              label="Loại giấy tờ pháp lý"
              options={SELECT.DOC_TYPE}
              placeholder="Bấm vào đây"
            />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, 'personal', 'doc_code']} label="Số giấy tờ pháp lý" />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput type="date" name={[...fieldName, 'personal', 'doc_time_provide']} label="Ngày cấp" placeholder="Bấm chọn" />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCSelect.SelectDocProvide ref={ref} name={[...fieldName, 'personal', 'doc_place_provide']} label="Nơi cấp" placeholder="Bấm vào đây" />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCSelect.SelectProvince ref={ref} name={[...fieldName, 'personal', 'address', 'contact']} />
          </Col>
        </Row>
      )
    } else {
      // Chủ sở hữu là tổ chức
      // Trường hợp chủ sở hữu là tổ chức:
      // Tên doanh nghiệp
      // Mã số doanh nghiệp
      // Địa chỉ trụ sở chính
      // Người đại diện theo pháp luật của công ty:
      // Chức danh:
      xhtml = (
        <Row gutter={[12, 0]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              name={[...fieldName, 'organization', 'company_name']}
              label="Tên doanh nghiệp"
              placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
              onChange={(e) => onSetFields([...fieldName, 'organization', 'company_name'], e.target.value, ref, true)}
            />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, 'organization', 'mst']} label="Mã số doanh nghiệp hoặc Mã số thuế" placeholder="0316184427" />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, 'organization', 'mst_provide']} label="Ngày cấp (ngày đăng ký lần đầu)" type="date" />
          </Col>

          <Col span={24}>
            <Form.Item label="Địa chỉ trụ sở chính">
              <CCSelect.SelectProvince ref={ref} name={[...fieldName, 'organization', 'company_address', 'current']} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <CCInput
              name={[...fieldName, 'organization', 'legal_representative']}
              // label="Họ và tên (người đại diện)"
              label={
                <div
                  dangerouslySetInnerHTML={{
                    __html: '</>Họ và tên <i>(Đại diện pháp luật)</i></>',
                  }}
                />
              }
              onChange={(e) => onSetFields([...fieldName, 'organization', 'legal_representative'], e.target.value, ref, true)}
            />
          </Col>
          <Col span={12}>
            <CCSelect.SelectTitle
              ref={ref}
              name={[...fieldName, 'organization', 'title']}
              label="Chức danh"
              placeholder="Bấm vào đây"
              options={SELECT.TITLE_2}
            />
          </Col>
        </Row>
      )
    }
    return xhtml
  }

  const renderFormOwnerB = (condition, fieldName) => {
    let xhtml = null

    if (condition === 'personal') {
      xhtml = // chủ sở hữu là cá nhân
        (
          <Row gutter={[12, 0]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput
                name={[...fieldName, 'personal', 'name']}
                label="Họ và tên"
                placeholder="NGUYỄN VĂN A"
                onChange={(e) => onSetFields([...fieldName, 'personal', 'name'], e.target.value, ref, true)}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, 'personal', 'gender']} label="Giới tính" type="select" options={SELECT.GENDER} placeholder="Bấm vào đây" />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, 'personal', 'birth_day']} label="Ngày sinh" type="date" placeholder="Bấm chọn" />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCSelect.SelectPersonType ref={ref} name={[...fieldName, 'personal', 'per_type']} label="Dân tộc" />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput
                type="select"
                name={[...fieldName, 'personal', 'doc_type']}
                label="Loại giấy tờ pháp lý"
                options={SELECT.DOC_TYPE}
                placeholder="Bấm vào đây"
              />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, 'personal', 'doc_code']} label="Số giấy tờ pháp lý" />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, 'personal', 'doc_time_provide']} label="Ngày cấp" type="date" placeholder="Bấm chọn" />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCSelect.SelectDocProvide ref={ref} name={[...fieldName, 'personal', 'doc_place_provide']} label="Nơi cấp" placeholder="Bấm vào đây" />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCAddress name={[...fieldName, 'personal']} ref={ref} />
            </Col>

            <Col span={24}>{renderFormByType([...fieldName, 'organization', 'capital_contribution'])}</Col>
          </Row>
        )
    } else {
      // Trường hợp chủ sở hữu là tổ chức:
      xhtml = (
        <Row gutter={[12, 0]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              name={[...fieldName, 'organization', 'company_name']}
              label="Tên doanh nghiệp"
              onChange={(e) => onSetFields([...fieldName, 'organization', 'company_name'], e.target.value, ref, true)}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, 'organization', 'mst']} label="Mã số doanh nghiệp" />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, 'organization', 'time_provide']} label="Ngày cấp" type="date" />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {/* <CCInput name={[...fieldName, 'organization', 'place_provide']} label="Nơi cấp" /> */}
            <CCSelect.SelectDocProvide ref={ref} name={[...fieldName, 'organization', 'place_provide']} label="Nơi cấp" placeholder="Bấm vào đây" />
          </Col>
          <Col span={24}>
            <Form.Item label="Địa chỉ trụ sở chính">
              <CCSelect.SelectProvince ref={ref} name={[...fieldName, 'organization', 'company_address', 'current']} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <CCInput type="select" name={[...fieldName, 'organization', 'company_model']} label="Mô hình công ty" options={SELECT.COMPANY_MODEL} />
          </Col>
          <Col span={12}>
            <CCInput
              name={[...fieldName, 'organization', 'legal_representative']}
              // label="Họ và tên (Đại diện pháp luật)"
              label={
                <div
                  dangerouslySetInnerHTML={{
                    __html: '</>Họ và tên <i>(Đại diện pháp luật)</i></>',
                  }}
                />
              }
              onChange={(e) => onSetFields([...fieldName, 'organization', 'legal_representative'], e.target.value, ref, true)}
            />
          </Col>
          <Col span={12}>
            <CCSelect.SelectTitle
              ref={ref}
              name={[...fieldName, 'organization', 'legal_title']}
              label="Chức danh"
              placeholder="Bấm vào đây"
              options={SELECT.TITLE_2}
            />
          </Col>
          <Col span={24}>{renderFormByType([...fieldName, 'organization', 'capital_contribution'])}</Col>
        </Row>
      )
    }

    return xhtml
  }

  return (
    <Form.Item
      label={<h3>Hợp đồng chuyển nhượng phần góp vốn</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label={htmlContent('<b>Thông tin bên bán</b>')}>
        <CCInput
          type="select"
          label="Chủ sở hữu"
          name={[...BASE_FORM, 'A_side', 'owner']}
          onChange={(e) => {
            setSohuuA(e)
            console.log(ref.current.getFieldsValue())
          }}
          options={SELECT.OWNER}
          placeholder="Bấm vào đây"
        />

        {sohuuA && renderFormOnwerA(sohuuA, [...BASE_FORM, 'A_side'])}
      </Form.Item>

      <Form.Item label={htmlContent('<b>Thông tin bên mua</b>')}>
        <CCInput
          type="select"
          label="Chủ sở hữu"
          name={[...BASE_FORM, 'B_side', 'owner']}
          onChange={(e) => setSohuuB(e)}
          options={SELECT.OWNER}
          placeholder="Bấm vào đây"
        />

        {sohuuB && renderFormOwnerB(sohuuB, [...BASE_FORM, 'B_side'])}
      </Form.Item>
    </Form.Item>
  )
})

export default HopDongChuyenNhuong
