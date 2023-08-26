import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { htmlContent, numToWord, onSetFields } from '@/helper/Common'
import { Col, Form, InputNumber, Row } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState, memo } from 'react'
import { useLocation } from 'react-router-dom'
import CCAddress from '../../../CCAddress'
import CCSelect from '../../../CCSelect'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import CCInputBirthDay from '../../../CCInputBirthDay'
/**
 * @description Bên bán -> A
 * @description Bên mua -> B
 */
const BASE_FORM = ['change_info', 'transfer_contract']
const HopDongChuyenNhuong = forwardRef((props, ref) => {
  const [sohuuA, setSohuuA] = useState()
  const [sohuuB, setSohuuB] = useState()

  const [type, setType] = useState('')
  const location = useLocation()

  let timer

  useEffect(() => {
    if (location.state) {
      let { state } = location

      let value = ref.current.getFieldValue(BASE_FORM)
      // console.log(value)
      let { A_side, B_side } = value
      if (A_side) {
        setSohuuA(A_side?.owner)
      }
      if (B_side) {
        setSohuuB(B_side?.owner)
      }
    }
  }, [location])

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

  const renderFormByType = (fieldName) => {
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
                <CCInput name={[...fieldName, 'capital_current', 'char']} label="Bằng chữ" />
              </Col>
              <Col span={12}>
                <Form.Item label="Chiếm % vốn điều lệ" name={[...fieldName, 'capital_current', 'percent']}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Bấm vào đây"
                    max={100}
                    min={0}
                    stringMode
                    formatter={(v) => `${v.replace('%', '')}%`}
                  />
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
                <CCInput name={[...fieldName, 'capital_transfer', 'char']} label="Bằng chữ" />
              </Col>
              <Col span={12}>
                <Form.Item label="Chiếm % vốn điều lệ" name={[...fieldName, 'capital_transfer', 'percent']}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Bấm vào đây"
                    max={100}
                    min={0}
                    stringMode
                    formatter={(v) => `${v.replace('%', '')}%`}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    )

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
                placeholder="NGUYỄN VĂN B"
                onChange={(e) => onSetFields([...fieldName, 'personal', 'name'], e.target.value, ref, true)}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput
                name={[...fieldName, 'personal', 'gender']}
                label="Giới tính"
                type="select"
                options={SELECT.GENDER}
                placeholder="Bấm vào đây"
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInputBirthDay name={[...fieldName, 'personal', 'birth_day']} />
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
              <CCInput
                name={[...fieldName, 'personal', 'doc_time_provide']}
                label="Ngày cấp"
                type="date"
                placeholder="15/01/2015 - ENTER"
              />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCSelect.SelectDocProvide
                ref={ref}
                name={[...fieldName, 'personal', 'doc_place_provide']}
                label="Nơi cấp"
                placeholder="Bấm vào đây"
              />
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
            <CCInput
              name={[...fieldName, 'organization', 'time_provide']}
              label="Ngày cấp"
              type="date"
              placeholder="15/01/2015 - ENTER"
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCSelect.SelectDocProvide
              ref={ref}
              name={[...fieldName, 'organization', 'place_provide']}
              label="Nơi cấp"
              placeholder="Bấm vào đây"
            />
          </Col>
          <Col span={24}>
            <Form.Item label="Địa chỉ trụ sở chính">
              <CCSelect.SelectProvince name={[...fieldName, 'organization', 'company_address', 'current']} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <CCInput
              type="select"
              name={[...fieldName, 'organization', 'company_model']}
              label="Mô hình công ty"
              options={SELECT.COMPANY_MODEL}
            />
          </Col>
          <Col span={12}>
            <CCInput
              name={[...fieldName, 'organization', 'legal_representative']}
              label={htmlContent('Họ và tên <i>(Đại diện pháp luật)</i>')}
              onChange={(e) =>
                onSetFields([...fieldName, 'organization', 'legal_representative'], e.target.value, ref, true)
              }
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
      <Form.Item label={htmlContent('<b>THÔNG TIN BÊN BÁN</b>')}>
        <CCInput
          type="select"
          label="Chủ sở hữu"
          name={[...BASE_FORM, 'A_side', 'owner']}
          onChange={(e) => setSohuuA(e)}
          options={SELECT.OWNER}
          placeholder="Bấm vào đây"
        />

        {sohuuA === 'personal' && <PersonalOwnerA fieldName={[...BASE_FORM, 'A_side']} forwardRef={ref} />}

        {sohuuA === 'organization' && <OrganizationA fieldName={[...BASE_FORM, 'A_side']} forwardRef={ref} />}

        {/* {sohuuA && renderFormOnwerA(sohuuA, [...BASE_FORM, 'A_side'])} */}
      </Form.Item>

      <Form.Item label={htmlContent('<b>THÔNG TIN BÊN MUA</b>')}>
        <CCInput
          type="select"
          label="Chủ sở hữu"
          name={[...BASE_FORM, 'B_side', 'owner']}
          onChange={(e) => setSohuuB(e)}
          options={SELECT.OWNER}
          placeholder="Bấm vào đây"
        />

        {sohuuB === 'personal' && <PersonalOwnerB fieldName={[...BASE_FORM, 'B_side']} forwardRef={ref} />}

        {sohuuB === 'organization' && <OrganizationB fieldName={[...BASE_FORM, 'B_side']} forwardRef={ref} />}

        {/* {sohuuB && renderFormOwnerB(sohuuB, [...BASE_FORM, 'B_side'])} */}
      </Form.Item>
    </Form.Item>
  )
})

