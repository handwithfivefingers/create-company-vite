import { CaretRightOutlined } from '@ant-design/icons'
import { Card, Collapse, Descriptions } from 'antd'
import clsx from 'clsx'
import { useOutletContext } from 'react-router-dom'
import styles from './styles.module.scss'
const { Panel } = Collapse
export default function Policy() {
  const { animateClass } = useOutletContext()
  return (
    <div className={clsx([animateClass, styles.orderWrapper])}>
      <div className="cc-scroll" style={{ backgroundColor: '#fff' }}>
        <Collapse
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
          <Panel header={'Điều khoản và điều kiện về bảo mật khi sử dụng thanhlapcongtyonline.vn'} key="1">
            <Card className={'box__shadow m-tb-5'}>
              <Descriptions
                title="I. Chính sách bảo mật thông tin người dùng khi sử dụng dịch vụ đăng ký doanh nghiệp của thanhlapcongtyonline.vn"
                layout="vertical"
                bordered
              >
                <Descriptions.Item label="1. Mục đích và phạm vi thu thập" span={3}>
                  Trong khi sử dụng dịch vụ đăng ký doanh nghiệp của thanhlapcongtyonline.vn, người dùng cần cung cấp
                  các thông tin bao gồm: họ và tên, ngày sinh, giới tính, email, số điện thoại để liên hệ xác nhận khi
                  người dùng sử dụng dịch vụ. Trong quá trình giao dịch thanh toán trên thanhlapcongtyonline.vn, chỉ
                  những thông tin chi tiết về đơn hàng đã thanh toán của người dùng được lưu giữ, các thông tin về số
                  tài khoản ngân hàng của người dùng sẽ không được lưu giữ. Người dùng sẽ tự chịu trách nhiệm về bảo mật
                  và lưu giữ các thông tin về mật khẩu, hộp thư điện tử và các hoạt động sử dụng dịch vụ dưới tên đăng
                  ký. Ngoài ra, người dùng có trách nhiệm thông báo kịp thời cho thanhlapcongtyonline.vn về những hành
                  vi sử dụng trái phép, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp
                  xử lý phù hợp.
                </Descriptions.Item>
                <Descriptions.Item label="2. Phạm vi sử dụng thông tin" span={3}>
                  Thanhlapcongtyonline.vn chỉ sử dụng thông tin mà người dùng cung cấp để: <br />
                  - Cung cấp dịch vụ cho người dùng; <br />
                  - Phục vụ nhu cầu trao đổi thông tin giữa người dùng và thanhlapcongtyonline.vn; <br />
                  - Liên lạc với người dùng trong trường hợp cần thiết; <br />
                  - Gửi thông tin theo đơn đặt hàng.
                  <br />
                </Descriptions.Item>

                <Descriptions.Item label="3. Thời gian lưu trữ thông tin" span={3}>
                  Dữ liệu của người dùng sẽ được lưu trữ trên thanhlapcongtyonline.vn cho đến khi có yêu cầu vô hiệu
                  hóa. Thông tin của người dùng sẽ được bảo mật trên thanhlapcongtyonline.vn.
                </Descriptions.Item>

                <Descriptions.Item label="4. Địa chỉ của đơn vị thu thập và quản lý thông tin" span={3}>
                  Địa chỉ: OT-X0, Sunrise City North, 27 Nguyễn Hữu Thọ, phường Tân Hưng, Quận 7, Tp.Hồ Chí Minh <br />
                  Email: hotro@thanhlapcongtyonline.vn
                </Descriptions.Item>

                <Descriptions.Item
                  label="5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình"
                  span={3}
                >
                  - Người dùng có quyền tự kiểm tra, điều chỉnh các thông tin cá nhân của mình bao gồm: họ và tên, giới
                  tính, ngày sinh, quốc tịch, dân tộc, điện thoại, mật khẩu đăng nhập bằng cách đăng nhập vào tài khoản
                  người dùng và truy cập vào mục quản lý thông tin cá nhân. - Trong trường hợp người dùng muốn vô hiệu
                  hóa tài khoản đăng nhập, vui lòng liên hệ tổng đài số 0915704883 hoặc gửi yêu cầu theo thư điện tử tới
                  địa chỉ email: hotro@thanhlapcongtyonline.vn để được hỗ trợ.
                </Descriptions.Item>

                <Descriptions.Item label="6. Cam kết bảo mật thông tin của người dùng" span={3}>
                  - Thông tin của người dùng được bảo mật theo chính sách bảo mật của thanhlapcongtyonline.vn;
                  <br />
                  - Không sử dụng, chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của người
                  dùng khi chưa có sự đồng ý của người dùng;
                  <br />
                  - Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân người
                  dùng, thanhlapcongtyonline.vn sẽ chịu trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra và
                  người dùng;
                  <br />- Các cá nhân khi đăng ký tài khoản người dùng cần kê khai đầy đủ thông tin, bao gồm: họ và tên,
                  ngày sinh, giới tính, email, số điện thoại và chịu trách nhiệm về tính chính xác của thông tin kê
                  khai. Thanhlapcongtyonline.vn không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại liên quan
                  đến quyền lợi của người dùng trong trường hợp thông tin cá nhân của người dùng cung cấp khi đăng ký
                  ban đầu không chính xác.
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card className={'box__shadow m-tb-5'}>
              <Descriptions
                title="II. Điều khoản và điều kiện về bảo mật khi sử dụng các dịch vụ của thanhlapcongtyonline.vn"
                layout="vertical"
                bordered
              >
                <Descriptions.Item label="1. Mật khẩu:" span={3}>
                  Người sử dụng phải có trách nhiệm tự bảo mật Mật khẩu đăng nhập, các thông tin của giao dịch. Bất cứ
                  hành động truy cập hoặc giao dịch nào bằng tài khoản giao dịch của người sử dụng với đúng Mật khẩu
                  đăng nhập hoặc các yếu tố định danh khác do hệ thống cung cấp cho người sử dụng đều được coi là người
                  sử dụng truy cập hoặc giao dịch. Thanhlapcongtyonline.vn sẽ không chịu trách nhiệm đối với trường hợp
                  rủi ro phát sinh trong quá trình giao dịch từ trường hợp người sử dụng để lộ mật khẩu cho người khác.
                  Trường hợp phát hiện Mật khẩu bị lộ, người sử dụng cần nhanh chóng thay đổi lại Mật khẩu mới hoặc liên
                  hệ với thanhlapcongtyonline.vn để nhận được sự hỗ trợ.
                </Descriptions.Item>
                <Descriptions.Item label=" 2. Lỗi Hệ thống:" span={3}>
                  Khi sử dụng giao dịch trực tuyến, người sử dụng có thể gặp phải trường hợp bị lỗi khi truy cập vào
                  Internet hoặc các thiết bị điện tử khác; mất đường truyền, và chậm trễ trong việc truyền, nhận do việc
                  tắc nghẽn đường truyền hoặc vì lý do khác không thể dự báo trước, ngoài tầm kiểm soát của
                  thanhlapcongtyonline.vn và do vậy có thể dẫn đến các chậm trễ trong việc thực hiện các giao dịch trên
                  thanhlapcongtyonline.vn. Ngoài ra, người sử dụng mặc nhiên thừa nhận rằng thông tin và dữ liệu cá nhân
                  có thể bị bên thứ ba truy cập bất hợp pháp. Vì vậy người sử dụng mặc nhiên chấp nhận tất cả các rủi ro
                  có thể xảy ra khi truy cập và/hoặc thực hiện các giao dịch qua thanhlapcongtyonline.vn.
                </Descriptions.Item>

                <Descriptions.Item label="3. Virút:" span={3}>
                  thanhlapcongtyonline.vn sẽ không chịu trách nhiệm về bất cứ bồi thường, yêu cầu, hình phạt, tổn thất,
                  trách nhiệm, chi phí, hành động và phí tổn nào mà người sử dụng gánh chịu do hệ thống máy tính hoặc
                  thiết bị di động của người sử dụng kết nối với máy tính hoặc thiết bị di động khác bị vi rút trong
                  thời gian người sử dụng truy cập, sử dụng, tải dữ liệu trên thanhlapcongtyonline.vn. Người sử dụng
                  phải có trách nhiệm tự trang bị các phần mềm diệt vi rút cho máy tính hoặc thiết bị di động sử dụng để
                  truy cập thanhlapcongtyonline.vn.
                </Descriptions.Item>
                <Descriptions.Item label="4. Lỗi đường truyền Internet:" span={3}>
                  Người sử dụng nên dùng các gói thuê bao có tốc độ đường truyền cao và ổn định để việc giao dịch trực
                  tuyến qua Internet được nhanh, và ổn định nhất. Thanhlapcongtyonline.vn sẽ không chịu trách nhiệm
                  trong trường hợp mất lệnh, không thể hủy lệnh do lỗi đường truyền của người sử dụng.
                </Descriptions.Item>
                <Descriptions.Item
                  label="5.Người sử dụng cần phải thông báo với thanhlapcongtyonline.vn trong vòng không quá 01 giờ kể từ khi
                  người sử dụng nhận thấy có những tình trạng sau:"
                  span={3}
                >
                  <p> - Thất lạc hoặc bị đánh cắp tên sử dụng, mật khẩu. </p>
                  <p> - Mọi sự chiếm dụng một cách bất hợp pháp tên truy cập, mật khẩu.</p>
                  <p> - Sử dụng các dịch vụ được cung cấp trên thanhlapcongtyonline.vn một cách bất hợp pháp.</p>
                  <p>
                    - Các dấu hiệu sử dụng tài khoản/mật khẩu để thực hiện các giao dịch mà không có sự đồng ý, cho phép
                    của người sử dụng.
                  </p>
                  <p>
                    Bằng việc sử dụng các dịch vụ trên thanhlapcongtyonline.vn, người sử dụng mặc nhiên chấp thuận các
                    điều kiện và điều khoản sử dụng nêu trên. Trong trường hợp sửa đổi nội dung các điều kiện, điều
                    khoản sử dụng của thanhlapcongtyonline.vn, các nội dung sửa đổi sẽ được thông báo trên
                    thanhlapcongtyonline.vn. Việc người sử dụng tiếp tục sử dụng và tiếp tục thực hiện các yêu cầu dịch
                    vụ trên thanhlapcongtyonline.vn có nghĩa là người sử dụng đã chấp nhận hoàn toàn các sửa đổi đó.
                  </p>
                </Descriptions.Item>
              </Descriptions>{' '}
            </Card>
          </Panel>
          <Panel header="Chính sách mua hàng" key="2">
            <Card className={'box__shadow m-tb-5'}>
              <Descriptions
                title="I. Chính sách bảo mật thông tin người dùng khi sử dụng dịch vụ đăng ký doanh nghiệp của thanhlapcongtyonline.vn"
                layout="vertical"
                bordered
              >
                <Descriptions.Item label="1. Phương thức mua hàng" span={3}>
                  Quý khách hàng thanh toán trực tiếp tại website https://app.thanhlapcongtyonline.vn/
                </Descriptions.Item>
                <Descriptions.Item label="2. Hướng dẫn mua hàng" span={3}>
                  <p> Bước 1: Chọn sản phẩm, dịch vụ </p>
                  <p> Bước 2: Điền thông tin chi tiết theo hướng dẫn của website </p>
                  <p>Bước 3: Xem lại thông tin và thanh toán</p>
                </Descriptions.Item>

                <Descriptions.Item label="3. Hướng dẫn thanh toán" span={3}>
                  <p>
                    Quý khách hàng thanh toán qua cổng VNPAY: Quý khách thanh toán bằng thẻ tín dụng/ ghi nợ quốc tế đơn
                    giản và bảo mật tại Callie Silver qua ứng dụng hỗ trợ VNPAY.
                  </p>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Panel>
          <Panel header="Chính sách hoàn / huỷ" key="3">
            <Card className={'box__shadow m-tb-5'}>
              <Descriptions
                title="I. Chính sách bảo mật thông tin người dùng khi sử dụng dịch vụ đăng ký doanh nghiệp của thanhlapcongtyonline.vn"
                layout="vertical"
                bordered
              >
                <Descriptions.Item label="1. Điều kiện hoàn / huỷ" span={3}>
                  <p>
                    - Khách đã thanh toán nhưng một số trường hợp yêu cầu của khách không thể thực hiện được (do luật
                    không cho phép)
                  </p>
                  <p>- Khách hàng yêu cầu hoàn, huỷ và thanhlapcongtyonline.vn đồng ý hoàn, huỷ</p>
                </Descriptions.Item>

                <Descriptions.Item label="2. Phương thức hoàn, huỷ" span={3}>
                  <p>
                    Khách hàng liên hệ trực tiếp với chúng tôi qua hotline (+84) 91 681 4572 hoặc email
                    info@thanhlapcongtyonline.vn
                  </p>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}
