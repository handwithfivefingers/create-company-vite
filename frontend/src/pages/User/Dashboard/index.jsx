import { Col, Row } from 'antd'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UserDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    navigate('/user/san-pham')
  }, [location])

  return (
    <div>
      <Row gutter={[0, 12]}>
        <Col span={24}></Col>
      </Row>
    </div>
  )
}

export default UserDashboard
