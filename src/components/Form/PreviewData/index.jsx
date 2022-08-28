import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import moment from 'moment'
import { LABEL, NEWLABEL } from '@/constant/FormConstant'
import CCDescription from '@/components/CCDescription'
import { checkVariable } from '@/helper/Common'
import { Form, Descriptions, Divider, Typography, Col, Row } from 'antd'
import _ from 'lodash'
const listOfFields = [
  'company_opt_career',
  'include',
  'exclude',
  'detail_after',
  'company_main_career',
  'list_president',
  'contribute_members',
]
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
          <Divider orientationMargin={0} orientation="left">
            <h5>{label} </h5>
          </Divider>

          {loopItem}
        </>,
      )
    }
    return xhtml
  }

  const renderLoopItem = ({ data, fields, label }) => {
    // const FIELD_SORTER = [
    //   'name',
    //   'title',
    //   'gender',
    //   'birth_day',
    //   'per_type',
    //   'doc_code',
    //   'doc_time_provide',
    //   'doc_place_provide',
    // ]
    let xhtml = []
    if (typeof data === 'string') {
      let text = data
      if (text === 'personal') text = 'Thành viên góp vốn là cá nhân'
      else if (text === 'organization') text = 'Thành viên góp vốn là tổ chức'

      xhtml.push(<Paragraph>{text}</Paragraph>)
    } else if (typeof data === 'object') {
      if (Array.isArray(data)) {
        return data.map((item, i) => {
          const ordered = objectSorter(item)
          return (
            <Col span={8}>
              <p>{[label, ' ', i + 1]}</p>
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
                <Divider dashed orientationMargin={12} orientation="left">
                  {title}
                </Divider>

                {renderLoopItem({
                  data: dataKeys,
                  fields: itemKeys.fields,
                })}
                <Divider dashed />
              </>
            )
          } else {
            if (
              itemKeys !== 'Vốn điều lệ (bằng số)' &&
              moment(dataKeys, 'DD-MM-YYYY', true).isValid()
            ) {
              return (
                itemKeys && (
                  <Paragraph>{`${itemKeys}: ${moment(dataKeys).format(
                    'DD/MM/YYYY',
                  )}`}</Paragraph>
                )
              )
            } else {
              return (
                itemKeys && <Paragraph>{`${itemKeys}: ${dataKeys}`}</Paragraph>
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

        if (typeof val === 'string') {
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

  /**
   *
   * @param {*Old Object} obj
   * @param {*New Object} newKeys
   * @returns {* Array
   */

  const renameKeys = (obj, newKeys) => {
    const keyValues =
      obj &&
      Object.keys(obj)?.map((key) => {
        // key => code name value
        const newKey = newKeys?.[key] || key
        if (typeof newKeys[key] === 'object') {
          let newK = newKeys?.[key]
          let oldK = obj?.[key]
          return renameKeys(oldK, newK)
        }

        return { [newKey]: obj[key] }
      })
    return keyValues
  }

  const renderPreviewData = (data) => {
    let xhtml = null

    try {
      if (data) {
        let { selectProduct, selectChildProduct, ...rest } = data

        let productType = Object.keys(rest) // get keys Product

        let listProductItem = rest[productType] // dynamic Data

        let listLabel = NEWLABEL(productType) // Constant

        let list = getFieldsInfo(listLabel, listProductItem, productType)

        if (list.length) {
          let newList = renderBaseForm(list)

          xhtml = newList
        }
      }
    } catch (error) {
      console.log('renderPreviewData', error)
    } finally {
      return xhtml
    }
  }

  const sorter = (a, b) => {
    // if (arr.includes(a)) {
    //   return 1
    // }
    // if (arr.includes(b)) {
    //   return -1
    // }

    // 'name',
    // 'title',
    // 'gender',
    // 'birth_day',
    // 'per_type',
    // 'doc_code',
    // 'doc_time_provide',
    // 'doc_place_provide',

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

  return formData ? (
    <Row gutter={[16, 12]} style={{ margin: 0 }}>
      {renderPreviewData(formData)}
    </Row>
  ) : (
    ''
  )
})

export default PreviewData
