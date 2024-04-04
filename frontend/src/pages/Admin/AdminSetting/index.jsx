import AdminHeader from '@/components/Admin/AdminHeader'
import AdminMailService from '@/service/AdminService/AdminMailService'
import AdminSettingService from '@/service/AdminService/AdminSettingService'
import { Card, message } from 'antd'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

const AdminSetting = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchTemplateMail()
    fetchSetting()
  }, [])

  const fetchTemplateMail = async (page = 1) => {
    setLoading(true)
    let params = { page: page }
    try {
      let res = await AdminMailService.getTemplate(params)
      if (res.data.status === 200) {
        setOptions(res.data.data._template)
      } else {
        message.error(res.data.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSetting = async () => {
    try {
      setLoading(true)
      let res = await AdminSettingService.getSetting()
      setSettingMail(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AdminHeader title="Cài đặt" />
      <div className={styles.grid}>
        <Card className={clsx('box__shadow', styles.gridItem)} onClick={() => navigate('./payment')}>
          Thanh toán
        </Card>
        <Card className={clsx('box__shadow', styles.gridItem)} onClick={() => navigate('./mail')}>
          Template Mail
        </Card>
      </div>
    </>
  )
}

export default AdminSetting
