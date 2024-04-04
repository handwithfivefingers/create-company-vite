import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { htmlContent, numToWord } from '@/helper/Common'
import { Col, Form, InputNumber, Row } from 'antd'
import clsx from 'clsx'
import { debounce } from 'lodash-es'
import React, { memo } from 'react'
import { useStepData } from '../../../../context/StepProgressContext'
import CCAddress from '../../../CCAddress'
import CCInputBirthDay from '../../../CCInputBirthDay'
import CCSelect from '../../../CCSelect'
import styles from '../DaiDienPhapLuat/styles.module.scss'
/**
 * @description Bên bán -> A
 * @description Bên mua -> B
 */
const BASE_FORM = ['change_info', 'transfer_contract']
const HopDongChuyenNhuong = (props) => {
  const { currentStep } = useStepData()

  const formInstance = Form.useFormInstance()
  const sohuuA = Form.useWatch([...BASE_FORM, 'A_side', 'owner'], formInstance)
  const sohuuB = Form.useWatch([...BASE_FORM, 'B_side', 'owner'], formInstance)

  const onInputChange = (e, pathName) => {
    let numInp = ref.current.getFieldValue([...pathName, 'num'])
    let targetInp = [...pathName, 'char']
    let transform = numToWord(numInp)
    let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)
    formInstance.setFieldValue(targetInp, upperLetter)
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
                    onChange={debounce((e) => onInputChange(e, [...fieldName, 'capital_current']), 500)}
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
                    onChange={debounce((e) => onInputChange(e, [...fieldName, 'capital_transfer']), 500)}
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

  return (
    <Form.Item
      label={<h3>Hợp đồng chuyển nhượng phần góp vốn</h3>}
      className={clsx(styles.current, {
        [styles.active]: currentStep === props.index,
      })}
    >
      <Form.Item label={htmlContent('<b>THÔNG TIN BÊN BÁN</b>')}>
        <CCInput
          type="select"
          label="Chủ sở hữu"
          name={[...BASE_FORM, 'A_side', 'owner']}
          options={SELECT.OWNER}
          placeholder="Bấm vào đây"
        />

        {sohuuA === 'personal' && <PersonalOwnerA fieldName={[...BASE_FORM, 'A_side']} />}

        {sohuuA === 'organization' && <OrganizationA fieldName={[...BASE_FORM, 'A_side']} />}
      </Form.Item>

      <Form.Item label={htmlContent('<b>THÔNG TIN BÊN MUA</b>')}>
        <CCInput
          type="select"
          label="Chủ sở hữu"
          name={[...BASE_FORM, 'B_side', 'owner']}
          options={SELECT.OWNER}
          placeholder="Bấm vào đây"
        />

        {sohuuB === 'personal' && <PersonalOwnerB fieldName={[...BASE_FORM, 'B_side']} />}

        {sohuuB === 'organization' && <OrganizationB fieldName={[...BASE_FORM, 'B_side']} />}
      </Form.Item>
    </Form.Item>
  )
}

const PersonalOwnerA = memo(({ fieldName }) => {
  const formInstance = Form.useFormInstance()
  return (
    <Row gutter={[12, 0]}>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'personal', 'name']}
          label="Họ và tên"
          placeholder="NGUYỄN VĂN A"
          onBlur={() =>
            formInstance.setFieldValue(
              [...fieldName, 'personal', 'name'],
              formInstance.getFieldValue([...fieldName, 'personal', 'name'])?.toUpperCase(),
            )
          }
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
          name={[...fieldName, 'personal', 'doc_place_provide']}
          label="Nơi cấp"
          placeholder="Bấm vào đây"
        />
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCAddress name={[...fieldName, 'personal']} />
      </Col>
    </Row>
  )
})

const OrganizationA = memo(({ fieldName }) => {
  const formInstance = Form.useFormInstance()
  return (
    <Row gutter={[12, 0]}>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'organization', 'company_name']}
          label="Tên doanh nghiệp"
          placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
          onBlur={() =>
            formInstance.setFieldValue(
              [...fieldName, 'organization', 'company_name'],
              formInstance.getFieldValue([...fieldName, 'organization', 'company_name'])?.toUpperCase(),
            )
          }
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
          onBlur={() =>
            formInstance.setFieldValue(
              [...fieldName, 'organization', 'legal_representative'],
              formInstance.getFieldValue([...fieldName, 'organization', 'legal_representative'])?.toUpperCase(),
            )
          }
        />
      </Col>
      <Col span={12}>
        <CCSelect.SelectTitle
          name={[...fieldName, 'organization', 'title']}
          label="Chức danh"
          placeholder="Bấm vào đây"
          options={SELECT.TITLE_2}
        />
      </Col>
    </Row>
  )
})

const PersonalOwnerB = memo(({ fieldName }) => {
  const formInstance = Form.useFormInstance()
  return (
    <Row gutter={[12, 0]}>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'personal', 'name']}
          label="Họ và tên"
          placeholder="NGUYỄN VĂN B"
          onBlur={() =>
            formInstance.setFieldValue(
              [...fieldName, 'personal', 'name'],
              formInstance.getFieldValue([...fieldName, 'personal', 'name'])?.toUpperCase(),
            )
          }
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
        <CCSelect.SelectPersonType name={[...fieldName, 'personal', 'per_type']} label="Dân tộc" />
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
        <CCAddress name={[...fieldName, 'personal']} />
      </Col>

      <Col span={24}>
        <FormType fieldName={[...fieldName, 'organization', 'capital_contribution']} />
      </Col>
    </Row>
  )
})

const OrganizationB = memo(({ fieldName }) => {
  const formInstance = Form.useFormInstance()
  return (
    <Row gutter={[12, 0]}>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          name={[...fieldName, 'organization', 'company_name']}
          label="Tên doanh nghiệp"
          onBlur={() =>
            formInstance.setFieldValue(
              [...fieldName, 'organization', 'company_name'],
              formInstance.getFieldValue([...fieldName, 'organization', 'company_name'])?.toUpperCase(),
            )
          }
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
          onBlur={() =>
            formInstance.setFieldValue(
              [...fieldName, 'organization', 'legal_representative'],
              formInstance.getFieldValue([...fieldName, 'organization', 'legal_representative'])?.toUpperCase(),
            )
          }
        />
      </Col>
      <Col span={12}>
        <CCSelect.SelectTitle
          name={[...fieldName, 'organization', 'legal_title']}
          label="Chức danh"
          placeholder="Bấm vào đây"
          options={SELECT.TITLE_2}
        />
      </Col>
      <Col span={24}>
        <FormType fieldName={[...fieldName, 'organization', 'capital_contribution']} />
      </Col>
    </Row>
  )
})

const FormType = ({ fieldName }) => {
  const formInstance = Form.useFormInstance()
  const onInputChange = (pathName) => {
    let numInp = formInstance.getFieldValue([...pathName, 'num'])
    let targetInp = [...pathName, 'char']
    let transform = numToWord(numInp)
    let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)
    formInstance.setFieldValue(targetInp, upperLetter)
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
                  onChange={debounce((e) => onInputChange([...fieldName, 'capital_current']), 1000)}
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
                  onChange={debounce((e) => onInputChange([...fieldName, 'capital_transfer']), 1000)}
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
