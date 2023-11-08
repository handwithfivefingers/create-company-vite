import { useQuery } from '@tanstack/react-query'
import { Card, Col, Row, Skeleton, Tabs } from 'antd'
import { number_format } from '../../../helper/Common'
import AdminSMSService from '../../../service/AdminService/AdminSMSService'
import styles from "./styles.module.scss"
const { TabPane } = Tabs
const AdminDashboard = () => {
  const smsResponse = useQuery(['smsBalance'], () => AdminSMSService.getBalance(), {
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
  })

  return (
    <div className={styles.wrapper}>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={4}>
          <Card className="box__shadow" title="Số dư tài khoản SMS">
            <Skeleton loading={smsResponse.isLoading} active>
              <p>Số dư: {number_format(smsResponse.data?.data?.data?.Balance) || 'Không có dữ liệu'} đ</p>
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={4}>
          <Card className="box__shadow" title="Feature 1">
            <Skeleton active />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={4}>
          <Card className="box__shadow" title="Feature 2">
            <Skeleton active />
          </Card>
        </Col>
        <Col lg={16} xs={24}>
          <Card className="box__shadow" title="Feature 3">
            <Skeleton active />
          </Card>
        </Col>
        <Col lg={8} xs={24}>
          <Card className="box__shadow" title="Feature 4">
            <Skeleton active />
          </Card>
        </Col>
        <Col lg={24}>
          <Card className="box__shadow" title="Feature 5">
            <Skeleton active />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard
