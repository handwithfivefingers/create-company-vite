import { ClockCircleOutlined } from '@ant-design/icons'
import { PageHeader } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { makeid } from '@/helper/Common'
import styles from './styles.module.scss'

const UserHeader = (props) => {
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date().toString('HH:mm'))

  const timeRef = useRef(new Date().toString('HH:mm:ss'))

  const commonReducer = useSelector((state) => state.commonReducer)

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current.innerHTML = new Date().toString('HH:mm:ss')
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  console.log('trigger render')
  return (
    <PageHeader
      key="userHeader"
      ghost={false}
      className={styles.siteHeader}
      onBack={() => navigate(-1)}
      title={<div key={makeid(9)}>{commonReducer?.title}</div>}
      extra={[
        <ClockCircleOutlined key="clock-1" color="#6f3a3a" />,
        <span style={{ color: '#6f3a3a' }} key="time" ref={timeRef} />,
      ]}
    />
  )
}

export default React.memo(UserHeader)
