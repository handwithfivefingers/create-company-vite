import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate, useSearchParams, useNavigationType, useOutletContext } from 'react-router-dom'

export default function CCResult() {
  let [params] = useSearchParams()
  const { animateClass } = useOutletContext()
  let type = useNavigationType()
  let searchText = params.get('text')
  let navigate = useNavigate()
  if (!searchText) {
    if (type !== 'POP') {
      navigate(-1)
    } else {
      navigate('/user')
    }
  }
  return (
    <Result
      className={animateClass}
      status="success"
      title={searchText}
      subTitle={`Mã đơn hàng: ${'2017182818828182881'} đã được thanh toán thành công, vui lòng kiểm tra email sau 1 - 5 phút.`}
      extra={[
        <Button type="primary" onClick={() => navigate('/user/order')}>
          Kiểm tra đơn hàng
        </Button>,
        <Button onClick={() => navigate('/user/san-pham')}>Về trang sản phẩm</Button>,
      ]}
    />
  )
}
