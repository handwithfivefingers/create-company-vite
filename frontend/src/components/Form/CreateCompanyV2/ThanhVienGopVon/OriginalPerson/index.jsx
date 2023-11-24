import CCInput from '@/components/CCInput'
import CCSelect from '@/components/CCSelect'
import { SELECT } from '@/constant/Common'
import { htmlContent, onSetFields } from '@/helper/Common'
import { Form, InputNumber, Radio, Space } from 'antd'
import { forwardRef, useState } from 'react'
import styles from './styles.module.scss'
import CCInputBirthDay from '../../../../CCInputBirthDay'
import {
  CCInputTypeIdentify,
  CCInputNumberIdentify,
  CCInputDateProvideIdentify,
  CCInputOutdateIdentify,
  CCInputProviderIdentify,
} from '@/components/CCInputIdentify'

const OriginalPerson = ({ name, type, docTypeWatch, handleFieldChange }) => {
  return (
    <div className={styles.groupInput}>
      {/* START Nhập thông tin của tổ chức */}
      {type && type !== 1 && (
        <Form.Item
          name={[name, 'capital']}
          label="Số tiền góp vốn"
          placeholder="Số tiền góp vốn"
          // required
        >
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      <CCInput
        label="Tên tổ chức"
        name={[name, 'organization', 'name']}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        onChange={({ target }) =>
          handleFieldChange({ name: [name, 'organization', 'name'], value: target.value, upper: true })
        }
        // required
      />
      <CCInput
        label="Mã số DN hoặc Mã số thuế"
        name={[name, 'organization', 'mst']}
        placeholder="0316184427"
        // required
      />
      <CCInput
        type="date"
        name={[name, 'organization', 'doc_time_provide']}
        label={htmlContent('Ngày cấp <i>(ngày đăng ký lần đầu)</i>')}
        placeholder="15/01/1966 - ENTER"
        inputReadOnly={false}
        // required
        message="Ngày cấp (ngày đăng ký lần đầu) là bắt buộc!"
      />

      <Form.Item label={htmlContent('<b>Địa chỉ trụ sở chính</b>')} className={styles.newLine}>
        <CCSelect.SelectProvince
          name={[name, 'organization', 'doc_place_provide']}
          // required
        />
      </Form.Item>

      <CCInput
        name={[name, 'name']}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: '</>Họ và Tên đại diện pháp luật <i>(ĐDPL)</i></>',
            }}
          />
        }
        placeholder="NGUYỄN VĂN A"
        onChange={({ target }) => handleFieldChange({ value: target.value, name: [name, 'name'] })}
        // required
        message="Họ và Tên đại diện pháp luật (ĐDPL) là bắt buộc!"
      />
      <CCSelect.SelectTitle
        name={[name, 'title']}
        label={htmlContent('Chức danh <i>(ĐDPL)</i>')}
        placeholder="Bấm vào đây"
        options={SELECT.TITLE_2}
        // required
        message="Chức danh (ĐDPL) là bắt buộc!"
      />

      <CCInputBirthDay
        name={[name, 'birth_day']}
        inputReadOnly={false}
        // required
      />

      <CCInput
        type="select"
        name={[name, 'gender']}
        label="Giới tính"
        options={SELECT.GENDER}
        placeholder="Bấm vào đây"
        // required
      />

      <CCSelect.SelectPersonType
        name={[name, 'per_type']}
        label="Dân tộc 2"
        placeholder="Bấm vào đây"
        // required
      />

      <CCInputTypeIdentify
        name={[name, 'doc_type']}
        // required
      />

      <CCInputNumberIdentify
        indentifyType={docTypeWatch}
        name={[name, 'doc_code']}
        // required
      />

      <CCInputDateProvideIdentify
        name={[name, 'doc_time_provide']}
        // required
        inputReadOnly={false}
        indentifyType={docTypeWatch}
      />

      <CCInputOutdateIdentify name={[name, 'doc_outdate']} indentifyType={docTypeWatch} />

      <CCInputProviderIdentify
        name={[name, 'doc_place_provide']}
        // required
        indentifyType={docTypeWatch}
      />

      <Form.Item className={styles.newLine} label={htmlContent('<b>Địa chỉ thường trú <i>(ĐDPL)</i></b>')}>
        <CCSelect.SelectProvince
          name={[name, 'current']}
          // required
        />
      </Form.Item>

      <CCSelect.RadioAddress prevField={[name, 'current']} nextField={[name, 'contact']} bodyStyle={styles} required />

      {/* <Form.Item name={[name, 'isSameAddress']}>
        <Radio.Group onChange={handleChangeSameAddress} value={sameAddress}>
          <Space direction="vertical">
            <Radio value={true}>Giống với địa chỉ thường trú</Radio>
            <Radio value={false}>Khác</Radio>
          </Space>
        </Radio.Group>
      </Form.Item> */}

      <Form.Item
        className={styles.newLine}
        label={htmlContent('<b>Địa chỉ thường trú <i>(ĐDPL)</i></b>')}
        style={{
          display: 'none',
        }}
      >
        <CCSelect.SelectProvince name={[name, 'current']} required />
      </Form.Item>
    </div>
  )
}

export default OriginalPerson
