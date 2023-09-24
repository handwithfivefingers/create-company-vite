import { VALIDATE_MESSAGE } from '@/constant/InputValidate'
import { onSetFields } from '@/helper/Common'
import { Form, Select } from 'antd'
import clsx from 'clsx'
import moment from 'moment'
import React, { forwardRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductService from '../../../service/UserService/ProductService'
import BaseInformation from './BaseInformation'
import CapNhatThongTinDangKy from './CapNhatThongtinDangKy'
import DaiDienPhapLuat from './DaiDienPhapLuat'
import styles from './DaiDienPhapLuat/styles.module.scss'
import DiaChiTruSoChinh from './DiaChiTruSoChinh'
import GiamVonDieuLe from './GiamVonDieuLe'
import HopDongChuyenNhuong from './HopDongChuyenNhuong'
import NganhNgheKinhDoanh from './NganhNgheKinhDoanh'
import TangVonDieuLe from './TangVonDieuLe'
import TenDoanhNghiep from './TenDoanhNghiep'
import { useStepAPI, useStepData } from '../../../context/StepProgressContext'

const TYPE_NAME = {
  1: ['change_info', 'location'],
  2: ['change_info', 'legal_representative'],
  3: ['change_info', 'name'],
  4: ['change_info', 'down_authorized_capital'],
  5: ['change_info', 'up_authorized_capital'],
  6: ['change_info', 'transfer_contract'],
  7: ['change_info', 'company_career'],
  10: ['change_info', 'tax'],
}

const ChangeInforForm = forwardRef((props, ref) => {
  const [productSelect, setProductSelect] = useState('')

  const [selectType, setSelectType] = useState([])

  const [data, setData] = useState([])

  let location = useLocation()

  const { onCreateStep } = useStepAPI()

  useEffect(() => {
    if (location?.state) {
      initDataforEditing()
    }
  }, [location])

  useEffect(() => {
    if (data && productSelect) {
      let listMatch = []
      let productsList = ref.current.getFieldValue(['products'])

      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        let isMatch = productsList?.some((prod) => prod._id === item._id)
        if (isMatch) listMatch.push(item)
      }

      listMatch = listMatch.map((item) => ({
        children: item.name,
        key: item._id,
        type: item.type,
        value: item._id,
      }))

      ref.current?.setFieldsValue({
        products: listMatch,
      })

      handleUpdateProgressAndComponent(null, listMatch)
    }
  }, [data])

  const initDataforEditing = () => {
    let _data = {}
    let cate = {}

    let { state } = location

    let { category, products, data } = state

    if (!category) return

    if (products) _data.products = products

    if (data) {
      let { change_info } = state.data

      cate = {
        type: category.type,
        value: category._id,
        name: category.name,
      }
      _data.category = cate

      if (change_info) {
        let { legal_representative, transfer_contract, base_inform, update_info, ...restInfo } = change_info

        if (base_inform) {
          base_inform.mst_provide = moment(base_inform?.mst_provide, 'YYYY-MM-DD')
        }

        let shallowLegalInformation = getLegalInformationProps(legal_representative)

        let shallowTransferContact = getTransferContactProps(transfer_contract)

        let shallowUpdateInfo = getInformationProps(update_info)

        change_info = {
          ...restInfo,
          base_inform,
          update_info: shallowUpdateInfo,
          legal_representative: shallowLegalInformation,
          transfer_contract: shallowTransferContact,
        }

        _data.change_info = change_info
      }
    }

    ref.current?.setFieldsValue({
      ..._data,
    })

    setProductSelect(cate)

    onSetFields(['category'], cate, ref)

    fetchProduct(cate.value)
  }

  const getTransferContactProps = (data) => {
    let shallowTransfer = { ...data }

    if (shallowTransfer) {
      let { A_side, B_side } = shallowTransfer

      if (A_side) {
        let { personal, organization } = A_side

        if (personal) {
          personal = {
            ...personal,
            birth_day: moment(personal?.birth_day, 'YYYY-MM-DD'),
            doc_time_provide: moment(personal?.doc_time_provide, 'YYYY-MM-DD'),
          }
        }

        if (organization) {
          organization = {
            ...organization,
            mst_provide: moment(organization?.mst_provide, 'YYYY-MM-DD'),
          }
        }

        A_side = {
          ...A_side,
          personal,
          organization,
        }
      }

      if (B_side) {
        let { personal, organization } = B_side
        if (personal) {
          personal = {
            ...personal,
            birth_day: moment(personal?.birth_day, 'YYYY-MM-DD'),
            doc_time_provide: moment(personal?.doc_time_provide, 'YYYY-MM-DD'),
          }
        }
        if (organization) {
          organization = {
            ...organization,
            time_provide: moment(organization?.time_provide, 'YYYY-MM-DD'),
          }
        }

        B_side = {
          ...B_side,
          personal,
          organization,
        }
      }
      shallowTransfer = {
        ...shallowTransfer,
        A_side,
        B_side,
      }
    }
    return shallowTransfer
  }

  const getLegalInformationProps = (data) => {
    let shallowLegal = { ...data }
    if (shallowLegal) {
      let { in_out, after_change, ...restLegal } = shallowLegal

      if (in_out) {
        in_out = in_out.map((item) => {
          return {
            ...item,
            birth_day: moment(item.birth_day, 'YYYY-MM-DD'),
            doc_time_provide: moment(item.doc_time_provide, 'YYYY-MM-DD'),
          }
        })
      }

      if (after_change) {
        after_change = after_change.map((item) => {
          return {
            ...item,
            birth_day: moment(item.birth_day, 'YYYY-MM-DD'),
            doc_time_provide: moment(item.doc_time_provide, 'YYYY-MM-DD'),
          }
        })
      }

      shallowLegal = {
        ...restLegal,
        in_out,
        after_change,
      }
    }
    return shallowLegal
  }

  const getInformationProps = (update_info) => {
    let shallowUpdate = { ...update_info }
    if (shallowUpdate) {
      let { information, ...restInformation } = shallowUpdate

      if (information) {
        if (information.birth_day) {
          information.birth_day = moment(new Date(information.birth_day))
        }
        if (information.doc_time_provide) {
          information.doc_time_provide = moment(new Date(information.doc_time_provide))
        }
      }

      shallowUpdate = {
        ...restInformation,
        information,
      }
    }
    return shallowUpdate
  }

  const checkType = (type, i, ref) => {
    switch (type) {
      case '2':
        return (
          <DaiDienPhapLuat
            key={[type, i]}
            current={props.current}
            index={i + 2}
            ref={ref}
            {...props.data}
            type={productSelect?.type}
          />
        )
      case '3':
        return (
          <TenDoanhNghiep
            key={[type, i]}
            current={props.current}
            index={i + 2}
            ref={ref}
            {...props.data}
            type={productSelect?.type}
          />
        )
      case '4':
        return (
          <GiamVonDieuLe
            key={[type, i]}
            current={props.current}
            index={i + 2}
            ref={ref}
            {...props.data}
            type={productSelect?.type}
          />
        )
      case '5':
        return (
          <TangVonDieuLe
            key={[type, i]}
            current={props.current}
            index={i + 2}
            ref={ref}
            {...props.data}
            type={productSelect?.type}
          />
        )
      case '7':
        return (
          <NganhNgheKinhDoanh
            key={[type, i]}
            current={props.current}
            index={i + 2}
            ref={ref}
            {...props.data}
            type={productSelect?.type}
          />
        )
      case '1':
        return (
          <DiaChiTruSoChinh
            key={[type, i]}
            current={props.current}
            index={i + 2}
            ref={ref}
            {...props.data}
            type={productSelect?.type}
          />
        )
      case '6':
        return (
          <HopDongChuyenNhuong
            key={[type, i]}
            current={props.current}
            index={i + 2}
            ref={ref}
            {...props.data}
            type={productSelect?.type}
          />
        )
      // case '8':
      //   return <DaiDienToChuc key={[type, i]} current={props.current} index={i + 2} ref={ref} {...props.data} />
      // case '9':
      //   return <ThongTinDangKyThue key={[type, i]} current={props.current} index={i + 2} ref={ref} {...props.data} />

      case '10':
        return (
          <CapNhatThongTinDangKy
            key={[type, i]}
            current={props.current}
            index={i + 2}
            ref={ref}
            {...props.data}
            type={productSelect?.type}
          />
        )

      default:
        return null
    }
  }

  const handleUpdateProgressAndComponent = (val, opt) => {
    setSelectType(opt)

    let data = [
      {
        title: 'Bước 1',
        desc: 'Chọn loại hình doanh nghiệp',
        field: ['category'],
      },
      {
        title: `Bước 2`,
        desc: 'Thông tin chung',
        field: ['change_info', 'base_inform'],
      },
    ]
    for (let i = 0; i < opt.length; i++) {
      data.push({ desc: opt[i].children, title: `Bước ${i + 3}`, field: TYPE_NAME[opt[i].type] })
    }

    data.push({
      title: `Bước ${opt.length > 0 ? opt.length + 3 : data.length + 1}`,
      desc: 'Xem lại',
      field: ['change_info', 'preview'],
    })
    onCreateStep(data)
  }

  const handleSelectCate = ({ type, name, value }, pathName) => {
    setProductSelect({ type, name, value })
    onSetFields([pathName], { type, name, value }, ref)
    fetchProduct(value)
  }

  const fetchProduct = async (_id) => {
    try {
      let { parentId } = props.data

      const res = await ProductService.getProduct({ _id: parentId, _pId: _id })
      let { data } = res.data
      const nextData = data.map((item) => {
        let newObject = { ...item, field: TYPE_NAME[item.type] }
        return newObject
      })
      setData(nextData)
    } catch (err) {
      console.log('fetchProduct error', err)
    }
  }

  return (
    <Form ref={ref} layout="vertical" name="change_info" validateMessages={VALIDATE_MESSAGE}>
      <Form.Item
        name={['category']}
        label="Chọn loại hình doanh nghiệp"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select onChange={(val, opt) => handleSelectCate(opt, 'category')} placeholder="Bấm vào đây">
          {props.data?.data?.map((item) => {
            return (
              <Select.Option key={item._id} value={item._id} {...item}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={['products']}
        label="Chọn thông tin thay đổi"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select
          showSearch
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          listHeight={300}
          placeholder="Bấm vào đây"
          optionFilterProp="children"
          onChange={handleUpdateProgressAndComponent}
          filterOption={(input, option) => {
            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
        >
          {productSelect &&
            data?.map((item) => {
              return (
                <Select.Option key={item._id} value={item._id} type={item.type}>
                  {item.name}
                </Select.Option>
              )
            })}
        </Select>
      </Form.Item>

      {selectType?.map((item, i) => checkType(item.type, i, ref))}

      <BaseInformation index={1} ref={ref} type={productSelect?.type} />
    </Form>
  )
})

export default ChangeInforForm
