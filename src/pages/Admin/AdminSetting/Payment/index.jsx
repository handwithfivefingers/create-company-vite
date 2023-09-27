import React from 'react'
import AdminHeader from '../../../../components/Admin/AdminHeader'
import { Card, Form, Input, Upload } from 'antd'
import { MdOutlineDriveFolderUpload } from 'react-icons/md'

function SettingPayment() {
  const [form] = Form.useForm()
  return (
    <>
      <AdminHeader title="Cài đặt > Thanh toán" />

      <Card className="box__shadow">
        <Form form={form} layout="vertical">
          <h3>Chuyển khoản</h3>
          <Form.Item name="bankName" label="Tên ngân hàng">
            <Input />
          </Form.Item>
          <Form.Item name="bankCardName" label="Tên tài khoản">
            <Input />
          </Form.Item>
          <Form.Item name="bankName" label="Số tài khoản">
            <Input />
          </Form.Item>
          <Form.Item name="bankQRCode" label="QR Code">
            <Upload.Dragger name="file" multiple={false}>
              <p className="ant-upload-drag-icon">
                <MdOutlineDriveFolderUpload fontSize={36} />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default SettingPayment
