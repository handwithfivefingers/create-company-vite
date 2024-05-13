import { useQuery } from '@tanstack/react-query'
import { Card, Col, Row, Skeleton, Switch, Badge } from 'antd'
import { number_format } from '../../../helper/Common'
import AdminSMSService from '../../../service/AdminService/AdminSMSService'
import styles from './styles.module.scss'
import dayjs from 'dayjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'].map(() =>
        (Math.random() * 1000).toFixed(0),
      ),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'].map(() =>
        (Math.random() * 1000).toFixed(0),
      ),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    // title: {
    //   display: true,
    //   text: 'Chart',
    // },
  },
}

const AdminDashboard = () => {
  const smsResponse = useQuery(['smsBalance'], () => AdminSMSService.getBalance(), {
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
  })
  return (
    <div className={styles.wrapper}>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} md={12} lg={16} xl={16} xxl={18}>
          <Card className="box__shadow" title="Tổng đơn hàng">
            <Bar options={options} data={data} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Card className="box__shadow" title="Số dư tài khoản SMS">
                <Skeleton loading={smsResponse.isLoading} active>
                  <p>Số dư: {number_format(smsResponse.data?.data?.data?.Balance) || 'Không có dữ liệu'} đ</p>
                </Skeleton>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                className="box__shadow"
                title={
                  <div className="d-flex justify-content-between ">
                    Trạng thái PDF Server{' '}
                    <Badge className="p-2 animate__animated animate__heartBeat  animate__infinite" status="success" />
                  </div>
                }
              >
                <p>Đang hoạt động </p>
                <p>Ngày hết hạn: {dayjs('2024/06/25').format('DD [Tháng] MM [Năm] YYYY')}</p>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                className="box__shadow"
                title={
                  <div className="d-flex justify-content-between ">
                    Tự động chuyển đổi file
                    <Badge className="p-2 animate__animated animate__heartBeat  animate__infinite" status="success" />
                  </div>
                }
              >
                <p>
                  <Switch checked={true} checkedChildren="ON" uncheckedChildren="OFF" />
                </p>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                className="box__shadow"
                title={
                  <div className="d-flex justify-content-between ">
                    Tự động gửi email
                    <Badge className="p-2 animate__animated animate__heartBeat  animate__infinite" status="success" />
                  </div>
                }
              >
                <p>
                  <Switch checked={true} checkedChildren="ON" uncheckedChildren="OFF" />
                </p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard
