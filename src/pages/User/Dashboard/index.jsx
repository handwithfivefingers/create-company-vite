import { Card, Col, Row, Tabs } from 'antd'
import React from 'react'
import { m } from 'framer-motion'
import styles from './styles.module.scss'

import clsx from 'clsx'
// import html2canvas from 'html2canvas'
// import { useEffect } from 'react'

// var pdfMake
// var pdfFonts

const UserDashboard = () => {
  // useEffect(() => {
  //   loadPdfMake()
  // }, [])

  // const loadPdfMake = async () => {
  //   pdfMake = await import('pdfmake/build/pdfmake')
  //   pdfFonts = await import('pdfmake/build/vfs_fonts')
  //   pdfMake.vfs = pdfFonts.pdfMake.vfs
  // }

  // const applyCanvas = async () => {
  //   let listItem = document.querySelectorAll(`.${styles.size__A4}`)
  //   let img = []

  //   for (let i = 0; i < listItem.length; i++) {
  //     let canvas = await html2canvas(listItem[i], { scale: 2.5, allowTaint: false, useCORS: false })
  //     img.push(canvas.toDataURL('image/jpeg', 1.0))
  //   }
  //   return img
  // }
  // const renderPDF = async () => {
  //   let img = await applyCanvas()
  //   var docDefinition = {
  //     content: img.map((item) => ({ image: item, width: 600 })),
  //     pageSize: 'A4',
  //     pageMargins: [0, 0, 0, 0],
  //   }
  //   pdfMake.createPdf(docDefinition).open()
  // }
  return (
    <m.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Row gutter={[0, 12]}>
        {/* <Col span={16}>
          <Card title="Changelog thanhlapcongtyonline.vn"></Card>
        </Col>
        <Col span={8}>
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <Card title="Đơn hàng đã thanh toán"></Card>
            </Col>
            <Col span={24}>
              <Card title="Đơn hàng vừa tạo"></Card>
            </Col>
          </Row>
        </Col> */}
        {/* <button onClick={renderPDF}> genPDF</button> */}

        <Col span={24}>
          {/* <div className={styles.pages}>
            <div className={clsx(styles.size__A4, styles.page)}>
              <div className={styles.content}>
                {[...Array(100)].map((item, i) => (
                  <div>item{i}</div>
                ))}
              </div>
            </div>
            <div className={clsx(styles.size__A4, styles.page)}>hehe 1 </div>
            <div className={clsx(styles.size__A4, styles.page)}>hehe 2</div>
          </div> */}
        </Col>
      </Row>
    </m.div>
  )
}

export default UserDashboard
