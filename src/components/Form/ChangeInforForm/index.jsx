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
const ChangeInforForm = forwardRef((props, ref) => {
  const [productSelect, setProductSelect] = useState('')
  const [selectType, setSelectType] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    initForm()
  }, [])

  const initForm = () => {
    if (props.edit) {
      let { data, products } = props.edit
      let [opt] = products
      handleSelectCate({ type: opt.type, name: opt.name, value: opt._id }, 'category')
    }
  }

  const checkType = (type, i, ref) => {
    switch (type) {
      case '2':
        return <DaiDienPhapLuat key={[type, i]} current={props.current} index={i + 2} ref={ref} {...props.data} type={productSelect?.type} />
      case '3':
        return <TenDoanhNghiep key={[type, i]} current={props.current} index={i + 2} ref={ref} {...props.data} type={productSelect?.type} />
      case '4':
        return <GiamVonDieuLe key={[type, i]} current={props.current} index={i + 2} ref={ref} {...props.data} type={productSelect?.type} />
      case '5':
        return <TangVonDieuLe key={[type, i]} current={props.current} index={i + 2} ref={ref} {...props.data} type={productSelect?.type} />
      case '7':
        return <NganhNgheKinhDoanh key={[type, i]} current={props.current} index={i + 2} ref={ref} {...props.data} type={productSelect?.type} />
      case '1':
        return <DiaChiTruSoChinh key={[type, i]} current={props.current} index={i + 2} ref={ref} {...props.data} type={productSelect?.type} />
      case '6':
        return <HopDongChuyenNhuong key={[type, i]} current={props.current} index={i + 2} ref={ref} {...props.data} type={productSelect?.type} />
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
    console.log(value)
    fetchProduct(value)
  }

  const fetchProduct = async (_id) => {
    try {
      let { parentId } = props.data
      // _pId : Product id
      let res = await ProductService.getProduct({ _id: parentId, _pId: _id })
      let { data } = res.data
      setData(data)
      console.log(res)
    } catch (err) {
    } finally {
    }
  }

  return (
    <Form ref={ref} layout="vertical">
      <Form.Item
        name="category"
        label="Chọn loại hình doanh nghiệp"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select onSelect={(val, opt) => handleSelectCate(opt, 'category')} placeholder="Bấm vào đây">
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
