// import WebViewer from "@pdftron/webviewer";
import PDFViewer from '@/components/PDFViewer'
import AdminOrderService from '@/service/AdminService/AdminOrderService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ClassComponentText(props) {
  // const [visible, setVisible] = useState(false)
  const [data, setData] = useState()

  const slug = useParams()

  useEffect(() => {
    getScreenData(slug)
  }, [])

  // const showDrawer = () => {
  //   setVisible(true)
  // }

  const getScreenData = (slug) => {
    AdminOrderService.getOrderBySlug(slug)
      .then((res) => {
        if (res.data.status === 200) {
          // console.log(res);
          let { data } = res.data
          setData(data)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <PDFViewer data={data} />
    </>
  )
}
