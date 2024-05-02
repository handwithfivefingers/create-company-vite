import t from '@/constant/CommonText'
import { Card, Col, Form, Row, Typography, List } from 'antd'
import dayjs from 'dayjs'
import { number_format } from '../../../../helper/Common'
import { useCreateCompanyOrder } from '@/store/reducer'
import { BsDash } from 'react-icons/bs'

const { Text } = Typography

export default function CreateCompanyPreview() {
  const createCompanyData = useCreateCompanyOrder()
  console.log('CreateCompanyPreview createCompanyData', createCompanyData)
  let { approve } = createCompanyData

  if (!approve) return null

  let { base_val, origin_person, legal_respon, core, company_main_career, company_opt_career } = approve

  return (
    <Row gutter={0}>
      <Col span={24}>
        {base_val && (
          <Card title="Vốn điều lệ" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
            <DisplayInfo labelKey={'num'} value={base_val?.num ? number_format(base_val?.num) + ' đ' : '' } />
            <DisplayInfo labelKey={'char'} value={base_val?.char} />
          </Card>
        )}

        {origin_person && (
          <Card title="Cổ đông" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
            <Row gutter={[12, 12]}>
              {origin_person?.map((item, index) => {
                let html = null

                if (item?.present_person === 'personal') {
                  html = (
                    <Col lg={12} md={24} key={[item, index]}>
                      <Card className="box__shadow" size="small" title={`Cổ đông sáng lập ${index + 1}`}>
                        <DisplayInfo labelKey={'name'} value={item?.name} />
                        <DisplayInfo
                          labelKey={'capital'}
                          value={item?.capital ? number_format(item?.capital) + ' đ' : ''}
                        />
                        <DisplayInfo labelKey={'gender'} value={item?.gender} />
                        <DisplayInfo
                          labelKey={'birth_day'}
                          value={item?.birth_day ? dayjs(item?.birth_day).format('DD/MM/YYYY') : ''}
                        />
                        <DisplayInfo labelKey={'per_type'} value={item?.per_type} />
                        <DisplayInfo labelKey={'doc_type'} value={item?.doc_type} />
                        <DisplayInfo labelKey={'doc_code'} value={item?.doc_code} />
                        <DisplayInfo
                          labelKey={'doc_time_provide'}
                          value={item?.doc_time_provide ? dayjs(item?.doc_time_provide).format('DD/MM/YYYY') : ''}
                        />
                        <DisplayInfo labelKey={'doc_place_provide'} value={item?.doc_place_provide} />

                        {item?.current && (
                          <Form.Item label={'Địa chỉ thường trú'}>
                            <div style={{ paddingLeft: 20 }}>
                              <DisplayInfo labelKey={'city'} value={item?.current?.city} />
                              <DisplayInfo labelKey={'district'} value={item?.current?.district} />
                              <DisplayInfo labelKey={'town'} value={item?.current?.town} />
                              <DisplayInfo labelKey={'address'} value={item?.current?.address} />
                            </div>
                          </Form.Item>
                        )}

                        {item?.contact && (
                          <Form.Item label={'Địa chỉ liên lạc'}>
                            <div style={{ paddingLeft: 20 }}>
                              <DisplayInfo labelKey={'city'} value={item?.contact?.city} />
                              <DisplayInfo labelKey={'district'} value={item?.contact?.district} />
                              <DisplayInfo labelKey={'town'} value={item?.contact?.town} />
                              <DisplayInfo labelKey={'address'} value={item?.contact?.address} />
                            </div>
                          </Form.Item>
                        )}
                      </Card>
                    </Col>
                  )
                } else if (item?.present_person === 'organization') {
                  html = (
                    <Col lg={12} md={24}>
                      <Card className="box__shadow" size="small" title={`Thành viên góp vốn ${index + 1}`}>
                        <DisplayInfo labelKey={'company_name'} value={item?.organization?.name} />
                        <DisplayInfo
                          labelKey={'capital'}
                          value={item?.capital ? number_format(item?.capital) + ' đ' : ''}
                        />
                        <DisplayInfo labelKey={'mst'} value={item?.organization?.mst} />
                        <DisplayInfo
                          labelKey={'mst_provide'}
                          value={dayjs(item?.organization?.doc_time_provide).format('DD/MM/YYYY')}
                        />

                        <DisplayInfo labelKey={'office_location'} />

                        <div style={{ paddingLeft: 20 }}>
                          <DisplayInfo labelKey={'city'} value={item?.organization?.doc_place_provide?.city} />
                          <DisplayInfo labelKey={'district'} value={item?.organization?.doc_place_provide?.district} />
                          <DisplayInfo labelKey={'town'} value={item?.organization?.doc_place_provide?.town} />
                          <DisplayInfo labelKey={'address'} value={item?.organization?.doc_place_provide?.address} />
                        </div>

                        <DisplayInfo labelKey={'name'} value={item?.name} />
                        <DisplayInfo labelKey={'gender'} value={item?.gender} />
                        <DisplayInfo
                          labelKey={'birth_day'}
                          value={item?.birth_day ? dayjs(item?.birth_day).format('YYYY/MM/DD') : ''}
                        />
                        <DisplayInfo labelKey={'per_type'} value={item?.per_type} />
                        <DisplayInfo labelKey={'doc_type'} value={item?.doc_type} />
                        <DisplayInfo labelKey={'doc_code'} value={item?.doc_code} />
                        <DisplayInfo
                          labelKey={'doc_time_provide'}
                          value={dayjs(item?.doc_time_provide).format('DD/MM/YYYY')}
                        />
                        <DisplayInfo labelKey={'doc_place_provide'} value={item?.doc_place_provide} />

                        {item?.current && (
                          <>
                            <DisplayInfo label={'Địa chỉ thường trú'} />

                            <div style={{ paddingLeft: 20 }}>
                              <DisplayInfo labelKey={'city'} value={item?.current?.city} />
                              <DisplayInfo labelKey={'district'} value={item?.current?.district} />
                              <DisplayInfo labelKey={'town'} value={item?.current?.town} />
                              <DisplayInfo labelKey={'address'} value={item?.current?.address} />
                            </div>
                          </>
                        )}

                        {item?.contact && (
                          <>
                            <DisplayInfo label={'Địa chỉ liên lạc'} />
                            <div style={{ paddingLeft: 20 }}>
                              <DisplayInfo labelKey={'city'} value={item?.contact?.city} />
                              <DisplayInfo labelKey={'district'} value={item?.contact?.district} />
                              <DisplayInfo labelKey={'town'} value={item?.contact?.town} />
                              <DisplayInfo labelKey={'address'} value={item?.contact?.address} />
                            </div>
                          </>
                        )}
                      </Card>
                    </Col>
                  )
                }
                return html
              })}
            </Row>
          </Card>
        )}

        {legal_respon && (
          <Card title="Người đại diện pháp luật" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
            <Form colon labelWrap labelAlign="left" labelCol={{ lg: 8, md: 12, sm: 24, xs: 24 }}>
              <Row gutter={[12, 12]}>
                {legal_respon?.map((item, index) => {
                  return (
                    <Col lg={12} md={24} key={[item, index]}>
                      <Card className="box__shadow" size="small" title={`Người đại diện pháp luật ${index + 1}`}>
                        <DisplayInfo labelKey={'name'} value={item?.name} />
                        <DisplayInfo labelKey={'gender'} value={item?.gender} />
                        <DisplayInfo labelKey={'birth_day'} value={dayjs(item?.birth_day).format('DD/MM/YYYY')} />
                        <DisplayInfo labelKey={'per_type'} value={item?.per_type} />
                        <DisplayInfo labelKey={'doc_type'} value={item?.doc_type} />
                        <DisplayInfo labelKey={'doc_code'} value={item?.doc_code} />
                        <DisplayInfo
                          labelKey={'doc_time_provide'}
                          value={dayjs(item?.doc_time_provide).format('DD/MM/YYYY')}
                        />
                        <DisplayInfo labelKey={'doc_place_provide'} value={item?.doc_place_provide} />

                        {item?.current && (
                          <>
                            <DisplayInfo label={'Địa chỉ thường trú'} />
                            <div style={{ paddingLeft: 20 }}>
                              <DisplayInfo labelKey={'city'} value={item?.current?.city} />
                              <DisplayInfo labelKey={'district'} value={item?.current?.district} />
                              <DisplayInfo labelKey={'town'} value={item?.current?.town} />
                              <DisplayInfo labelKey={'address'} value={item?.current?.address} />
                            </div>
                          </>
                        )}

                        {item?.contact && (
                          <>
                            <DisplayInfo label={'Địa chỉ liên lạc'} />
                            <div style={{ paddingLeft: 20 }}>
                              <DisplayInfo labelKey={'city'} value={item?.contact?.city} />
                              <DisplayInfo labelKey={'district'} value={item?.contact?.district} />
                              <DisplayInfo labelKey={'town'} value={item?.contact?.town} />
                              <DisplayInfo labelKey={'address'} value={item?.contact?.address} />
                            </div>
                          </>
                        )}
                      </Card>
                    </Col>
                  )
                })}
              </Row>
            </Form>
          </Card>
        )}
        {core && (
          <Card title="Tên công ty" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
            <DisplayInfo label="Tên công ty bằng Tiếng Việt" value={core?.name} />
            <DisplayInfo label="Tên công ty bằng Tiếng Anh (nếu có)" value={core?.name_en} />
            <DisplayInfo label="Tên công ty viết tắt (nếu có)" value={core?.name_vn} />
          </Card>
        )}

        {core?.address && (
          <>
            <Card title="Địa chỉ đặt trụ sở" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
              <DisplayInfo label={t['office_location']} />
              <div style={{ paddingLeft: 20 }}>
                <DisplayInfo labelKey="city" value={core?.address?.city} />
                <DisplayInfo labelKey="district" value={core?.address?.district} />
                <DisplayInfo labelKey="town" value={core?.address?.town} />
                <DisplayInfo labelKey="address" value={core?.address?.address} />
              </div>
              <DisplayInfo label="Số điện thoại liên hệ" value={core?.contact?.phone} />
              <DisplayInfo label="Email liên hệ (nếu có)" value={core?.contact?.email} />
            </Card>
          </>
        )}

        {(company_main_career || company_opt_career) && (
          <Card
            title="Ngành nghề đăng kí kinh doanh"
            className="box__shadow"
            size="small"
            style={{ margin: '0 0 20px 0' }}
          >
            {company_main_career && (
              <DisplayInfo
                label="Ngành nghề kinh doanh chính"
                value={company_main_career.name + '-' + company_main_career.code}
              />
            )}

            {company_opt_career && (
              <DisplayInfo
                label="Ngành nghề kinh doanh thêm"
                value={
                  <List style={{ listStyle: 'none' }}>
                    {company_opt_career?.map((item, index) => {
                      return (
                        <List.Item key={['Ngành nghề kinh doanh thêm', item, index]}>
                          {item?.name} - {item?.code}
                        </List.Item>
                      )
                    })}
                  </List>
                }
              />
            )}
          </Card>
        )}
      </Col>
    </Row>
  )
}

const DisplayInfo = ({ label, labelKey, value, labelSize = 12 }) => {
  return (
    <div className="row lead p-4">
      <Text type="secondary" className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 fs-6 fw-light">
        {label ? label : ''}
        {labelKey ? t[labelKey] : ''}
        {':'}
      </Text>
      <span className="col-xl-8 col-lg-6 col-md-6 col-sm-12 col-xs-12">{value}</span>
    </div>
  )
}
