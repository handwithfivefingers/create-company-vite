// import ProfileService from '@/service/UserService/ProfileService'
// import { Button, Card, Col, Form, Grid, Input, message, Row } from 'antd'
// import clsx from 'clsx'
// import { useEffect, useRef, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate, useOutletContext } from 'react-router-dom'
// import CCInput from '../../../components/CCInput'
// import { useFetch } from '../../../helper/Hook'
// import styles from './styles.module.scss'
// const { useBreakpoint } = Grid

// const UserProfile = (props) => {
//   const [loading, setLoading] = useState(false)
//   const { animateClass } = useOutletContext()
//   const navigate = useNavigate()
//   const passRef = useRef()
//   const profileRef = useRef()
//   const screen = useBreakpoint()
//   const authReducer = useSelector((state) => state.authReducer)

//   const {
//     data: profileData,
//     refetch,
//     status,
//     isLoading,
//   } = useFetch({
//     cacheName: ['userProfile'],
//     fn: () => fetchProfile(),
//     enabled: (authReducer.status && true) || false,
//   })

//   const fetchProfile = () => ProfileService.getProfile()

//   const onPassChange = async (val) => {
//     try {
//       let { confirm_password, new_password, old_password } = val
//       if (!old_password) throw { message: 'Password is incorrect' }
//       if (confirm_password !== new_password) {
//         throw { message: 'Password does not match' }
//       }

//       let res = await ProfileService.changePassword(val)

//       if (res.data.status === 200) {
//         message.success(res.data.message)
//       } else {
//         throw { message: 'Something went wrong' }
//       }
//     } catch (err) {
//       message.error(err.message || err.response.data.error || err.response.data.message)
//     } finally {
//       refetch()
//     }
//   }

//   const onProfileChange = async (val) => {
//     try {
//       let res = await ProfileService.changeProfile(val)
//       if (!res) throw { message: 'Something went wrong' }

//       if (res.data.status === 200) {
//         message.success(res.data.message)
//       } else {
//         throw { message: 'Something went wrong' }
//       }
//     } catch (err) {
//       message.error(err.message || err.response.data.error || err.response.data.message)
//     } finally {
//       refetch()
//     }
//   }

//   useEffect(() => {
//     if (profileData) {
//       profileRef.current.setFieldsValue({
//         ...profileData,
//       })
//     }
//   }, [profileData])

//   return (
//     <Row className={animateClass ?? animateClass}>
//       <Col lg={8} sm={24} xs={24} md={12} order={!screen.md ? 1 : 0}>
//         <Card title="Đổi mật khẩu" className={'box__shadow '}>
//           <Form onFinish={onPassChange} ref={passRef} layout="vertical">
//             <CCInput type="password" label="Mật khẩu hiện tại" name="old_password" />
//             <CCInput type="password" label="Mật khẩu mới" name="new_password" />
//             <CCInput type="password" label="Xác thực mật khẩu" name="confirm_password" />
//             <Form.Item>
//               <div className={clsx(styles.dFlex, styles.fCol)}>
//                 <div>
//                   <Button type="primary" htmlType="submit" loading={isLoading}>
//                     Xác nhận
//                   </Button>
//                 </div>
//                 <div>
//                   <Button type="link" onClick={() => navigate('/forgot-password')}>
//                     Quên mật khẩu
//                   </Button>
//                 </div>
//               </div>
//             </Form.Item>
//           </Form>
//         </Card>
//       </Col>
//       <Col lg={16} sm={24} xs={24} md={12} className={screen.md ? 'p-l-8' : ''}>
//         <Card title="Thông tin cá nhân" className={'box__shadow '}>
//           <Form onFinish={onProfileChange} ref={profileRef} layout="vertical">
//             <Form.Item label="Name" name="name">
//               <Input />
//             </Form.Item>
//             <Form.Item label="Phone" name="phone">
//               <Input />
//             </Form.Item>
//             <Form.Item label="Email" name="email">
//               <Input />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" loading={loading}>
//                 Xác nhận
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>
//       </Col>
//     </Row>
//   )
// }

// export default UserProfile

import { Card, Grid, Row, Col } from 'antd'
import { useNavigate, useOutletContext } from 'react-router-dom'
const { useBreakpoint } = Grid
const UserProfile = () => {
  const { animateClass } = useOutletContext()
  const navigate = useNavigate()
  const screen = useBreakpoint()
  return (
    <Row className={animateClass ?? animateClass} gutter={[8, 8]}>
      <Col lg={8} sm={24} xs={24} md={12} order={!screen.md ? 1 : 0}>
        <Card title="" className={'box__shadow '} style={{ height: '100%' }}></Card>
      </Col>
      <Col lg={16} sm={24} xs={24} md={12} className={screen.md ? 'p-l-8' : ''}>
        <Card title="" className={'box__shadow '} style={{ height: '100%' }}></Card>
      </Col>
    </Row>
  )
}

export default UserProfile
