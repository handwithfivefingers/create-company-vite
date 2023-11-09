import { makeid } from '@/helper/Common'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Button, Grid, PageHeader } from 'antd'
import { memo, useEffect, useRef } from 'react'
import { FcAssistant, FcQuestions } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import moment from 'moment'
import styles from './styles.module.scss'

const { useBreakpoint } = Grid
const UserHeader = (props) => {
  const navigate = useNavigate()

  const timeRef = useRef(moment().format('HH:mm:ss'))

  const commonReducer = useSelector((state) => state.commonReducer)

  const screen = useBreakpoint()

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current.innerHTML = moment().format('HH:mm:ss')
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PageHeader
      key="userHeader"
      ghost={false}
      className={styles.siteHeader}
      onBack={() => navigate(-1)}
      title={<div className={styles.title}>{commonReducer?.title}</div>}
      extra={[
        <div className={styles.subHeader} key="sub_header">
          <Button
            key="btn-action-1"
            type="text"
            icon={<FcQuestions />}
            style={{ alignItems: 'center', display: 'flex', gap: 4 }}
            onClick={() => window.open('https://thanhlapcongtyonline.vn/cau-hoi-thuong-gap/', '_blank')}
          >
            {screen.md && `Tài liệu hướng dẫn`}
          </Button>
          <Button
            key="btn-action-2"
            type="text"
            icon={<FcAssistant />}
            style={{ alignItems: 'center', display: 'flex', gap: 4 }}
            onClick={() => window.open('https://thanhlapcongtyonline.vn/ho-tro/', '_blank')}
          >
            {screen.md && `Hỗ trợ`}
          </Button>
          <div className={styles.time}>
            <ClockCircleOutlined key="clock-1" color="#6f3a3a"  />
            <span style={{ color: '#6f3a3a' }} key="time" ref={timeRef}  />
          </div>
        </div>,
      ]}
    />
  )
}

export default memo(UserHeader)