const PersonalOwnerA = memo(({ fieldName, forwardRef }) => {
  const formInstance = Form.useFormInstance()
  const setFields = (pathName, value, uppercase = false) => {
    formInstance.setFields([
      {
        name: pathName,
        value: (uppercase && value.toUpperCase()) || value,
      },
    ])
  }
  return (
    <Row gutter={[12, 0]}>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'personal', 'name']}
          label="Họ và tên"
          placeholder="NGUYỄN VĂN A"
          onChange={(e) => setFields([...fieldName, 'personal', 'name'], e.target.value, true)}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInputBirthDay name={[...fieldName, 'personal', 'birth_day']} />
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          type="select"
          name={[...fieldName, 'personal', 'gender']}
          label="Giới tính"
          options={SELECT.GENDER}
          placeholder="Bấm vào đây"
          required
        />
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
        <CCInput
          type="date"
          name={[...fieldName, 'personal', 'doc_time_provide']}
          label="Ngày cấp"
          placeholder="15/01/2015 - ENTER"
        />
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCSelect.SelectDocProvide
          forwardRef={forwardRef}
          name={[...fieldName, 'personal', 'doc_place_provide']}
          label="Nơi cấp"
          placeholder="Bấm vào đây"
        />
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCAddress name={[...fieldName, 'personal']} ref={forwardRef} />
      </Col>
    </Row>
  )
})

const OrganizationA = memo(({ fieldName, forwardRef }) => {
  const formInstance = Form.useFormInstance()
  const setFields = (pathName, value, uppercase = false) => {
    formInstance.setFields([
      {
        name: pathName,
        value: (uppercase && value.toUpperCase()) || value,
      },
    ])
  }
  return (
    <Row gutter={[12, 0]}>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'organization', 'company_name']}
          label="Tên doanh nghiệp"
          placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
          onChange={(e) => setFields([...fieldName, 'organization', 'company_name'], e.target.value, true)}
        />
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'organization', 'mst']}
          label="Mã số doanh nghiệp hoặc Mã số thuế"
          placeholder="0316184427"
        />
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'organization', 'mst_provide']}
          label="Ngày cấp (ngày đăng ký lần đầu)"
          type="date"
          placeholder="15/01/2015 - ENTER"
        />
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCSelect.SelectDocProvide
          name={[...fieldName, 'organization', 'place_provide']}
          label="Nơi cấp"
          placeholder="Bấm vào đây"
        />
      </Col>

      <Col span={24}>
        <Form.Item label="Địa chỉ trụ sở chính">
          <CCSelect.SelectProvince name={[...fieldName, 'organization', 'company_address', 'current']} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <CCInput
          name={[...fieldName, 'organization', 'legal_representative']}
          label={htmlContent('Họ và tên <i>(Đại diện pháp luật)</i>')}
          onChange={(e) => setFields([...fieldName, 'organization', 'legal_representative'], e.target.value, true)}
        />
      </Col>
      <Col span={12}>
        <CCSelect.SelectTitle
          ref={forwardRef}
          name={[...fieldName, 'organization', 'title']}
          label="Chức danh"
          placeholder="Bấm vào đây"
          options={SELECT.TITLE_2}
        />
      </Col>
    </Row>
  )
})

const PersonalOwnerB = memo(({ fieldName, forwardRef }) => {
  const formInstance = Form.useFormInstance()
  const setFields = (pathName, value, uppercase = false) => {
    formInstance.setFields([
      {
        name: pathName,
        value: (uppercase && value.toUpperCase()) || value,
      },
    ])
  }
  return (
    <Row gutter={[12, 0]}>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'personal', 'name']}
          label="Họ và tên"
          placeholder="NGUYỄN VĂN B"
          onChange={(e) => setFields([...fieldName, 'personal', 'name'], e.target.value, true)}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'personal', 'gender']}
          label="Giới tính"
          type="select"
          options={SELECT.GENDER}
          placeholder="Bấm vào đây"
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInputBirthDay name={[...fieldName, 'personal', 'birth_day']} />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCSelect.SelectPersonType ref={forwardRef} name={[...fieldName, 'personal', 'per_type']} label="Dân tộc" />
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
        <CCInput
          name={[...fieldName, 'personal', 'doc_time_provide']}
          label="Ngày cấp"
          type="date"
          placeholder="15/01/2015 - ENTER"
        />
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCSelect.SelectDocProvide
          name={[...fieldName, 'personal', 'doc_place_provide']}
          label="Nơi cấp"
          placeholder="Bấm vào đây"
        />
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCAddress name={[...fieldName, 'personal']} ref={forwardRef} />
      </Col>

      <Col span={24}>
        <FormType fieldName={[...fieldName, 'organization', 'capital_contribution']} />
      </Col>
    </Row>
  )
})

