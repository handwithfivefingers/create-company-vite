import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { LABEL, NEWLABEL } from '@/constant/FormConstant'
import CCDescription from '@/components/CCDescription'
import { checkVariable } from '@/helper/Common'
import { Form, Descriptions, Divider, Typography, Col, Row } from 'antd'
import _ from 'lodash'
import styles from './styles.module.scss'
import clsx from 'clsx'
import DissolutionPreview from './DissolutionPreview'
import PendingPreview from './PendingPreview'
import ChangeInfoPreview from './ChangeInfoPreview'

const { Paragraph, Text } = Typography
const PreviewData = forwardRef((props, ref) => {
  const [formData, setFormData] = useState([])

  useEffect(() => {
    if (ref.current) {
      let data = ref?.current.getFieldsValue()
      setFormData(data)
    }
  }, [props])

  const renderBaseForm = (list) => {
    let xhtml = []

    for (let item of list) {
      let title = ''
      let data = []

      if (item.title) title = item.title

      if (item.data) data = item.data

      if (item.data.length) {
        let list = renderFieldForm(data)
        xhtml.push(
          <>
            <h3>{title}</h3>
            {list}
          </>,
        )
      }
    }
    return xhtml
  }

  const renderFieldForm = (listData) => {
    let xhtml = []
    for (let item of listData) {
      /**
       * ITEM DATA:
        field: "base_val"
        fields: {num: 'Vốn điều lệ (bằng số)', char: 'Vốn điều lệ (bằng chữ)'}
        label: undefined
        name: (3) ['create_company', 'approve', 'base_val']
       */

      let { fields, label, name } = item

      let data = ref.current.getFieldValue(name)

      let loopItem = renderLoopItem({ data, fields, label })

      xhtml.push(
        <>
          <Divider orientationMargin={0} orientation="left" className={styles.margin_0}>
            <h5 className={clsx(styles.margin_0, styles.padding_4)}>{label} : </h5>
          </Divider>

          {loopItem}
        </>,
      )
    }
    return xhtml
  }

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
                  <Paragraph className={clsx(styles.margin_0, styles.padding_4)}>{`${itemKeys} : ${moment(dataKeys).format('DD/MM/YYYY')}`}</Paragraph>
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

  const getFieldsInfo = (pLabel, pData, pathName) => {
    // loop base on pData, not from constant;

    let result = []

    for (let key in pData) {
      let caseData = []

      let dataFields = pData[key]

      let pTitle = pLabel[key]?.title

      let labelFields = pLabel[key]?.fields

      for (let props in dataFields) {
        // props -> Field name 1

        let val = dataFields[props]

        if (typeof val === 'string' || typeof val === 'number') {
          let labelName = labelFields[props]

          caseData.push({
            field: props,
            name: [...pathName, key, props],
            label: labelName,
          })
        } else if (typeof val === 'object') {
          let labelName = labelFields[props]?.label

          caseData.push({
            field: props,
            name: [...pathName, key, props],
            label: labelName,
            fields: labelFields[props]?.fields ? labelFields[props].fields : [],
          })
        }
      }

      result.push({ title: pTitle, data: caseData })
    }

    return result
  }

  const renderPreviewData = (data) => {
    let xhtml = null

    try {
      if (data) {
        // console.table(data)

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

            let listProductItem = rest[productType] // dynamic Data

            let listLabel = NEWLABEL(productType) // Constant

            let list = getFieldsInfo(listLabel, listProductItem, productType)
            if (list.length) {
              let newList = renderBaseForm(list)
              xhtml = newList
            }
            break
          // let listProductItem = rest[productType] // dynamic Data

          // let listLabel = NEWLABEL(productType) // Constant

          // let list = getFieldsInfo(listLabel, listProductItem, productType)
          // if (list.length) {
          //   let newList = renderBaseForm(list)

          //   xhtml = newList
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

        if (!Array.isArray(obj[key]) && typeof obj[key] === 'object' && !moment(obj[key], 'DD-MM-YYYY', true).isValid()) {
          obj[key] = objectSorter(obj[key])
        }
        return obj
      }, {})

    return object
  }

  return formData ? <Row gutter={[8, 6]}>{renderPreviewData(formData)}</Row> : ''
})

export default PreviewData
