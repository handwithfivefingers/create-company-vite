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
  const [logs, setLogs] = useState([])
  const [data, setData] = useState([])
  const [output, setOutput] = useState([])

  const logsRef = useRef([])
  const dataRef = useRef([])
  const outputRef = useRef([])
  const [tabIndex, setTabIndex] = useState([])

  const [containerHeight, setContainerHeight] = useState(100)

  const { isFetching, isLoading, status } = useQuery(
    ['logs'],
    async () => {
      let res = await AdminDashboardService.getLogs()
      setScreenData(res)
      return res
    },
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
      let { _logs, output, error } = data
      logsRef.current = [
        {
          ...logsRef.current,
          _logs,
          output,
          error,
        },
      ]
      dataRef.current = _logs

      outputRef.current = output.slice(0, 20)
    } catch (err) {
      console.log(err)
    }
  }

  const onScroll = (e, type) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === containerHeight) {
      if (type === 1) appendData()
      else if (type === 2) appendOutputData()
    }
  }
  const appendData = () => {
    let length = data.length
    let newData = data
    newData = [...newData, ...logs._logs?.slice(length, length + 20)]
    setData(newData)
  }

  const appendOutputData = () => {
    let length = output.length
    let newData = output
    newData = [...newData, ...logs.output?.slice(length, length + 20)]
    setOutput(newData)
  }

  return (
    <Row>
      <Col span={16}>
        <Card title="Logs hệ thống" className="box__shadow" >
          <Tabs
            defaultActiveKey="1"
            destroyInactiveTabPane
            className={clsx([styles.tabs, 'cc-card'])}
            animated={{ inkBar: true, tabPane: true }}
            onChange={(v) => setTabIndex(v)}
            value={tabIndex}
          >
            <TabPane tab="Truy cập" key="1" value={1}>
              {moment().format('[ngày] D [tháng] M [năm] y')}
              {/* <List
                className={clsx([styles.list, 'demo-loadmore-list'])}
                loading={loading}
                itemLayout="horizontal"
                dataSource={logs._logs}
                renderItem={(item) => (
                  <List.Item actions={[]} className={clsx([styles.listItem])}>
                    <Skeleton avatar title={false} loading={loading} active>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            className={clsx([styles.ava])}
                            size={{ xs: 12, sm: 18, md: 24, lg: 30, xl: 36, xxl: 42 }}
                            icon={<GrStatusWarning />}
                          />
                        }
                        title={new Date(item?.createdAt).toString('dd/MM/yyyy HH:mm')}
                        description={<span style={{ wordBreak: 'break-word' }}>{JSON.stringify(item.error)}</span>}
                      />
                    </Skeleton>
                  </List.Item>
                )}
              /> */}
              {/* <List loading={loading}>
                <VirtualList
                  data={data}
                  height={containerHeight}
                  itemHeight={50}
                  itemKey="Truy cập"
                  onScroll={(e) => onScroll(e, 1)}
                >
                  {(item, i) => (
                    <List.Item key={`Truy cập ${i}`}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            className={clsx([styles.ava])}
                            size={{ xs: 12, sm: 18, md: 24, lg: 30, xl: 36, xxl: 42 }}
                            icon={<GrStatusWarning />}
                          />
                        }
                        title={new Date(item?.createdAt).toString('dd/MM/yyyy HH:mm')}
                        description={
                          <span style={{ wordBreak: 'break-word' }}>
                            <pre style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                              {JSON.stringify(item.error, undefined, 1)}
                            </pre>
                          </span>
                        }
                      />
                    </List.Item>
                  )}
                </VirtualList>
              </List> */}
              <VirtualScroll data={dataRef.current} />
            </TabPane>
            <TabPane tab="Hệ thống" key="2" value={2}>
              <List loading={isLoading}>
                <VirtualList data={outputRef.current} height={containerHeight} itemHeight={50} itemKey="Hệ thống" onScroll={(e) => onScroll(e, 2)}>
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
                        title={item?.slice(0, 28)}
                        description={
                          <span style={{ wordBreak: 'break-word' }}>
                            {/* {item?.slice(29)} */}
                            <pre
                              style={{
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                              }}
                            >
                              {item?.slice(29)}
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
            <Card className="box__shadow"  title="Đơn hàng vừa tạo"></Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AdminDashboard
