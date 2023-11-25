import ProfileService from '@/service/UserService/ProfileService'
import { Alert, Button, Card, Col, Form, Grid, Input, Row, Timeline, message } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useFetch } from '../../../helper/Hook'
import { useAuthStore } from '../../../store/reducer'

const { useBreakpoint } = Grid
const UserProfile = () => {
  const { animateClass } = useOutletContext()
  const authReducer = useAuthStore()
  const [profile] = Form.useForm()
  const screen = useBreakpoint()
  const [loading, setLoading] = useState(false)

  const {
    data: profileData,
    refetch,
    status,
    isLoading,
  } = useFetch({
    cacheName: ['userProfile'],
    fn: () => ProfileService.getProfile(),
    enabled: (authReducer.status && true) || false,
  })

  useEffect(() => {
    if (profileData?._id) {
      profile.setFieldsValue({
        email: profileData.email,
        name: profileData.name,
        phone: profileData.phone,
        _id: profileData._id,
      })
    }
  }, [isLoading])

  const onProfileChange = async (val) => {
    try {
      setLoading(true)
      const params = {
        ...val,
        _id: profile.getFieldValue('_id'),
      }
      await ProfileService.changeProfile(params)
      message.success('Cập nhật thành công')
      refetch()
    } catch (error) {
      console.log(error)
      message.error(error.toString())
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row className={animateClass ?? animateClass} gutter={[8, 8]}>
      <Col lg={8} sm={24} xs={24} md={12} order={!screen.md ? 1 : 0}>
        <Card title="Dòng thời gian" className={'box__shadow '} style={{ height: '100%' }}>
          <Timeline>
            {profileData?.createdAt && (
              <Timeline.Item>
                Khởi tạo tài khoản vào lúc {dayjs(profileData?.createdAt).format('DD/MM/YYYY')}
              </Timeline.Item>
            )}
            {dayjs(profileData?.updatedAt).unix() - dayjs(profileData?.createdAt).unix() > 0 && (
              <Timeline.Item>
                Cập nhật tài khoản vào lúc {dayjs(profileData?.updatedAt).format('DD/MM/YYYY')}
              </Timeline.Item>
            )}
          </Timeline>
        </Card>
      </Col>
      <Col lg={16} sm={24} xs={24} md={12} className={screen.md ? 'p-l-8' : ''}>
        <Card title="Thông tin cá nhân" className={'box__shadow '} style={{ height: '100%' }}>
          <Form onFinish={onProfileChange} form={profile} layout="vertical">
            <Form.Item label="Tên sở hữu" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại đăng nhập" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Email nhận thông tin" name="email">
              <Input />
            </Form.Item>
            <Form.Item>
              <Alert type="warning" message="Bạn sẽ cần đăng nhập lại sau khi cập nhật thông tin thành công" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default UserProfile
