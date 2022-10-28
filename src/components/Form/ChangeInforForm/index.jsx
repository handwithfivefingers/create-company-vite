import { Form, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import DaiDienPhapLuat from './DaiDienPhapLuat'
import styles from './DaiDienPhapLuat/styles.module.scss'
import DaiDienToChuc from './DaiDienToChuc'
import DiaChiTruSoChinh from './DiaChiTruSoChinh'
import GiamVonDieuLe from './GiamVonDieuLe'
import HopDongChuyenNhuong from './HopDongChuyenNhuong'
import NganhNgheKinhDoanh from './NganhNgheKinhDoanh'
import TangVonDieuLe from './TangVonDieuLe'
import TenDoanhNghiep from './TenDoanhNghiep'
import ThongTinDangKyThue from './ThongTinDangKyThue'
import CCInput from '../../CCInput'
import { onSetFields } from '@/helper/Common'
import ProductService from '../../../service/UserService/ProductService'
import BaseInformation from './BaseInformation'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
const ChangeInforForm = forwardRef((props, ref) => {
  const [productSelect, setProductSelect] = useState('')

  const [selectType, setSelectType] = useState([])

  const [data, setData] = useState([])

  let location = useLocation()

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

      handleOnChange(null, listMatch)
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
        let { legal_representative, transfer_contract, base_inform, ...restInfo } = change_info
       
        if (base_inform) {
          let { mst_provide } = base_inform
          if (mst_provide) {
            base_inform = moment(base_inform?.mst_provide, 'YYYY-MM-DD')
          }
        }

        if (legal_representative) {
          let { in_out, after_change, ...restLegal } = legal_representative

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

          legal_representative = {
            ...restLegal,
            in_out,
            after_change,
          }
        }

        if (transfer_contract) {
          let { A_side, B_side } = transfer_contract

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
                time_provide: moment(organization.time_provide, 'YYYY-MM-DD'),
              }
            }

            B_side = {
              ...B_side,
              personal,
              organization,
            }
          }
          transfer_contract = {
            ...transfer_contract,
            A_side,
            B_side,
          }
        }

        change_info = {
          ...restInfo,
          legal_representative,
          transfer_contract,
        }
        _data.change_info = change_info
      }
    }

    ref.current?.setFieldsValue({
      ..._data,
    })

    console.log(_data)

    setProductSelect(cate)

    onSetFields(['category'], cate, ref)

    fetchProduct(cate.value)
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
      default:
        return null
    }
  }

  const handleOnChange = (val, opt) => {
    setSelectType(opt)
    if (props.onFinishScreen) {
      props.onFinishScreen(opt)
    }
  }

  const handleSelectCate = ({ type, name, value }, pathName) => {
    setProductSelect({ type, name, value })

    onSetFields([pathName], { type, name, value }, ref)

    fetchProduct(value)
  }

  const fetchProduct = async (_id) => {
    let res

    try {
      let { parentId } = props.data

      res = await ProductService.getProduct({ _id: parentId, _pId: _id })

      let { data } = res.data

      setData(data)
    } catch (err) {
    } finally {
    }
  }

  return (
    <Form ref={ref} layout="vertical" name="change_info">
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
          onChange={handleOnChange}
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

      <BaseInformation current={props.current} index={1} ref={ref} type={productSelect?.type} />
    </Form>
  )
})

export default ChangeInforForm
