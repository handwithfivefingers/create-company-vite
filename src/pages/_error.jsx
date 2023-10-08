import { Result, Button } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/reducer'
function Error() {
  let navigate = useNavigate()
  const { status } = useAuthStore()
  if (!status) return <Navigate to="/" />
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  )
}

export default Error
