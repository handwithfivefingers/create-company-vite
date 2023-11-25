import { BarsOutlined, DeleteOutlined, FormOutlined, MoreOutlined, PlusSquareOutlined } from '@ant-design/icons'
import CCPagination from '@/components/CCPagination'
import TemplateMail from '@/components/Form/TemplateMail'
import AdminMailService from '@/service/AdminService/AdminMailService'
import { Button, Drawer, message, PageHeader, Segmented, Table } from 'antd'
import { memo, useEffect, useState } from 'react'
import styles from './styles.module.scss'

function ListTemplateMail() {
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
          onFinishScreen={() => {
            onClose()
            fetchTemplateMail()
          }}
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
          onFinishScreen={() => {
            onClose()
            fetchTemplateMail()
          }}
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
  const pagiConfigs = {
    current: data.current_page,
    pageSize: 10,
    total: data.count,
    onChange: (page, pageSize) => {
      fetchTemplateMail(page)
    },
    showSizeChanger: false,
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
          <PageHeader
            title={
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
            }
            style={{
              padding: '16px 0',
            }}
          />
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
      <div className={styles.contentWrapper}>
        <div className={styles.tableWrapper}>
          <Table
            size="small"
            bordered
            dataSource={data._template}
            loading={{
              spinning: loading,
              tip: 'Loading...',
              delay: 100,
            }}
            pagination={false}
            rowKey={(record) => record._id}
          >
            <Table.Column width={'40%'} title="Mẫu Email" dataIndex="name" render={(val, record, i) => val} />
            <Table.Column width={'60%'} title="Subject" dataIndex="subject" render={(val, record, i) => val} />

            <Table.Column
              width={'80px'}
              title="Action"
              render={(val, record, i) => (
                <span style={{ display: 'inline-block', width: 80 }}>
                  <Button type="primary" size="small" onClick={() => editTemplate(record)}>
                    <FormOutlined />
                  </Button>
                  <Button type="text" size="small" onClick={() => deleteTemplate(record)}>
                    <DeleteOutlined />
                  </Button>
                </span>
              )}
            />
          </Table>
        </div>
        <div className={styles.pagination}>
          <CCPagination {...pagiConfigs} />
        </div>
        <Drawer title={drawer.title} width={720} onClose={onClose} visible={drawer.visible}>
          {drawer.component}
        </Drawer>
      </div>
    </>
  )
}

const ListTemplateMailMemo = memo(ListTemplateMail)
export default ListTemplateMailMemo
