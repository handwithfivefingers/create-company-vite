import t from '@/constant/CommonText'
import { number_format } from '@/helper/Common'
import { Card, Col, Form, Row, Typography } from 'antd'
import styles from './styles.module.scss'
import moment from 'moment'
const { Text, Link } = Typography
const DATE_FORMAT = 'DD/MM/YYYY'
export default function DissolutionPreview(props) {
  let { data } = props

  let { approve } = data

  return (
    <Row gutter={0}>
      <Col span={24}>
        <Card title="Giải thể" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
          <Form colon labelWrap labelAlign="left" labelCol={{ lg: 8, md: 12, sm: 24, xs: 24 }} className={styles.form}>
            <Form.Item label={<Text type="secondary">{t['company_name']}</Text>}>{approve?.company_name}</Form.Item>

            <Form.Item label={<Text type="secondary">{t['mst']}</Text>}>{approve?.mst}</Form.Item>

            <Form.Item label={<Text type="secondary">{t['mst_provide']}</Text>}>
              {moment(approve?.mst_provide).format(DATE_FORMAT)}
            </Form.Item>

            <Form.Item label={<Text type="secondary">{t['org_person']}</Text>}>{approve?.org_person}</Form.Item>

            <Form.Item label={<Text type="secondary">{t['dissolution_number']}</Text>}>
              {approve?.dissolution_number}
            </Form.Item>

            <Form.Item label={<Text type="secondary">{t['dissolution_date']}</Text>}>
              {moment(approve?.dissolution_date).format(DATE_FORMAT)}
            </Form.Item>

            {approve?.location && (
              <>
                <Form.Item label={t['office_location']}></Form.Item>
                <div style={{ paddingLeft: 20 }}>
                  <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{approve?.location?.city}</Form.Item>
                  <Form.Item label={<Text type="secondary">{t['district']}</Text>}>
                    {approve?.location?.district}
                  </Form.Item>
                  <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{approve?.location?.town}</Form.Item>
                  <Form.Item label={<Text type="secondary">{t['address']}</Text>}>
                    {approve?.location?.address}
                  </Form.Item>
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
                      <Form.Item
                        label={
                          <Text type="secondary">
                            {index !== 0 ? `Tên thành viên hội đồng quản trị ${index}` : 'Tên Chủ Tịch HDQT'}
                          </Text>
                        }
                      >
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
                          <Form.Item label={<Text type="secondary">Vốn góp</Text>}>{item.capital}</Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label={<Text type="secondary">Chiếm % vốn điều lệ</Text>}>
                            {item.capital_percent}
                          </Form.Item>
                        </Col>
                      </Row>
                    )
                  })}
                </div>
              </>
            )}

            {approve?.total_capital && (
              <Form.Item label={<Text type="secondary">{t['total_capital']}</Text>}>
                {number_format(approve?.total_capital)}
              </Form.Item>
            )}
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
