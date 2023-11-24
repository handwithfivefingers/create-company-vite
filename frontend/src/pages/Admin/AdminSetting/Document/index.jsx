import AdminHeader from '@/components/Admin/AdminHeader'
import { CarryOutOutlined, FormOutlined, CheckOutlined } from '@ant-design/icons'
import { Card, Col, Form, List, Row, Spin, Tree, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { FcFolder } from 'react-icons/fc'
import AdminFileService from '../../../../service/AdminService/AdminFileService'
// const treeData = [
//   {
//     title: 'Thành lập doanh nghiệp',
//     key: '0-0',
//     icon: <FcFolder fontSize={20} />,
//     children: [
//       {
//         title: 'parent 1-0',
//         key: '0-0-0',
//         icon: <FcFolder fontSize={20} />,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-0-0-0',
//             icon: <CarryOutOutlined />,
//           },
//           {
//             title: (
//               <>
//                 <div>multiple line title</div>
//                 <div>multiple line title</div>
//               </>
//             ),
//             key: '0-0-0-1',
//             icon: <CarryOutOutlined />,
//           },
//           {
//             title: 'leaf',
//             key: '0-0-0-2',
//             icon: <CarryOutOutlined />,
//           },
//         ],
//       },
//       {
//         title: 'parent 1-1',
//         key: '0-0-1',
//         icon: <FcFolder fontSize={20} />,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-0-1-0',
//             icon: <CarryOutOutlined />,
//           },
//         ],
//       },
//       {
//         title: 'parent 1-2',
//         key: '0-0-2',
//         icon: <FcFolder fontSize={20} />,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-0-2-0',
//             icon: <CarryOutOutlined />,
//           },
//           {
//             title: 'leaf',
//             key: '0-0-2-1',
//             icon: <CarryOutOutlined />,
//             switcherIcon: <FormOutlined />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Thay đổi thông tin',
//     key: '0-1',
//     icon: <FcFolder fontSize={20} />,
//     children: [
//       {
//         title: 'parent 2-0',
//         key: '0-1-0',
//         icon: <FcFolder fontSize={20} />,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-1-0-0',
//             icon: <CarryOutOutlined />,
//           },
//           {
//             title: 'leaf',
//             key: '0-1-0-1',
//             icon: <CarryOutOutlined />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Tạm hoãn',
//     key: '0-2',
//     icon: <FcFolder fontSize={20} />,
//     children: [
//       {
//         title: 'parent 2-0',
//         key: '0-1-0',
//         icon: <FcFolder fontSize={20} />,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-1-0-0',
//             icon: <CarryOutOutlined />,
//           },
//           {
//             title: 'leaf',
//             key: '0-1-0-1',
//             icon: <CarryOutOutlined />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Giải thể',
//     key: '0-3',
//     icon: <FcFolder fontSize={20} />,
//     children: [
//       {
//         title: 'parent 2-0',
//         key: '0-1-0',
//         icon: <FcFolder fontSize={20} />,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-1-0-0',
//             icon: <CarryOutOutlined />,
//           },
//           {
//             title: 'leaf',
//             key: '0-1-0-1',
//             icon: <CarryOutOutlined />,
//           },
//         ],
//       },
//     ],
//   },
// ]

const SettingDocument = (props) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [showLine, setShowLine] = useState(true)
  const [showIcon, setShowIcon] = useState(false)
  const [showLeafIcon, setShowLeafIcon] = useState(true)
  const [data, setData] = useState([])
  const [listFiles, setListFiles] = useState([])
  useEffect(() => {
    getScreenData()
  }, [])

  const getScreenData = async () => {
    try {
      const resp = await AdminFileService.getFileCate()
      const { data: responesData } = resp.data.data
      const fullFormatData = formatData(responesData)
      setData(fullFormatData)
    } catch (error) {
      console.log('error', error)
    }
  }

  const getListFiles = async (_id) => {
    try {
      setLoading(true)
      const resp = await AdminFileService.onGetListFiles({ fileCategory: _id })
      console.log('resp', resp)
      setListFiles(resp.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const formatData = (_data) => {
    const result = []
    for (let item of _data) {
      result.push({
        title: item.name,
        key: item._id,
        icon: <FcFolder fontSize={20} />,
        children: item?.children ? formatData(item.children) : [],
      })
    }
    return result
  }

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
    const { expanded } = info.node
    if (expanded) return // Parent
    const [_id] = selectedKeys
    console.log('selectedKeys')
    getListFiles(_id)
  }

  const handleLeafIconChange = (value) => {
    if (value === 'custom') {
      return setShowLeafIcon(<CheckOutlined />)
    }
    if (value === 'true') {
      return setShowLeafIcon(true)
    }
    return setShowLeafIcon(false)
  }

  const onFinish = (value) => {}

  const uploadFile = async () => {
    try {
    } catch (error) {}
  }

  return (
    <>
      <AdminHeader title="Cài đặt > Tài liệu" />

      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[12, 12]}>
          <Col span={16}>
            <Card className="box__shadow">
              <h3>Cài đặt</h3>
              <List
                dataSource={listFiles}
                renderItem={(doc) => (
                  <List.Item>
                    <Typography.Text mark>[Document]</Typography.Text> {doc.fileName}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="box__shadow">
              <h3>Tài liệu</h3>
              <Spin spinning={loading}>
                <Tree showLine showIcon onSelect={onSelect} treeData={data} />
              </Spin>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default SettingDocument
