import { Alert, Col, Divider, Row, Tooltip, Typography } from 'antd'
import clsx from 'clsx'
import moment from 'moment'
import { forwardRef, useEffect, useState, useMemo } from 'react'
import ChangeInfoPreview from './ChangeInfoPreview'
import CreateCompanyPreview from './CreateCompanyPreview'
import DissolutionPreview from './DissolutionPreview'
import PendingPreview from './PendingPreview'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { InfoCircleOutlined } from '@ant-design/icons'
import { MessageAction } from '@/store/actions'
const { Paragraph, Text } = Typography
const PreviewData = forwardRef((props, ref) => {
  const [formData, setFormData] = useState([])
  const { errorList } = useSelector((state) => state.messageReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    if (ref.current) {
      let data = ref?.current.getFieldsValue()
      setFormData(data)
    }
  }, [props])

  const renderLoopItem = ({ data, fields, label }) => {
    let xhtml = []

    if (typeof data === 'string' || typeof data === 'number') {
      let text = data
      if (text === 'personal') text = 'Thành viên góp vốn là cá nhân'
      else if (text === 'organization') text = 'Thành viên góp vốn là tổ chức'

      xhtml.push(<Paragraph className={clsx(styles.margin_0, styles.padding_4)}>{text}</Paragraph>)
    } else if (typeof data === 'object') {
      if (Array.isArray(data)) {
        return data.map((item, i) => {
          const ordered = objectSorter(item)

          return (
            <Col lg={8} md={12} sm={24} xs={24} key={[Math.random(), i]}>
              <p className={styles.margin_0}>
                <strong>{[label, ' ', i + 1]}</strong>
              </p>
              {renderLoopItem({ data: ordered, fields, label })}
            </Col>
          )
        })
      } else {
        let result = Object.keys(data).map((key) => {
          let dataKeys = data?.[key]

          let itemKeys = fields?.[key]

          if (typeof itemKeys === 'object' && itemKeys.label) {
            let title = itemKeys.label
            return (
              <>
                <Divider dashed orientation="left" className={styles.margin_0}>
                  {title} :
                </Divider>

                {renderLoopItem({
                  data: dataKeys,
                  fields: itemKeys.fields,
                })}
                <Divider dashed className={styles.margin_0} />
              </>
            )
          } else {
            if (itemKeys !== 'Vốn điều lệ (bằng số)' && moment(dataKeys, 'DD-MM-YYYY', true).isValid()) {
              return (
                itemKeys && (
                  <Paragraph className={clsx(styles.margin_0, styles.padding_4)}>{`${itemKeys} : ${moment(
                    dataKeys,
                  ).format('DD/MM/YYYY')}`}</Paragraph>
                )
              )
            } else {
              return (
                itemKeys && (
                  <Col span={24}>
                    <Paragraph className={clsx(styles.margin_0, styles.padding_4)}>
                      <span style={{ color: 'rgba(84, 84, 84, 0.8)' }}>{itemKeys} : </span>
                      {dataKeys}
                    </Paragraph>
                  </Col>
                )
              )
            }
          }
        })

        xhtml.push(result)
      }
    }

    return xhtml
  }

  const renderPreviewData = (data) => {
    let xhtml = null

    try {
      if (data) {
        let { category, products, ...rest } = data

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
      return xhtml
    }
  }

  const sorter = (a, b) => {
    if (a == 'organization') return 1
    if (b == 'organization') return -1

    if (a == 'name') return 1
    if (b == 'name') return -1

    if (a == 'title') return 1
    if (b == 'title') return -1

    if (a == 'gender') return 1
    if (b == 'gender') return -1

    if (a == 'birth_day') return 1
    if (b == 'birth_day') return -1

    if (a == 'per_type') return 1
    if (b == 'per_type') return -1

    if (a == 'doc_code') return 1
    if (b == 'doc_code') return -1

    if (a == 'doc_time_provide') return 1
    if (b == 'doc_time_provide') return -1

    if (a == 'doc_place_provide') return 1
    if (b == 'doc_place_provide') return -1

    if (a == 'city') return 1
    if (b == 'city') return -1

    if (a == 'district') return 1
    if (b == 'district') return -1

    if (a == 'town') return 1
    if (b == 'town') return -1

    if (a == 'address') return 1
    if (b == 'address') return -1

    return 0
  }

  const objectSorter = (item) => {
    let object = {}
    object = Object?.keys(item)
      .sort((a, b) => sorter(a, b))
      .reverse()
      .reduce((obj, key) => {
        obj[key] = item[key]

        if (
          !Array.isArray(obj[key]) &&
          typeof obj[key] === 'object' &&
          !moment(obj[key], 'DD-MM-YYYY', true).isValid()
        ) {
          obj[key] = objectSorter(obj[key])
        }
        return obj
      }, {})

    return object
  }

  const renderErrorMessage = useMemo(() => {
    if (!errorList?.length) return null
    return (
      <Col span={24}>
        <Alert
          type="error"
          message={
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
          }
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

  return formData ? (
    <Row gutter={[8, 6]}>
      {renderErrorMessage}

      {renderPreviewData(formData)}
    </Row>
  ) : (
    ''
  )
})

export default PreviewData
