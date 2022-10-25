// import WebViewer from "@pdftron/webviewer";
import WebViewer from '@pdftron/webviewer'
import { Button, Card, Drawer, Form, Input, message, Modal, Space } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { RiPlayList2Fill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import PDFViewer from '@/components/PDFViewer'
import AdminOrderService from '@/service/AdminService/AdminOrderService'

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
      {/* <Button
        type="primary"
        onClick={showDrawer}
        style={{
          position: 'fixed',
          top: ' 50%',
          right: 0,
          transform: ' translate(0,-50%)',
        }}
      >
        Edit
      </Button> */}

      <PDFViewer data={data} />
    </>
  )
}
