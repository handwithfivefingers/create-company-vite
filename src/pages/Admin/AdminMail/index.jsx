import {
  DeleteOutlined,
  FormOutlined,
  PlusSquareOutlined,
  SearchOutlined,
  BarsOutlined,
  MoreOutlined,
} from '@ant-design/icons'

import {
  Button,
  Card,
  Col,
  Drawer,
  message,
  Popover,
  Row,
  Table,
  Tooltip,
  PageHeader,
  Segmented,
} from 'antd'
import parser from 'html-react-parser'
import { useEffect, useState, memo } from 'react'
import TemplateMail from '@/components/Form/TemplateMail'
import AdminMailService from '@/service/AdminService/AdminMailService'
import styles from './styles.module.scss'

function ListTemplateMail(props) {
  // const router = useRouter();
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false)

  const [segment, setSegment] = useState(1)

  const [drawer, setDrawer] = useState({
    title: '',
    visible: false,
    component: null,
    width: 0,
  })

  const fetchTemplateMail = async (page = 1) => {
    try {
      let params = { page: page }
      setLoading(true)
      let res = await AdminMailService.getTemplate(params)
      if (res.data.status === 200) {
        setData(res.data.data) // render 1 lan
      } else {
        message.error(res.data.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false) // render 2 lan
    }
  }

  useEffect(() => {
    fetchTemplateMail()
  }, [])

  const addTemplate = () => {
    setDrawer({
      ...drawer,
      title: 'Thêm mẫu mới',
      visible: true,
      width: '500px',
      component: (
        <TemplateMail
          onClose={onClose}
          type={1}
          onFinishScreen={() => fetchTemplateMail()}
        />
      ),
    })
  }

  const editTemplate = (record) => {
    setDrawer({
      ...drawer,
      title: 'Chỉnh sửa mẫu',
      visible: true,
      width: '500px',
      component: (
        <TemplateMail
          data={record}
          content={record.content}
          onClose={onClose}
          type={2}
          onFinishScreen={() => fetchTemplateMail()}
        />
      ),
    })
  }

  const onClose = () => {
    setDrawer({
      ...drawer,
      visible: false,
    })
  }

  const deleteTemplate = async (record) => {
    setLoading(true)
    try {
      let res = await AdminMailService.deleteTemplate(record._id)
      if (res.data.status === 200) {
        message.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      fetchTemplateMail()
    }
  }

  return (
    <>
      <div className={styles.headerWrapper}>
        {segment === 1 && (
          <PageHeader
            title="Template Mail"
            style={{
              padding: '16px 0',
            }}
          />
        )}
        {segment === 2 && (
          <Button
            key="add-template"
            type="text"
            onClick={() => addTemplate()}
            style={{
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PlusSquareOutlined /> Thêm mới
          </Button>
        )}
        <Segmented
          options={[
            {
              value: 1,
              icon: <BarsOutlined />,
            },
            {
              value: 2,
              icon: <MoreOutlined />,
            },
          ]}
          defaultValue={segment}
          onChange={(value) => setSegment(value)}
        />
      </div>

      <div style={{ padding: 8, background: '#fff' }}>
        <Table
          size="small"
          bordered
          dataSource={data._template}
          loading={{
            spinning: loading,
            tip: 'Loading...',
            delay: 100,
          }}
          pagination={{
            current: data.current_page,
            pageSize: 10,
            total: data.count,
            onChange: (page, pageSize) => {
              fetchTemplateMail(page)
            },
            showSizeChanger: false,
          }}
          sticky={{
            offsetScroll: 8,
            offsetHeader: -8,
          }}
          scroll={{ x: 1200 }}
          rowKey={(record) => record._id}
        >
          <Table.Column
            width={'20%'}
            title="Mẫu Email"
            dataIndex="name"
            render={(val, record, i) => val}
          />
          <Table.Column
            width={'20%'}
            title="Subject"
            dataIndex="subject"
            render={(val, record, i) => val}
          />
          <Table.Column
            title="Nội dung Email"
            width={'50%'}
            render={(val, record, i) => (
              <div className={styles.tableContent}>
                {parser(record?.content || '')}
              </div>
            )}
          />

          <Table.Column
            width={'10%'}
            title="Action"
            render={(val, record, i) => (
              <Row>
                <Col span={12}>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => editTemplate(record)}
                  >
                    <FormOutlined />
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => deleteTemplate(record)}
                  >
                    <DeleteOutlined />
                  </Button>
                </Col>
              </Row>
            )}
          />
        </Table>

        <Drawer
          title={drawer.title}
          width={720}
          onClose={onClose}
          visible={drawer.visible}
        >
          {drawer.component}
        </Drawer>
      </div>
    </>
  )
}

export default memo(ListTemplateMail)
