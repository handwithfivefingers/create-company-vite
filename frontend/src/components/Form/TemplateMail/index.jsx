import AdminMailService from '@/service/AdminService/AdminMailService'
import { Button, Form, Input, message, Spin } from 'antd'
import clsx from 'clsx'
import { memo, useEffect, useRef, useState } from 'react'
import CCEditor from '../../Editor'
import styles from './styles.module.scss'

const TemplateMail = (props) => {
  const [loading, setLoading] = useState(false)
  const editorRef = useRef()
  const [form] = Form.useForm()
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue({
        name: props?.data?.name,
        subject: props?.data?.subject,
        content: props?.data?.content,
      })
    } else {
      form.resetFields()
    }
  }, [props])
  const handleSave = async ({ name, subject }) => {
    try {
      setLoading(true)
      const content = editorRef.current.getContent()
      const params = {
        name,
        subject,
        content: content,
      }

      if (params.name.length <= 1) return
      if (params.content.length <= 1) return

      if (props.type === 1) {
        const res = await AdminMailService.addTemplate(params)
        message.error(res.data.message)
      } else if (props.type === 2) {
        const res = await AdminMailService.editTemplate({
          _id: props.data._id,
          ...params,
        })
        message.success(res.data.message)
      }
    } catch (err) {
      message.error(err) || console.log(err)
    } finally {
      if (props.onFinishScreen) {
        props.onFinishScreen()
      }
      setLoading(false)
    }
  }

  return (
    <div className={styles.mail}>
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item label="Tiêu đề" name="name">
          <Input size="middle" />
        </Form.Item>
        <Form.Item label="Tên mail" name="subject">
          <Input size="middle" />
        </Form.Item>
        <Form.Item name={'content'} label="Nội dung">
          <CCEditor ref={editorRef} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className={styles.submit}>
            Submit
          </Button>
        </Form.Item>
        <div
          className={clsx([styles.loading], {
            [styles.loadingActive]: loading,
          })}
        >
          <Spin spinning={loading} />
        </div>
      </Form>
    </div>
  )
}

const TemplateMailMemo = memo(TemplateMail)
export default TemplateMailMemo
