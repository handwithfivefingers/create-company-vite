// import React from "react";
import { Button, Card, Form, Input, InputNumber, Select, Space, message, Row, Col } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
// import axios from '../../../../config/axios'
import AdminProductService from '@/service/AdminService/AdminProductService'
import AdminFileService from '@/service/AdminService/AdminFileService'
const NewCategory = (props) => {
  const { category, data } = props
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  const [files, setFiles] = useState([])

  useEffect(() => {
    getFiles()
  }, [])

  const getFiles = async () => {
    try {
      const resp = await AdminFileService.getFiles()
      setFiles(resp.data.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const onFinish = async (val) => {
    try {
      setLoading(true)
      // edit
      if (data) {
        await onUpdateCate({ ...val, _id: data._id })
      } else {
        await onCreateCate(val)
      }

      //add
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      if (props.onFinishScreen) {
        props.onFinishScreen()
      }
    }
  }

  const onCreateCate = async (data) => {
    try {
      let res = await AdminProductService.createCategory(data)
      if (res.status === 200) {
        message.success(res.data?.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
    }
  }

  const onUpdateCate = async (data) => {
    try {
      let res = await AdminProductService.updateCategories(data)
      if (res.status === 200) {
        message.success(res.data?.message)
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  return (
    <Card style={{ minWidth: '350px' }} title="Danh mục" bordered={false}>
      <Form
        ref={formRef}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...data,
        }}
      >
        <Form.Item name={['name']} label="Tên Danh Mục" required>
          <Input />
        </Form.Item>

        <Form.Item name={['parentCategory']} label="Danh mục cha">
          <Select allowClear>
            {category &&
              category?.map(({ name, _id }) => {
                return (
                  <Option value={_id} key={_id}>
                    {name}
                  </Option>
                )
              })}
          </Select>
        </Form.Item>

        <Form.Item name="type" label="Loại Danh mục" required>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name={'price'} label="Giá tiền" placeholder="Giá tiền">
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name="desc" label="Mô tả">
          <Input.TextArea rows={4} placeholder="Nội dung" showCount style={{ resize: 'none' }} />
        </Form.Item>
        <Form.Item name="files" label="Tệp đính kèm" help={<i>Tệp đính kèm sẽ ảnh hưởng toàn bộ sản phẩm phụ thuộc</i>}>
          <Select mode="multiple">
            {files.map((file) => (
              <Select.Option value={file._id}>{file.fileName}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.List name="fileRules">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <>
                  <FormCondition {...field} key={'condition'} name={[field.name, 'condition']} />
                  <Form.Item {...field} key={'statement'} name={[field.name, 'statement']} label="Loại điều kiện">
                    <Select
                      options={[
                        { label: '1 trong', value: 'some' },
                        { label: 'tất cả', value: 'every' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item {...field} key={'then'} name={[field.name, 'then']} label="Thực thi điều kiện nếu đúng">
                    <Select options={files?.map(({ _id, fileName }) => ({ label: fileName, value: _id }))} />
                  </Form.Item>
                  <Form.Item {...field} key={'else'} name={[field.name, 'else']} label="Thực thi điều kiện nếu sai">
                    <Select options={files?.map(({ _id, fileName }) => ({ label: fileName, value: _id }))} />
                  </Form.Item>
                </>
              ))}
              {fields.length < 1 ? (
                <Form.Item>
                  <Button onClick={() => add()}>Thêm điều kiện</Button>
                </Form.Item>
              ) : null}
            </>
          )}
        </Form.List>
        <Form.Item>
          <Space size="small" style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {data ? 'Cập nhật' : 'Tạo'}
            </Button>
            <Button type="outline">Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

const FormCondition = ({ name }) => {
  return (
    <Form.List>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Row>
              <Col span={8}>
                <Form.Item {...field} key={`${name}_0`} name={[...name, 0]} label="Tên field so sánh">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...field} key={`${name}_1`} name={[...name, 1]} label="Loại so sánh">
                  <Select
                    options={[
                      { label: 'Bằng', value: '===' },
                      { label: 'khác', value: '!==' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...field} key={`${name}_2`} name={[...name, 2]} label="Giá trị">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          ))}
          {fields.length < 1 ? (
            <Form.Item>
              <Button onClick={() => add()}>Thêm điều kiện</Button>
            </Form.Item>
          ) : null}
        </>
      )}
    </Form.List>
  )
}

export default NewCategory
