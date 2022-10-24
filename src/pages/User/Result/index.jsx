import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate, useSearchParams, useNavigationType, useOutletContext } from 'react-router-dom'
import { IssuesCloseOutlined, CheckCircleOutlined } from '@ant-design/icons'
export default function CCResult() {
  let [params] = useSearchParams()
  const { animateClass } = useOutletContext()

  let type = useNavigationType()

  let searchText = params.get('text')
  let orderId = params.get('orderId')
  let codeStatus = params.get('code')
  
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
      status={codeStatus !== '00' ? 'error' : 'success'}
      title={
        <>
          Mã đơn hàng: <b>{orderId}</b>
        </>
      }
      subTitle={<p>{codeStatus !== '00' ? searchText : 'đã được thanh toán thành công, vui lòng kiểm tra email sau 1 - 5 phút.'}</p>}
      extra={[
        <Button type="primary" onClick={() => navigate('/user/order')}>
          Kiểm tra đơn hàng
        </Button>,
        <Button onClick={() => navigate('/user/san-pham')}>Về trang sản phẩm</Button>,
      ]}
    />
  )
}
