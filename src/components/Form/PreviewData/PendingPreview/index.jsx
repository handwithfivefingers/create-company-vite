import { Row, Col, Card, Form, Typography } from 'antd'
import React from 'react'
import t from '@/constant/CommonText'
import { number_format } from '@/helper/Common'
import styles from './styles.module.scss'
import moment from 'moment'

const { Text, Link } = Typography

export default function PendingPreview(props) {
  let { data } = props

  let { approve } = data

  console.log(approve)
  return (
    <Row gutter={0}>
      <Col span={24}>
        <Card title="Giải thể" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
          <Form colon labelWrap labelAlign="left" labelCol={{ lg: 8, md: 12, sm: 24, xs: 24 }} className={styles.form}>
            <Form.Item label={<Text type="secondary">{t['company_name']}</Text>}>{approve?.company_name}</Form.Item>

            <Form.Item label={<Text type="secondary">{t['mst']}</Text>}>{approve?.mst}</Form.Item>
            {approve?.location && (
              <>
                <Form.Item label={t['office_location']}></Form.Item>
                <div style={{ paddingLeft: 20 }}>
                  <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{approve?.location?.city}</Form.Item>
                  <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{approve?.location?.district}</Form.Item>
                  <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{approve?.location?.town}</Form.Item>
                  <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{approve?.location?.address}</Form.Item>
                  <Form.Item label={<Text type="secondary">{t['legal_respon']}</Text>}>{approve?.org_person}</Form.Item>
                </div>
              </>
            )}

            {approve?.list_president && (
              <>
                <Form.Item label={'Hội đồng quản trị'}></Form.Item>
                <div style={{ paddingLeft: 20 }}>
                  {approve?.list_president.map((item, index) => {
                    return (
                      <Form.Item label={<Text type="secondary">{index !== 0 ? `Tên thành viên hội đồng quản trị ${index}` : 'Tên Chủ Tịch HDQT'}</Text>}>
                        {item.president}
                      </Form.Item>
                    )
                  })}
                </div>
              </>
            )}

            {approve?.contribute_members && (
              <>
                <Form.Item label={'Hội đồng thành viên'}></Form.Item>
                <div style={{ paddingLeft: 20 }}>
                  {approve?.contribute_members.map((item, index) => {
                    return (
                      <Row>
                        <Col span={24}>
                          <Form.Item label={<Text type="secondary">Họ và Tên</Text>}>{item.name}</Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item labelCol={12} label={<Text type="secondary">Vốn góp</Text>}>
                            {number_format(item.capital)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item labelCol={12} label={<Text type="secondary">Chiếm % vốn điều lệ</Text>}>
                            {item.capital_percent}%
                          </Form.Item>
                        </Col>
                      </Row>
                    )
                  })}
                </div>
              </>
            )}

            {approve?.total_capital && (
              <Form.Item label={<Text type="secondary">{t['total_capital']}</Text>}>{number_format(approve?.total_capital)}</Form.Item>
            )}

            {approve?.obj && <Form.Item label={<Text type="secondary">Đối tượng thông báo tạm ngưng kinh doanh</Text>}>{approve?.obj}</Form.Item>}

            {approve?.time_range && (
              <Form.Item label={<Text type="secondary">Thời gian đăng ký tạm ngừng kinh doanh</Text>}>
                {(approve?.time_range?.start && moment(approve?.time_range?.start).format('DD/MM/YYYY')) || ''} -{' '}
                {(approve?.time_range?.end && moment(approve?.time_range?.end).format('DD/MM/YYYY')) || ''}
              </Form.Item>
            )}
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