const OrganizationB = memo(({ fieldName, forwardRef }) => {
  const formInstance = Form.useFormInstance()
  const setFields = (pathName, value, uppercase = false) => {
    formInstance.setFields([
      {
        name: pathName,
        value: (uppercase && value.toUpperCase()) || value,
      },
    ])
  }
  return (
    <Row gutter={[12, 0]}>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'organization', 'company_name']}
          label="Tên doanh nghiệp"
          onChange={(e) => setFields([...fieldName, 'organization', 'company_name'], e.target.value, true)}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput name={[...fieldName, 'organization', 'mst']} label="Mã số doanh nghiệp" />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'organization', 'time_provide']}
          label="Ngày cấp"
          type="date"
          placeholder="15/01/2015 - ENTER"
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCSelect.SelectDocProvide
          name={[...fieldName, 'organization', 'place_provide']}
          label="Nơi cấp"
          placeholder="Bấm vào đây"
        />
      </Col>
      <Col span={24}>
        <Form.Item label="Địa chỉ trụ sở chính">
          <CCSelect.SelectProvince name={[...fieldName, 'organization', 'company_address', 'current']} />
        </Form.Item>
      </Col>

      <Col span={24}>
        <CCInput
          type="select"
          name={[...fieldName, 'organization', 'company_model']}
          label="Mô hình công ty"
          options={SELECT.COMPANY_MODEL}
        />
      </Col>
      <Col span={12}>
        <CCInput
          name={[...fieldName, 'organization', 'legal_representative']}
          label={htmlContent('Họ và tên <i>(Đại diện pháp luật)</i>')}
          onChange={(e) => setFields([...fieldName, 'organization', 'legal_representative'], e.target.value, true)}
        />
      </Col>
      <Col span={12}>
        <CCSelect.SelectTitle
          ref={forwardRef}
          name={[...fieldName, 'organization', 'legal_title']}
          label="Chức danh"
          placeholder="Bấm vào đây"
          options={SELECT.TITLE_2}
        />
      </Col>
      <Col span={24}>
        <FormType fieldName={[...fieldName, 'organization', 'capital_contribution']} />
        {/* {renderFormByType([...fieldName, 'organization', 'capital_contribution'])} */}
      </Col>
    </Row>
  )
})

const FormType = ({ fieldName }) => {
  const formInstance = Form.useFormInstance()

  const setFields = (pathName, value, uppercase = false) => {
    formInstance.setFields([
      {
        name: pathName,
        value: (uppercase && value.toUpperCase()) || value,
      },
    ])
  }

  const onInputChange = (pathName) => {
    let numInp = formInstance.getFieldValue([...pathName, 'num'])
    let targetInp = [...pathName, 'char']
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      let transform = numToWord(numInp)
      let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)
      setFields(targetInp, upperLetter)
    }, 1000)
  }

  return (
    <Row gutter={[4, 16]}>
      <Col span={12}>
        <Form.Item label={htmlContent('<b>Phần vốn góp Bên bán hiện đang sở hữu là</b>')}>
          <Row gutter={[4, 16]}>
            <Col span={12}>
              <Form.Item name={[...fieldName, 'capital_current', 'num']} label="Bằng số">
                <InputNumber
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  style={{ width: '100%' }}
                  onChange={(e) => onInputChange([...fieldName, 'capital_current'])}
                  stringMode
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <CCInput name={[...fieldName, 'capital_current', 'char']} label="Bằng chữ" />
            </Col>
            <Col span={12}>
              <Form.Item label="Chiếm % vốn điều lệ" name={[...fieldName, 'capital_current', 'percent']}>
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Bấm vào đây"
                  max={100}
                  min={0}
                  stringMode
                  formatter={(v) => `${v.replace('%', '')}%`}
                />
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
                  onChange={(e) => onInputChange([...fieldName, 'capital_transfer'])}
                  stringMode
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <CCInput name={[...fieldName, 'capital_transfer', 'char']} label="Bằng chữ" />
            </Col>
            <Col span={12}>
              <Form.Item label="Chiếm % vốn điều lệ" name={[...fieldName, 'capital_transfer', 'percent']}>
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Bấm vào đây"
                  max={100}
                  min={0}
                  stringMode
                  formatter={(v) => `${v.replace('%', '')}%`}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Col>
    </Row>
  )
}
export default HopDongChuyenNhuong
