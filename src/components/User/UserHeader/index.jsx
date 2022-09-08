import { ClockCircleOutlined } from '@ant-design/icons'
import { PageHeader, Button, Grid } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { makeid } from '@/helper/Common'
import { FcAssistant, FcQuestions } from 'react-icons/fc'

import styles from './styles.module.scss'

const { useBreakpoint } = Grid
const UserHeader = (props) => {
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date().toString('HH:mm'))

  const timeRef = useRef(new Date().toString('HH:mm:ss'))

  const commonReducer = useSelector((state) => state.commonReducer)

  const screen = useBreakpoint()

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current.innerHTML = new Date().toString('HH:mm:ss')
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PageHeader
      key="userHeader"
      ghost={false}
      className={styles.siteHeader}
      onBack={() => navigate(-1)}
      title={<div key={makeid(9)}>{commonReducer?.title}</div>}
      extra={[
        <Button
          type="text"
          icon={<FcQuestions />}
          style={{ alignItems: 'center', display: 'flex', gap: 4 }}
          onClick={() => window.open('https://thanhlapcongtyonline.vn/cau-hoi-thuong-gap/', '_blank')}
        >
          {screen.md && `Tài liệu hướng dẫn`}
        </Button>,
        <Button type="text" icon={<FcAssistant />} style={{ alignItems: 'center', display: 'flex', gap: 4 }} onClick={() => window.open('https://thanhlapcongtyonline.vn/ho-tro/', '_blank')}>
          {screen.md && `Hỗ trợ`}
        </Button>,
        <ClockCircleOutlined key="clock-1" color="#6f3a3a" />,
        <span style={{ color: '#6f3a3a' }} key="time" ref={timeRef} />,
      ]}
    />
  )
}

export default React.memo(UserHeader)
