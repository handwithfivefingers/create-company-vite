import VirtualScroll from '@/components/VirtualScroll'
import AdminDashboardService from '@/service/AdminService/AdminDashboardService'
import { Avatar, Card, Col, List, message, Row, Skeleton, Tabs } from 'antd'
import clsx from 'clsx'
import VirtualList from 'rc-virtual-list'
import React, { useEffect, useState, useRef } from 'react'
import { GrStatusWarning } from 'react-icons/gr'
import styles from './styles.module.scss'
import { makeid } from '@/helper/Common'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
const { TabPane } = Tabs
const AdminDashboard = () => {
  const logsRef = useRef()

  const [containerHeight, setContainerHeight] = useState(100)

  const { data, isFetching, isLoading, status } = useQuery(
    ['logs'],
    async () => await AdminDashboardService.getLogs(),
    {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: true,
    },
  )

  useEffect(() => {
    layoutEffection()
  }, [])

  const layoutEffection = () => {
    let siteLayout = document.querySelector('.ant-layout-content')

    let { height } = siteLayout?.getBoundingClientRect()

    setContainerHeight(height - 156)
  }

  const setScreenData = async (res = null) => {
    try {
      if (!res) return
      let { data } = res?.data

      let { _logs } = data

      logsRef.current = _logs
    } catch (err) {
      console.log(err)
    }
  }

  const onScroll = (e, type) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === containerHeight) {
      appendData()
    }
  }

  const appendData = () => {
    let length = data.length
    let newData = data
    newData = [...newData, ...logs._logs?.slice(length, length + 20)]
    setData(newData)
  }

  if (data) {
    logsRef.current = data.data.data

    console.log('logsRef.current', logsRef.current)
  }

  return (
    <Row>
      <Col span={16}>
        <Card title="Logs hệ thống" className="box__shadow">
          <Tabs
            defaultActiveKey="1"
            destroyInactiveTabPane
            className={clsx([styles.tabs, 'cc-card'])}
            animated={{ inkBar: true, tabPane: true }}
          >
            <TabPane tab="Hệ thống" key="1" value={1}>
              <List loading={isLoading}>
                <VirtualList
                  data={logsRef?.current || []}
                  height={containerHeight}
                  itemHeight={50}
                  itemKey="Hệ thống"
                  onScroll={(e) => onScroll(e)}
                >
                  {(item, i) => (
                    <List.Item key={i}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            className={clsx([styles.ava])}
                            size={{
                              xs: 12,
                              sm: 18,
                              md: 24,
                              lg: 30,
                              xl: 36,
                              xxl: 42,
                            }}
                            icon={<GrStatusWarning />}
                          />
                        }
                        title={`Ngày khởi tạo : ${moment(item?.createdAt).format(
                          'HH [giờ] mm [phút],[ngày] DD [tháng] MM [năm] YYYY',
                        )}, Ip Connection: ${item.ip}`}
                        description={
                          <span style={{ wordBreak: 'break-word' }}>
                            {/* {item?.slice(29)} */}
                            <pre
                              style={{
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                              }}
                            >
                              {JSON.stringify(item?.data, null, 4)}
                            </pre>
                          </span>
                        }
                      />
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
      <Col span={8} style={{ paddingLeft: 12 }}>
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <Card className="box__shadow" title="Đơn hàng đã thanh toán"></Card>
          </Col>
          <Col span={24}>
            <Card className="box__shadow" title="Đơn hàng vừa tạo"></Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AdminDashboard
