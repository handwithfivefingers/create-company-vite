import { Row, Col, Card, Form, Typography } from 'antd'
import React from 'react'
import t from '@/constant/CommonText'
import { number_format } from '@/helper/Common'
import moment from 'moment'

const { Text, Link } = Typography
const PERSON_TYPE = {
  ADD: 'includes',
  REMOVE: 'excludes',
}
export default function CreateCompanyPreview(props) {
  let { data } = props

  let { approve } = data

  if (!approve) return null

  let { base_val, origin_person, legal_respon, core, company_main_career, company_opt_career } = approve

  return (
    <Row gutter={0}>
      <Col span={24}>
        {base_val && (
          <Card title="Vốn điều lệ" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
            <Form colon labelWrap labelAlign="left" labelCol={{ lg: 8, md: 12, sm: 24, xs: 24 }}>
              <Form.Item label={<Text type="secondary">{t['num']}</Text>}>{base_val?.num}</Form.Item>

              <Form.Item label={<Text type="secondary">{t['char']}</Text>}>{base_val?.char}</Form.Item>
            </Form>
          </Card>
        )}

        {origin_person && (
          <Card title="Thành viên góp vốn" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
            <Form colon labelWrap labelAlign="left" labelCol={{ lg: 8, md: 12, sm: 24, xs: 24 }}>
              <Row gutter={[12, 12]}>
                {origin_person?.map((item, index) => {
                  let html = null

                  if (item.present_person === 'personal') {
                    html = (
                      <Col lg={12} md={24} key={[item, index]}>
                        <Card className="box__shadow" size="small" title={`Thành viên góp vốn ${index + 1}`}>
                          <Form.Item label={<Text type="secondary">{t['name']}</Text>}>{item.name}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['gender']}</Text>}>{item?.gender}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['birth_day']}</Text>}>
                            {moment(item?.birth_day).format('DD/MM/YYYY')}
                          </Form.Item>
                          <Form.Item label={<Text type="secondary">{t['per_type']}</Text>}>{item?.per_type}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['doc_type']}</Text>}>{item?.doc_type}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['doc_code']}</Text>}>{item?.doc_code}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['doc_time_provide']}</Text>}>
                            {moment(item?.doc_time_provide).format('DD/MM/YYYY')}
                          </Form.Item>
                          <Form.Item label={<Text type="secondary">{t['doc_place_provide']}</Text>}>
                            {item?.doc_place_provide}
                          </Form.Item>

                          {item?.current && (
                            <>
                              <Form.Item label={'Địa chỉ thường trú'}></Form.Item>
                              <div style={{ paddingLeft: 20 }}>
                                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>
                                  {item?.current?.city}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>
                                  {item?.current?.district}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>
                                  {item?.current?.town}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>
                                  {item?.current?.address}
                                </Form.Item>
                              </div>
                            </>
                          )}

                          {item?.contact && (
                            <>
                              <Form.Item label={'Địa chỉ liên lạc'}></Form.Item>
                              <div style={{ paddingLeft: 20 }}>
                                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>
                                  {item?.contact?.city}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>
                                  {item?.contact?.district}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>
                                  {item?.contact?.town}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>
                                  {item?.contact?.address}
                                </Form.Item>
                              </div>
                            </>
                          )}
                        </Card>
                      </Col>
                    )
                  } else if (item.present_person === 'organization') {
                    html = (
                      <Col lg={12} md={24}>
                        <Card className="box__shadow" size="small" title={`Thành viên góp vốn ${index + 1}`}>
                          <Form.Item label={<Text type="secondary">{t['company_name']}</Text>}>
                            {item?.organization?.name}
                          </Form.Item>
                          <Form.Item label={<Text type="secondary">{t['mst']}</Text>}>
                            {item?.organization?.mst}
                          </Form.Item>
                          <Form.Item label={<Text type="secondary">{t['mst_provide']}</Text>}>
                            {moment(item?.organization?.doc_time_provide).format('DD/MM/YYYY')}
                          </Form.Item>

                          <Form.Item label={t['office_location']}></Form.Item>

                          <div style={{ paddingLeft: 20 }}>
                            <Form.Item label={<Text type="secondary">{t['city']}</Text>}>
                              {item?.organization?.doc_place_provide?.city}
                            </Form.Item>
                            <Form.Item label={<Text type="secondary">{t['district']}</Text>}>
                              {item?.organization?.doc_place_provide?.district}
                            </Form.Item>
                            <Form.Item label={<Text type="secondary">{t['town']}</Text>}>
                              {item?.organization?.doc_place_provide?.town}
                            </Form.Item>
                            <Form.Item label={<Text type="secondary">{t['address']}</Text>}>
                              {item?.organization?.doc_place_provide?.address}
                            </Form.Item>
                          </div>

                          <Form.Item label={<Text type="secondary">{t['name']}</Text>}>{item?.name}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['gender']}</Text>}>{item?.gender}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['birth_day']}</Text>}>
                            {moment(item?.birth_day).format('DD/MM/YYYY')}
                          </Form.Item>
                          <Form.Item label={<Text type="secondary">{t['per_type']}</Text>}>{item?.per_type}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['doc_type']}</Text>}>{item?.doc_type}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['doc_code']}</Text>}>{item?.doc_code}</Form.Item>
                          <Form.Item label={<Text type="secondary">{t['doc_time_provide']}</Text>}>
                            {moment(item?.doc_time_provide).format('DD/MM/YYYY')}
                          </Form.Item>
                          <Form.Item label={<Text type="secondary">{t['doc_place_provide']}</Text>}>
                            {item?.doc_place_provide}
                          </Form.Item>

                          {item?.current && (
                            <>
                              <Form.Item label={'Địa chỉ thường trú'}></Form.Item>
                              <div style={{ paddingLeft: 20 }}>
                                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>
                                  {item?.current?.city}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>
                                  {item?.current?.district}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>
                                  {item?.current?.town}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>
                                  {item?.current?.address}
                                </Form.Item>
                              </div>
                            </>
                          )}

                          {item?.contact && (
                            <>
                              <Form.Item label={'Địa chỉ liên lạc'}></Form.Item>
                              <div style={{ paddingLeft: 20 }}>
                                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>
                                  {item?.contact?.city}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>
                                  {item?.contact?.district}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>
                                  {item?.contact?.town}
                                </Form.Item>
                                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>
                                  {item?.contact?.address}
                                </Form.Item>
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
            </Form>
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
                        <Form.Item label={<Text type="secondary">{t['name']}</Text>}>{item.name}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['gender']}</Text>}>{item?.gender}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['birth_day']}</Text>}>
                          {moment(item?.birth_day).format('DD/MM/YYYY')}
                        </Form.Item>
                        <Form.Item label={<Text type="secondary">{t['per_type']}</Text>}>{item?.per_type}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['doc_type']}</Text>}>{item?.doc_type}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['doc_code']}</Text>}>{item?.doc_code}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['doc_time_provide']}</Text>}>
                          {moment(item?.doc_time_provide).format('DD/MM/YYYY')}
                        </Form.Item>
                        <Form.Item label={<Text type="secondary">{t['doc_place_provide']}</Text>}>
                          {item?.doc_place_provide}
                        </Form.Item>

                        {item?.current && (
                          <>
                            <Form.Item label={'Địa chỉ thường trú'}></Form.Item>
                            <div style={{ paddingLeft: 20 }}>
                              <Form.Item label={<Text type="secondary">{t['city']}</Text>}>
                                {item?.current?.city}
                              </Form.Item>
                              <Form.Item label={<Text type="secondary">{t['district']}</Text>}>
                                {item?.current?.district}
                              </Form.Item>
                              <Form.Item label={<Text type="secondary">{t['town']}</Text>}>
                                {item?.current?.town}
                              </Form.Item>
                              <Form.Item label={<Text type="secondary">{t['address']}</Text>}>
                                {item?.current?.address}
                              </Form.Item>
                            </div>
                          </>
                        )}

                        {item?.contact && (
                          <>
                            <Form.Item label={'Địa chỉ liên lạc'}></Form.Item>
                            <div style={{ paddingLeft: 20 }}>
                              <Form.Item label={<Text type="secondary">{t['city']}</Text>}>
                                {item?.contact?.city}
                              </Form.Item>
                              <Form.Item label={<Text type="secondary">{t['district']}</Text>}>
                                {item?.contact?.district}
                              </Form.Item>
                              <Form.Item label={<Text type="secondary">{t['town']}</Text>}>
                                {item?.contact?.town}
                              </Form.Item>
                              <Form.Item label={<Text type="secondary">{t['address']}</Text>}>
                                {item?.contact?.address}
                              </Form.Item>
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
            <Form colon labelWrap labelAlign="left" labelCol={{ lg: 8, md: 12, sm: 24, xs: 24 }}>
              <Form.Item label="Tên công ty bằng Tiếng Việt">{core?.name}</Form.Item>
              <Form.Item label="Tên công ty bằng Tiếng Anh (nếu có)">{core?.name_en}</Form.Item>
              <Form.Item label="Tên công ty viết tắt (nếu có)">{core?.name_vn}</Form.Item>
            </Form>
          </Card>
        )}

        {core?.address && (
          <>
            <Card title="Địa chỉ đặt trụ sở" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
              <Form colon labelWrap labelAlign="left" labelCol={{ lg: 8, md: 12, sm: 24, xs: 24 }}>
                <Form.Item label={t['office_location']}></Form.Item>
                <div style={{ paddingLeft: 20 }}>
                  <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{core?.address?.city}</Form.Item>
                  <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{core?.address?.district}</Form.Item>
                  <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{core?.address?.town}</Form.Item>
                  <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{core?.address?.address}</Form.Item>
                </div>
                <Form.Item label="Số điện thoại liên hệ">{core?.contact?.phone}</Form.Item>
                <Form.Item label="Email liên hệ (nếu có)">{core?.contact?.email}</Form.Item>
              </Form>
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
            <Form colon labelWrap labelAlign="left" labelCol={{ lg: 8, md: 12, sm: 24, xs: 24 }}>
              {company_main_career && (
                <Form.Item label={<Text type="secondary">Ngành nghề kinh doanh chính</Text>}>
                  {company_main_career.name} - {company_main_career.code}
                </Form.Item>
              )}

              {company_opt_career && (
                <Form.Item label={<Text type="secondary">Ngành nghề kinh doanh thêm</Text>}>
                  <ul style={{ listStyle: 'none' }}>
                    {company_opt_career?.map((item, index) => {
                      return (
                        <li key={['Ngành nghề kinh doanh thêm', item, index]}>
                          {item.name} - {item.code}
                        </li>
                      )
                    })}
                  </ul>
                </Form.Item>
              )}
            </Form>
          </Card>
        )}

        {/* 
        {location && (
          <>
            <Card title="Đăng ký thay đổi địa chỉ trụ sở chính" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
              <Form.Item label={'Địa chỉ trụ sở hiện tại'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{location?.old?.city}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{location?.old?.district}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{location?.old?.town}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{location?.old?.address}</Form.Item>
              </div>

              <Form.Item label={'Địa chỉ trụ sở sau khi thay đổi'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{location?.new_location?.city}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{location?.new_location?.district}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{location?.new_location?.town}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{location?.new_location?.address}</Form.Item>
              </div>
            </Card>
          </>
        )}

        {down_authorized_capital && (
          <>
            <Card title="Đăng kí thay đổi vốn điều lệ (giảm)" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
              <Form.Item label={'Vốn điều lệ đã đăng ký'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">Bằng số</Text>}>{number_format(down_authorized_capital?.base_val?.num)}</Form.Item>
                <Form.Item label={<Text type="secondary">Bằng chữ</Text>}>{down_authorized_capital?.base_val?.char}</Form.Item>
              </div>

              <Form.Item label={'Vốn điều lệ sau khi giảm '}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">Bằng số</Text>}>{number_format(down_authorized_capital?.new_base_val?.num)}</Form.Item>
                <Form.Item label={<Text type="secondary">Bằng chữ</Text>}>{down_authorized_capital?.new_base_val?.char}</Form.Item>
              </div>
            </Card>
          </>
        )}

        {up_authorized_capital && (
          <>
            <Card title="Đăng kí thay đổi vốn điều lệ (tăng)" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
              <Form.Item label={'Vốn điều lệ đã đăng ký'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">Bằng số</Text>}>{number_format(up_authorized_capital?.base_val?.num)}</Form.Item>
                <Form.Item label={<Text type="secondary">Bằng chữ</Text>}>{up_authorized_capital?.base_val?.char}</Form.Item>
              </div>

              <Form.Item label={'Vốn điều lệ sau khi tăng '}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">Bằng số</Text>}>{number_format(up_authorized_capital?.new_base_val?.num)}</Form.Item>
                <Form.Item label={<Text type="secondary">Bằng chữ</Text>}>{up_authorized_capital?.new_base_val?.char}</Form.Item>
              </div>
            </Card>
          </>
        )}

        {transfer_contract && (
          <Card title="Đăng ký thay đổi hợp đồng chuyển nhượng phần góp vốn" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
            {renderASide()}

            {renderBSide()}
          </Card>
        )}

        {company_career && (
          <>
            <Card title="Đăng ký thay đổi ngành nghề kinh doanh" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
              <Form.Item label={<Text type="secondary">Bổ sung ngành, nghề kinh doanh</Text>}>
                <ul style={{ listStyle: 'none' }}>
                  {company_career?.include?.map((item, index) => {
                    return <li key={['Bổ sung ngành, nghề kinh doanh', item, index]}>{item.children.reverse().join('')}</li>
                  })}
                </ul>
              </Form.Item>

              <Form.Item label={<Text type="secondary">Bỏ ngành, nghề kinh doanh</Text>}>
                <ul style={{ listStyle: 'none' }}>
                  {company_career?.exclude?.map((item, index) => {
                    return <li key={['Bổ sung ngành, nghề kinh doanh', item, index]}>{item.children.join('')}</li>
                  })}
                </ul>
              </Form.Item>
            </Card>
          </>
        )}

        {name && (
          <>
            <Card title="Đăng ký thay đổi tên doanh nghiệp" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
              <Form.Item label={<Text type="secondary">Tên công ty bằng Tiếng Việt</Text>}>{name?.name_vi}</Form.Item>
              <Form.Item label={<Text type="secondary">Tên công ty bằng tiếng nước ngoài (chỉ điền nếu có thay đổi)</Text>}>{name?.name_en}</Form.Item>
              <Form.Item label={<Text type="secondary">Tên công ty viết tắt (chỉ điền nếu có thay đổi)</Text>}>{name?.name_etc}</Form.Item>
            </Card>
          </>
        )}

        {tax && (
          <>
            <Card title="Đăng ký thay đổi thông tin đăng ký thuế" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}></Card>
          </>
        )} */}
      </Col>
    </Row>
  )
}
