import { Button, Col, Row } from 'antd'
import clsx from 'clsx'
import styles from './Footer.module.scss'
const Footer = () => {
  return (
    <div className={clsx([styles.container, 'fluid-container'])}>
      <Row gutter={[16, 12]}>
        <Col lg={12} md={12} sm={12} xs={24} align="center" className={styles.contentHelper}>
          <h3 style={{ color: 'var(--text1)' }}>Gặp vấn đề trong quá trình đăng kí?</h3>
          <p style={{ color: 'var(--text1)' }}> Hãy để chúng tôi giúp bạn</p>
        </Col>

        <Col lg={12} md={12} sm={12} xs={24} className={styles.actionsBtn} align="center">
          <Button type="primary">Hotline</Button>
          <Button type="primary">Email</Button>
        </Col>
      </Row>

      <Row
        style={{
          background: '#333',
        }}
      >
        <Col span={24} align="center">
          {/* <p style={{ color: '#fff', margin: 0, padding: '8px 0' }}>Công ty TNHH Thành lập công ty Online - Giấy phép kinh doanh số: 12312312 - Cấp ngày 17/11/2017</p> */}
          <p style={{ color: '#fff', margin: 0, padding: '8px 0' }}>
            MỘT SẢN PHẨM CỦA CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B - MST: 0316184427
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default Footer
