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

      handleSelectProduct({ type: opt.type, name: opt.name, value: opt._id }, 'selectProduct')
    }
  }

  const checkType = (type, i, ref) => {
    switch (type) {
      case '2':
        return <DaiDienPhapLuat key={[type, i]} current={props.current} index={i + 2} ref={ref} />
      case '3':
        return <TenDoanhNghiep key={[type, i]} current={props.current} index={i + 2} ref={ref} />
      case '4':
        return <GiamVonDieuLe key={[type, i]} current={props.current} index={i + 2} ref={ref} />
      case '5':
        return <TangVonDieuLe key={[type, i]} current={props.current} index={i + 2} ref={ref} />
      case '7':
        return <NganhNgheKinhDoanh key={[type, i]} current={props.current} index={i + 2} ref={ref} />
      case '1':
        return <DiaChiTruSoChinh key={[type, i]} current={props.current} index={i + 2} ref={ref} />
      case '6':
        return <HopDongChuyenNhuong key={[type, i]} current={props.current} index={i + 2} ref={ref} />
      case '8':
        return <DaiDienToChuc key={[type, i]} current={props.current} index={i + 2} ref={ref} />
      case '9':
        return <ThongTinDangKyThue key={[type, i]} current={props.current} index={i + 2} ref={ref} />
      default:
        return null
    }
  }

  const handleOnChange = (val, opt) => {
    console.log(opt)
    setSelectType(opt)
    if (props.onFinishScreen) {
      props.onFinishScreen(opt)
    }
  }

  const handleSelectProduct = ({ type, name, value }, pathName) => {
    setProductSelect(value)
    onSetFields([pathName], { type, name, value }, ref)
    FetchProduct()
  }

  console.log(props.data)

  const FetchProduct = async () => {
    try {
      let { parentId } = props.data

      let res = await ProductService.getProduct({ _id: parentId })
      let { data } = res.data
      setData(data)
      console.log(res)
    } catch (err) {
    } finally {
    }
  }

  return (
    <Form ref={ref} layout="vertical" name="change_info">
      <Form.Item
        name="selectProduct"
        label="Chọn loại hình doanh nghiệp"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select onSelect={(val, opt) => handleSelectProduct(opt, 'selectProduct')} placeholder="Bấm vào đây">
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
        name={['selectChildProduct']}
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
      <div
        className={clsx(styles.current, {
          [styles.active]: props.current === 1,
        })}
      >
        <CCInput
          label="Tên doanh nghiệp"
          name={['change_info', 'base_inform', 'company_name']}
          onChange={(e) => onSetFields(['change_info', 'base_inform', 'company_name'], e.target.value, ref, true)}
          placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        />

        <CCInput
          label="Mã số doanh nghiệp hoặc Mã số thuế"
          name={['change_info', 'base_inform', 'mst']}
          placeholder="0316184427"
        />

        <CCInput
          label={<div dangerouslySetInnerHTML={{ __html: '</>Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i></>' }} />}
          name={['change_info', 'base_inform', 'org_person']}
          placeholder="NGUYỄN VĂN A"
          onChange={(e) => onSetFields(['change_info', 'base_inform', 'org_person'], e.target.value, ref, true)}
        />
      </div>
    </Form>
  )
})

export default ChangeInforForm
