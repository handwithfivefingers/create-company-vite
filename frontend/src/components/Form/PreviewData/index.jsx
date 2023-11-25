import { MessageAction } from '@/store/actions'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Alert, Col, Row, Tooltip } from 'antd'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChangeInfoPreview from './ChangeInfoPreview'
import CreateCompanyPreview from './CreateCompanyPreview'
import DissolutionPreview from './DissolutionPreview'
import PendingPreview from './PendingPreview'
const PreviewData = forwardRef(({ active, ...props }, ref) => {
  const [formData, setFormData] = useState([])
  const { errorList } = useSelector((state) => state.messageReducer)
  const dispatch = useDispatch()

  const isActive = active
  useEffect(() => {
    if (ref.current) {
      if (isActive) {
        const data = ref?.current.getFieldsValue()
        setFormData(data)
      }
    }
  }, [active])

  const renderPreviewData = (data) => {
    let xhtml = null

    try {
      if (data) {
        const { category, products, ...rest } = data

        let [productType] = Object.keys(rest) // get keys Product

        switch (productType) {
          case 'dissolution':
            xhtml = <DissolutionPreview data={rest[productType]} />
            break

          case 'pending':
            xhtml = <PendingPreview data={rest[productType]} />
            break

          case 'change_info':
            xhtml = <ChangeInfoPreview data={rest[productType]} />
            break

          case 'create_company':
            xhtml = <CreateCompanyPreview data={rest[productType]} />
            break
        }
      }
    } catch (error) {
      console.log('renderPreviewData', error)
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return xhtml
    }
  }

  const renderErrorMessage = useMemo(() => {
    if (!errorList?.length) return null
    return (
      <Col span={24}>
        <Alert
          type="error"
          message={<Message />}
          description={
            <ul style={{ paddingLeft: 20 }}>
              {errorList.map((item) => (
                <li key={[item.errors]}>{item.errors}</li>
              ))}
            </ul>
          }
          closable
          onClose={() => dispatch(MessageAction.clearMessage())}
        />
      </Col>
    )
  }, [errorList])

  if (!isActive) return ''

  return formData ? (
    <Row gutter={[8, 6]}>
      {renderErrorMessage}
      {renderPreviewData(formData)}
    </Row>
  ) : (
    ''
  )
})

const Message = () => {
  return (
    <b>
      Vui lòng điền đầy đủ thông tin trước khi Thanh toán
      <Tooltip
        placement="topLeft"
        title={
          <ul>
            <li>- Đối với trường hợp thanh toán, cần phải điền hết các field yêu cầu.</li>
            <li>- Đối với trường hợp lưu lại để chỉnh sửa, không có điều kiện kèm theo</li>
          </ul>
        }
      >
        <InfoCircleOutlined style={{ cursor: 'pointer', fontSize: 16, marginLeft: 4 }} />
      </Tooltip>
    </b>
  )
}

PreviewData.displayName = 'PreviewData'
export default PreviewData
