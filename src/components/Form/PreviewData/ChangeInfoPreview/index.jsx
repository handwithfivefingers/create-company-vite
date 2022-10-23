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
export default function ChangeInfoPreview(props) {
  let { data } = props

  let {
    base_inform,
    legal_representative,
    present_change,
    location,
    down_authorized_capital,
    up_authorized_capital,
    transfer_contract,
    company_career,
    name,
    tax,
  } = data

  console.log(data)

  const renderASide = () => {
    let html = null

    if (transfer_contract?.A_side && transfer_contract?.A_side?.owner === 'personal') {
      const currentLabel = transfer_contract?.A_side?.personal

      html = (
        <>
          <Form.Item label={<Text type="secondary">{t['name']}</Text>}>{currentLabel?.name}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['birth_day']}</Text>}>{moment(currentLabel?.birth_day).format('DD/MM/YYYY')}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_type']}</Text>}>{currentLabel?.doc_type}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_code']}</Text>}>{currentLabel?.doc_code}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_time_provide']}</Text>}>{moment(currentLabel?.doc_time_provide).format('DD/MM/YYYY')}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_place_provide']}</Text>}>{currentLabel?.doc_place_provide}</Form.Item>

          {currentLabel?.current && (
            <>
              <Form.Item label={'Địa chỉ thường trú (ĐDPL)'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{currentLabel?.current?.city}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{currentLabel?.current?.district}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{currentLabel?.current?.town}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{currentLabel?.current?.address}</Form.Item>
              </div>
            </>
          )}

          {currentLabel?.contact && (
            <>
              <Form.Item label={'Địa chỉ liên lạc'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{currentLabel?.contact?.city}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{currentLabel?.contact?.district}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{currentLabel?.contact?.town}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{currentLabel?.contact?.address}</Form.Item>
              </div>
            </>
          )}
        </>
      )
    } else if (transfer_contract?.A_side && transfer_contract?.A_side?.owner === 'organization') {
      const currentLabel = transfer_contract?.A_side?.organization
      html = (
        <>
          <Form.Item label={<Text type="secondary">{t['company_name']}</Text>}>{currentLabel?.company_name}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['mst']}</Text>}>{moment(currentLabel?.mst).format('DD/MM/YYYY')}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['mst_provide']}</Text>}>{currentLabel?.mst_provide}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_place_provide']}</Text>}>{currentLabel?.place_provide}</Form.Item>

          {currentLabel?.company_address && (
            <>
              <Form.Item label={'Địa chỉ thường trú (ĐDPL)'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{currentLabel?.company_address?.current?.city}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{currentLabel?.company_address?.current?.district}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{currentLabel?.company_address?.current?.town}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{currentLabel?.company_address?.current?.address}</Form.Item>
              </div>
            </>
          )}
          <Form.Item
            label={
              <Text type="secondary">
                Họ và tên <i>(Đại diện pháp luật)</i>
              </Text>
            }
          >
            {currentLabel?.legal_representative}
          </Form.Item>

          <Form.Item label={<Text type="secondary">{t['title']}</Text>}>{currentLabel?.title}</Form.Item>
        </>
      )
    }

    return html
  }

  const renderBSide = () => {
    let html = null

    if (transfer_contract?.B_side && transfer_contract?.B_side?.owner === 'personal') {
      // const currentLabel = transfer_contract?.B_side?.personal
      const Bside = transfer_contract?.B_side
      const currentLabel = Bside?.personal
      html = (
        <>
          <Form.Item label={<Text type="secondary">{t['name']}</Text>}>{currentLabel?.name}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['gender']}</Text>}>{currentLabel?.gender}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['birth_day']}</Text>}>{moment(currentLabel?.birth_day).format('DD/MM/YYYY')}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['per_type']}</Text>}>{currentLabel?.per_type}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_type']}</Text>}>{currentLabel?.doc_type}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_code']}</Text>}>{currentLabel?.doc_code}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_time_provide']}</Text>}>{moment(currentLabel?.doc_time_provide).format('DD/MM/YYYY')}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_place_provide']}</Text>}>{currentLabel?.doc_place_provide}</Form.Item>

          {currentLabel?.current && (
            <>
              <Form.Item label={'Địa chỉ thường trú (ĐDPL)'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{currentLabel?.current?.city}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{currentLabel?.current?.district}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{currentLabel?.current?.town}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{currentLabel?.current?.address}</Form.Item>
              </div>
            </>
          )}

          {currentLabel?.contact && (
            <>
              <Form.Item label={'Địa chỉ liên lạc'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{currentLabel?.contact?.city}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{currentLabel?.contact?.district}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{currentLabel?.contact?.town}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{currentLabel?.contact?.address}</Form.Item>
              </div>
            </>
          )}

          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col lg={12} md={24}>
                <Card title="Phần vốn góp Bên bán hiện đang sở hữu là" size="small" className="box__shadow">
                  <Form.Item label={<Text type="secondary">Bằng số</Text>}>{Bside?.organization?.capital_contribution?.capital_current?.num}</Form.Item>
                  <Form.Item label={<Text type="secondary">Bằng chữ</Text>}>{Bside?.organization?.capital_contribution?.capital_current?.char}</Form.Item>
                  <Form.Item label={<Text type="secondary">Chiếm % vốn điều lệ</Text>}>
                    {Bside?.organization?.capital_contribution?.capital_current?.percent}%
                  </Form.Item>
                </Card>
              </Col>
              <Col lg={12} md={24}>
                <Card title="Phần vốn góp Bên bán chuyển nhượng là" size="small" className="box__shadow">
                  <Form.Item label={<Text type="secondary">Bằng số</Text>}>{Bside?.organization?.capital_contribution?.capital_transfer?.num}</Form.Item>
                  <Form.Item label={<Text type="secondary">Bằng chữ</Text>}>{Bside?.organization?.capital_contribution?.capital_transfer?.char}</Form.Item>
                  <Form.Item label={<Text type="secondary">Chiếm % vốn điều lệ</Text>}>
                    {Bside?.organization?.capital_contribution?.capital_transfer?.percent}%
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </Col>
        </>
      )
    } else if (transfer_contract?.B_side && transfer_contract?.B_side?.owner === 'organization') {
      const currentLabel = transfer_contract?.B_side?.organization
      html = (
        <>
          <Form.Item label={<Text type="secondary">{t['company_name']}</Text>}>{currentLabel?.company_name}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['mst']}</Text>}>{currentLabel?.mst}</Form.Item>

          <Form.Item label={<Text type="secondary">{t['doc_time_provide']}</Text>}>{moment(currentLabel?.time_provide).format('DD/MM/YYYY')}</Form.Item>
          <Form.Item label={<Text type="secondary">{t['doc_place_provide']}</Text>}>{currentLabel?.place_provide}</Form.Item>

          {currentLabel?.company_address && (
            <>
              <Form.Item label={'Địa chỉ thường trú (ĐDPL)'}></Form.Item>
              <div style={{ paddingLeft: 20 }}>
                <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{currentLabel?.company_address?.current?.city}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{currentLabel?.company_address?.current?.district}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{currentLabel?.company_address?.current?.town}</Form.Item>
                <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{currentLabel?.company_address?.current?.address}</Form.Item>
              </div>
            </>
          )}

          <Form.Item label={<Text type="secondary">Họ và tên (Đại diện pháp luật)</Text>}>{currentLabel?.legal_representative}</Form.Item>

          <Form.Item label={<Text type="secondary">{t['title']}</Text>}>{currentLabel?.legal_title}</Form.Item>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col lg={12} md={24}>
                <Card title="Phần vốn góp Bên bán hiện đang sở hữu là" size="small" className="box__shadow">
                  <Form.Item label={<Text type="secondary">Bằng số</Text>}>{currentLabel?.capital_contribution?.capital_current?.num}</Form.Item>
                  <Form.Item label={<Text type="secondary">Bằng chữ</Text>}>{currentLabel?.capital_contribution?.capital_current?.char}</Form.Item>
                  <Form.Item label={<Text type="secondary">Chiếm % vốn điều lệ</Text>}>
                    {currentLabel?.capital_contribution?.capital_current?.percent}%
                  </Form.Item>
                </Card>
              </Col>
              <Col lg={12} md={24}>
                <Card title="Phần vốn góp Bên bán chuyển nhượng là" size="small" className="box__shadow">
                  <Form.Item label={<Text type="secondary">Bằng số</Text>}>{currentLabel?.capital_contribution?.capital_transfer?.num}</Form.Item>
                  <Form.Item label={<Text type="secondary">Bằng chữ</Text>}>{currentLabel?.capital_contribution?.capital_transfer?.char}</Form.Item>
                  <Form.Item label={<Text type="secondary">Chiếm % vốn điều lệ</Text>}>
                    {currentLabel?.capital_contribution?.capital_transfer?.percent}%
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </Col>
        </>
      )
    }

    return html
  }

  return (
    <Row gutter={0}>
      <Col span={24}>
        {base_inform && (
          <Card title="Thông tin doanh nghiệp" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
            <Form colon labelWrap labelAlign="left" labelCol={{ lg: 8, md: 12, sm: 24, xs: 24 }}>
              <Form.Item label={<Text type="secondary">{t['company_name']}</Text>}>{base_inform?.company_name}</Form.Item>

              <Form.Item label={<Text type="secondary">{t['mst']}</Text>}>{base_inform?.mst}</Form.Item>

              {base_inform?.location && (
                <>
                  <Form.Item label={t['office_location']}></Form.Item>
                  <div style={{ paddingLeft: 20 }}>
                    <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{base_inform?.location?.city}</Form.Item>
                    <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{base_inform?.location?.district}</Form.Item>
                    <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{base_inform?.location?.town}</Form.Item>
                    <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{base_inform?.location?.address}</Form.Item>
                  </div>
                </>
              )}

              <Form.Item label={<Text type="secondary">{t['legal_respon']}</Text>}>{base_inform?.org_person}</Form.Item>

              {base_inform?.contribute_members && (
                <>
                  <Form.Item label={'Hội đồng thành viên'}></Form.Item>
                  <Row style={{ padding: '0 20px' }}>
                    {base_inform?.contribute_members.map((item, index) => {
                      return (
                        <Col lg={12} md={24}>
                          <Row>
                            <Col span={24}>
                              <Form.Item label={<Text type="secondary">Họ và Tên</Text>}>{item.name}</Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item labelCol={16} label={<Text type="secondary">Vốn góp</Text>}>
                                {item.capital}
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item labelCol={16} label={<Text type="secondary">Chiếm % vốn điều lệ</Text>}>
                                {item.capital_percent}
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      )
                    })}
                  </Row>
                </>
              )}
            </Form>
          </Card>
        )}

        {legal_representative && (
          <Card title="Đăng ký thay đổi người đại diện theo pháp luật" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}>
            <Row gutter={[12, 12]}>
              {legal_representative?.in_out?.map((item, index) => {
                let html = null

                if (item.type === PERSON_TYPE.REMOVE) {
                  html = (
                    <Col lg={12} md={24}>
                      <Card className="box__shadow" size="small" title="Xóa thành viên">
                        <Form.Item label={<Text type="secondary">{t['name']}</Text>}>{item.name}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['title']}</Text>}>{item?.title}</Form.Item>
                      </Card>
                    </Col>
                  )
                } else if (item.type === PERSON_TYPE.ADD) {
                  html = (
                    <Col lg={12} md={24}>
                      <Card className="box__shadow" size="small" title="Thêm thành viên">
                        <Form.Item label={<Text type="secondary">{t['name']}</Text>}>{item.name}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['gender']}</Text>}>{item?.gender}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['title']}</Text>}>{item?.title}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['birth_day']}</Text>}>{moment(item?.birth_day).format('DD/MM/YYYY')}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['per_type']}</Text>}>{item?.per_type}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['doc_type']}</Text>}>{item?.doc_type}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['doc_code']}</Text>}>{item?.doc_code}</Form.Item>
                        <Form.Item label={<Text type="secondary">{t['doc_time_provide']}</Text>}>
                          {moment(item?.doc_time_provide).format('DD/MM/YYYY')}
                        </Form.Item>
                        <Form.Item label={<Text type="secondary">{t['doc_place_provide']}</Text>}>{item?.doc_place_provide}</Form.Item>

                        {item?.current && (
                          <>
                            <Form.Item label={'Địa chỉ thường trú (ĐDPL)'}></Form.Item>
                            <div style={{ paddingLeft: 20 }}>
                              <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{item?.current?.city}</Form.Item>
                              <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{item?.current?.district}</Form.Item>
                              <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{item?.current?.town}</Form.Item>
                              <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{item?.current?.address}</Form.Item>
                            </div>
                          </>
                        )}

                        {item?.contact && (
                          <>
                            <Form.Item label={'Địa chỉ liên lạc'}></Form.Item>
                            <div style={{ paddingLeft: 20 }}>
                              <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{item?.contact?.city}</Form.Item>
                              <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{item?.contact?.district}</Form.Item>
                              <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{item?.contact?.town}</Form.Item>
                              <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{item?.contact?.address}</Form.Item>
                            </div>
                          </>
                        )}
                      </Card>
                    </Col>
                  )
                }

                return html
              })}

              {legal_representative.after_change?.map((item, index) => {
                let html = null
                html = (
                  <Col lg={12} md={24}>
                    <Card className="box__shadow" size="small" title="Người đại diện pháp luật sau khi thay đổi">
                      <Form.Item label={<Text type="secondary">{t['name']}</Text>}>{item.name}</Form.Item>
                      <Form.Item label={<Text type="secondary">{t['gender']}</Text>}>{item?.gender}</Form.Item>
                      <Form.Item label={<Text type="secondary">{t['title']}</Text>}>{item?.title}</Form.Item>
                      <Form.Item label={<Text type="secondary">{t['birth_day']}</Text>}>{moment(item?.birth_day).format('DD/MM/YYYY')}</Form.Item>
                      <Form.Item label={<Text type="secondary">{t['per_type']}</Text>}>{item?.per_type}</Form.Item>
                      <Form.Item label={<Text type="secondary">{t['doc_type']}</Text>}>{item?.doc_type}</Form.Item>
                      <Form.Item label={<Text type="secondary">{t['doc_code']}</Text>}>{item?.doc_code}</Form.Item>
                      <Form.Item label={<Text type="secondary">{t['doc_time_provide']}</Text>}>{moment(item?.doc_time_provide).format('DD/MM/YYYY')}</Form.Item>
                      <Form.Item label={<Text type="secondary">{t['doc_place_provide']}</Text>}>{item?.doc_place_provide}</Form.Item>

                      {item?.current && (
                        <>
                          <Form.Item label={'Địa chỉ thường trú (ĐDPL)'}></Form.Item>
                          <div style={{ paddingLeft: 20 }}>
                            <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{item?.current?.city}</Form.Item>
                            <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{item?.current?.district}</Form.Item>
                            <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{item?.current?.town}</Form.Item>
                            <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{item?.current?.address}</Form.Item>
                          </div>
                        </>
                      )}

                      {item?.contact && (
                        <>
                          <Form.Item label={'Địa chỉ liên lạc'}></Form.Item>
                          <div style={{ paddingLeft: 20 }}>
                            <Form.Item label={<Text type="secondary">{t['city']}</Text>}>{item?.contact?.city}</Form.Item>
                            <Form.Item label={<Text type="secondary">{t['district']}</Text>}>{item?.contact?.district}</Form.Item>
                            <Form.Item label={<Text type="secondary">{t['town']}</Text>}>{item?.contact?.town}</Form.Item>
                            <Form.Item label={<Text type="secondary">{t['address']}</Text>}>{item?.contact?.address}</Form.Item>
                          </div>
                        </>
                      )}
                    </Card>
                  </Col>
                )
                return html
              })}
            </Row>
          </Card>
        )}
        {/* {present_change && (
          <>
            <Card title="Người đại diện theo ủy quyền của chủ sở hữu là tổ chức" className="box__shadow" size="small" style={{ margin: '0 0 20px 0' }}></Card>
          </>
        )} */}
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
            {/* B_side */}
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
        )}
      </Col>
    </Row>
  )
}
