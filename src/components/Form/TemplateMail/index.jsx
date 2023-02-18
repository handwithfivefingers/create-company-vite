import AdminMailService from '@/service/AdminService/AdminMailService'
import { Button, Input, message, Spin } from 'antd'
import clsx from 'clsx'
import { memo, useEffect, useRef, useState } from 'react'
import CCEditor from '../../Editor'
import styles from './styles.module.scss'

const TemplateMail = (props) => {
  const [content, setContent] = useState()
  const [loading, setLoading] = useState(false)
  const editorRef = useRef()
  const inpRef = useRef({
    name: null,
    subject: null,
  })
  useEffect(() => {
    if (props.data) {
      if (inpRef) {
        let { name, subject } = inpRef.current
        let targetName = name.input
        let targetSubject = subject.input

        targetName.value = props.data.name

        targetSubject.value = props.data.subject

        setContent(props.data.content)
      }
    }
  }, [props, inpRef, content])

  const handleSave = async () => {
    try {
      setLoading(true)
      let newContent = editorRef.current.getContent()
      let { name, subject } = inpRef.current
      let targetName = name.input
      let targetSubject = subject.input

      let params = {
        name: targetName.value,
        subject: targetSubject.value,
        content: newContent,
      }

      if (params.name.length <= 1) return
      if (params.content.length <= 1) return

      if (props.type === 1) {
        let res = await AdminMailService.addTemplate(params)
        if (res.data.status === 201) {
          message.success(res.data.message)
        } else message.error(res.data.message)
      } else if (props.type === 2) {
        let res = await AdminMailService.editTemplate({
          _id: props.data._id,
          ...params,
        })
        if (res.data.status === 200) {
          message.success(res.data.message)
        } else message.error(res.data.message)
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
      <Input size="middle" placeholder={'Tiêu đề'} ref={(el) => (inpRef.current.name = el)} />

      <Input size="middle" placeholder={'Subject'} ref={(el) => (inpRef.current.subject = el)} />

      <CCEditor content={content} ref={editorRef} />

      <Button className={styles.submit} onClick={handleSave}>
        Submit
      </Button>

      <div
        className={clsx([styles.loading], {
          [styles.loadingActive]: loading,
        })}
      >
        <Spin spinning={loading} />
      </div>
    </div>
  )
}

export default memo(TemplateMail)
