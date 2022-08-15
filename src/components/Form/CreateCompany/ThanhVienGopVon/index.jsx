import React, { forwardRef, useState, useEffect, useRef, useMemo } from 'react'
import { Form, Row, Col, InputNumber, Radio, Space } from 'antd'
import CCInput from '@/components/CCInput'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { SELECT } from '@/constant/Common'
import CCSelect from '../../../CCSelect'
import { onSetFields } from '@/helper/Common'

const ThanhVienGopVon = forwardRef((props, ref) => {
  const [present, setPresent] = useState('')
  const { current, BASE_FORM } = props

  const [radio, setRadio] = useState(null)
  useEffect(() => {
    onSetFields(
      [...BASE_FORM, 'origin_person', 'doc_type'],
      'Chứng minh nhân dân',
      ref,
    )
  }, [])

  useEffect(() => {
    if (present) {
      let pathName = [...BASE_FORM, 'origin_person', 'company', 'national']
      onSetFields(pathName, 'Việt Nam', ref)
    }
  }, [present])

  useEffect(() => {
    if (radio === 1) {
      let field = [...BASE_FORM, 'origin_person']
      let listField = ['address', 'town', 'district', 'city']

      listField.forEach((item) => {
        let path = [...field, 'current', item]
        let val = ref.current.getFieldValue(path)
        onSetFields(path, val, ref)
      })
    }
  }, [radio])

  const onRadioChange = (e) => {
    setRadio(e.target.value)
    if (e.target.value === 1) {
      let field = [...BASE_FORM, 'origin_person']
      let listField = ['address', 'town', 'district', 'city']

      listField.forEach((item) => {
        let val = ref.current.getFieldValue([...field, 'current', item])
        onSetFields([...field, 'contact', item], val, ref)
      })
    }
  }

  const renderPresentPerson = () => {
    let xhtml = null

    if (present === 'personal') {
      xhtml = (
        <Personal
          ref={ref}
          onRadioChange={onRadioChange}
          radio={radio}
          BASE_FORM={BASE_FORM}
          onSetFields={onSetFields}
        />
      )
    } else if (present === 'organization') {
      xhtml = (
        <OriginalPerson
          ref={ref}
          onRadioChange={onRadioChange}
          onSetFields={onSetFields}
          radio={radio}
          BASE_FORM={[...BASE_FORM, 'original_person']}
        />
      )
    }
    return xhtml
  }

  return (
    <Form.Item
      // label={<h3>Thành viên góp vốn</h3>}
      className={clsx([
        styles.hide,
        props.className,
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

const Personal = forwardRef((props, ref) => {
  const { BASE_FORM, onRadioChange, radio, onSetFields } = props

  return (
    <div className={styles.groupInput}>
      <CCInput
        name={[...BASE_FORM, 'name']}
        label="Họ và Tên"
        placeholder="NGUYỄN VĂN A"
        onChange={(e) =>
          onSetFields([...BASE_FORM, 'name'], e.target.value, ref, true)
        }
      />

      <CCInput
        type="date"
        name={[...BASE_FORM, 'birth_day']}
        label="Ngày sinh"
        placeholder="Chọn ngày"
      />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'gender']}
        label="Giới tính"
        options={SELECT.GENDER}
        placeholder="Bấm vào đây"
      />

      <CCSelect.SelectPersonType
        ref={ref}
        name={[...BASE_FORM, 'per_type']}
        label="Dân tộc"
        placeholder="Bấm vào đây"
      />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'doc_type']}
        label="Loại giấy tờ"
        // defaultValue="Chứng minh nhân dân"
        options={SELECT.DOC_TYPE}
      />

      <CCInput
        label={'Số CMND hoặc CCCD hoặc Hộ chiếu'}
        name={[...BASE_FORM, 'doc_code']}
        placeholder="0010829446357"
      />

      <CCInput
        type="date"
        name={[...BASE_FORM, 'doc_time_provide']}
        label="Ngày cấp"
        placeholder="Chọn ngày"
      />

      <CCSelect.SelectDocProvide
        ref={ref}
        name={[...BASE_FORM, 'doc_place_provide']}
        label="Nơi cấp"
        placeholder="Bấm vào đây"
      />

      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ thường trú</b></>',
            }}
          />
        }
        className={styles.newLine}
      >
        <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'current']} />
      </Form.Item>
      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ liên lạc</b></>',
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

        {
          <div
            style={{
              padding: '8px 0',
              opacity: radio && radio === 2 ? '1' : '0',
              visibility: radio && radio === 2 ? 'visible' : 'hidden',
              display: radio && radio === 2 ? 'block' : 'none',
            }}
          >
            <CCSelect.SelectProvince
              ref={ref}
              name={[...BASE_FORM, 'contact']}
              label="Nơi cấp"
            />
          </div>
        }
      </Form.Item>
    </div>
  )
})

const OriginalPerson = forwardRef((props, ref) => {
  const { BASE_FORM, onRadioChange, radio, onSetFields } = props

  return (
    <div className={styles.groupInput}>
      {/* START Nhập thông tin của tổ chức */}

      <CCInput
        label="Tên tổ chức"
        name={[...BASE_FORM, 'organization', 'name']}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        onChange={(e) =>
          onSetFields(
            [...BASE_FORM, 'organization', 'name'],
            e.target.value,
            ref,
            true,
          )
        }
      />
      <CCInput
        label="Nhập mã số doanh nghiệp hoặc Mã số thuế"
        name={[...BASE_FORM, 'organization', 'mst']}
        placeholder="0316184427"
      />
      <CCInput
        type="date"
        name={[...BASE_FORM, 'organization', 'doc_time_provide']}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: 'Ngày cấp <i>(ngày đăng ký lần đầu)</i>',
            }}
          />
        }
        placeholder="Chọn ngày"
      />

      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '<b>Địa chỉ trụ sở chính</b>',
            }}
          />
        }
        className={styles.newLine}
      >
        <CCSelect.SelectProvince
          ref={ref}
          name={[...BASE_FORM, 'organization', 'doc_place_provide']}
        />
      </Form.Item>

      <CCInput
        name={[...BASE_FORM, 'name']}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html:
                '</>Họ và Tên người đại diện theo pháp luật <i>(ĐDPL)</i></>',
            }}
          />
        }
        placeholder="NGUYỄN VĂN A"
        onChange={(e) =>
          onSetFields([...BASE_FORM, 'name'], e.target.value, ref, true)
        }
      />
      <CCSelect.SelectTitle
        ref={ref}
        name={[...BASE_FORM, 'title']}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</>Chức danh <i>(ĐDPL)</i></>',
            }}
          />
        }
        placeholder="Bấm vào đây"
        options={SELECT.TITLE_2}
      />

      <CCInput
        type="date"
        name={[...BASE_FORM, 'birth_day']}
        label="Ngày sinh"
        placeholder="Chọn ngày"
      />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'gender']}
        label="Giới tính"
        options={SELECT.GENDER}
        placeholder="Bấm vào đây"
      />

      <CCSelect.SelectPersonType
        ref={ref}
        name={[...BASE_FORM, 'per_type']}
        label="Dân tộc"
        placeholder="Bấm vào đây"
      />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'doc_type']}
        label="Loại giấy tờ"
        options={SELECT.DOC_TYPE}
      />

      <CCInput
        label={'Số CMND hoặc CCCD hoặc Hộ chiếu'}
        name={[...BASE_FORM, 'doc_code']}
      />

      <CCInput
        type="date"
        name={[...BASE_FORM, 'doc_time_provide']}
        label="Ngày cấp"
        placeholder="Chọn ngày"
      />

      <CCSelect.SelectDocProvide
        ref={ref}
        name={[...BASE_FORM, 'doc_place_provide']}
        label="Nơi cấp"
        placeholder="Bấm vào đây"
      />

      <Form.Item
        className={styles.newLine}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ thường trú <i>(ĐDPL)</i></b></>',
            }}
          />
        }
      >
        <CCSelect.SelectProvince
          ref={ref}
          name={[...BASE_FORM, 'origin_person', 'current']}
          label="Nơi đăng kí hộ khẩu thường trú"
        />
      </Form.Item>

      <Form.Item
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</><b>Địa chỉ liên lạc <i>(ĐDPL)</i><b></>',
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

        {
          <div
            style={{
              padding: '8px 0',
              opacity: radio && radio === 2 ? '1' : '0',
              visibility: radio && radio === 2 ? 'visible' : 'hidden',
              display: radio && radio === 2 ? 'block' : 'none',
            }}
          >
            <CCSelect.SelectProvince
              ref={ref}
              name={[...BASE_FORM, 'origin_person', 'contact']}
              label="Nơi ở hiện tại"
            />
          </div>
        }
      </Form.Item>
    </div>
  )
})
