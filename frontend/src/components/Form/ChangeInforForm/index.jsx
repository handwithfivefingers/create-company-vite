import { VALIDATE_MESSAGE } from '@/constant/InputValidate'
import { onSetFieldsWithInstance } from '@/helper/Common'
import { useQuery } from '@tanstack/react-query'
import { Form, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import React, { forwardRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useStepAPI } from '../../../context/StepProgressContext'
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
  const [form] = Form.useForm()
  const [productSelect, setProductSelect] = useState('')
  const [selectType, setSelectType] = useState([])
  const { onCreateStep } = useStepAPI()
  const watchCategory = Form.useWatch('category', form)

  const productData = useQuery({
    queryKey: ['product_data', props.data.parentId, watchCategory?.value],
    queryFn: async () =>
      (await ProductService.getProduct({ _id: props.data.parentId, _pId: watchCategory?.value })).data.data,
    enabled: !!watchCategory?.value,
    onSuccess: (data) => updateProductSelection(data),
  })

  let location = useLocation()

  useEffect(() => {
    if (location?.state) {
      initDataforEditing()
    }
  }, [location])

  const updateProductSelection = (data) => {
    console.log('coming', data)
    try {
      if (data) {
        const productsList = form.getFieldValue(['products'])
        if (productsList) {
          let listMatch = []
          for (let i = 0; i < data?.length; i++) {
            let item = data[i]
            let isMatch = productsList?.some((prod) => prod.value === item._id)
            if (isMatch) listMatch.push(item)
          }

          listMatch = listMatch.map((item) => ({
            children: item.name,
            key: item._id,
            type: item.type,
            value: item._id,
          }))

          form?.setFields([
            {
              name: 'products',
              value: listMatch,
            },
          ])
          handleUpdateProgressAndComponent(null, listMatch)
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const initDataforEditing = async () => {
    let _data = {}
    let cate = {}

    let { state } = location

    const { category, products, data } = state

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
        const { legal_representative, transfer_contract, base_inform, update_info, ...restInfo } = change_info

        // BASE_INFORM -> Date field : mst_provide
        if (base_inform) {
          base_inform.mst_provide = dayjs(base_inform?.mst_provide)
        }

        const shallowLegalInformation = getLegalInformationProps(legal_representative)

        const shallowTransferContact = getTransferContactProps(transfer_contract)

        const shallowUpdateInfo = getInformationProps(update_info)

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

    const productSelected = _data.products?.map(({ name, _id, type }) => ({ name, value: _id, type }))
    onSetFieldsWithInstance(['products'], productSelected, form)
    onSetFieldsWithInstance(['category'], cate, form)
    setProductSelect(productSelected)
  }

  const getTransferContactProps = (data) => {
    const shallowTransfer = { ...data }

    if (shallowTransfer) {
      const { A_side, B_side } = shallowTransfer

      if (A_side) {
        const { personal, organization } = A_side
        if (personal) {
          const { birth_day, doc_time_provide } = personal
          if (birth_day) personal.birth_day = dayjs(birth_day, 'YYYY-MM-DD')
          if (doc_time_provide) personal.doc_time_provide = dayjs(doc_time_provide, 'YYYY-MM-DD')
        }

        if (organization) {
          const { mst_provide } = organization
          if (mst_provide) organization.mst_provide = dayjs(mst_provide, 'YYYY-MM-DD')
        }

        shallowTransfer.A_side = A_side
      }

      if (B_side) {
        const { personal, organization } = B_side
        if (personal) {
          const { birth_day, doc_time_provide } = personal
          if (birth_day) personal.birth_day = dayjs(birth_day, 'YYYY-MM-DD')
          if (doc_time_provide) personal.doc_time_provide = dayjs(doc_time_provide, 'YYYY-MM-DD')
        }

        if (organization) {
          const { time_provide } = organization
          if (time_provide) organization.time_provide = dayjs(time_provide, 'YYYY-MM-DD')
        }
        shallowTransfer.B_side = B_side
      }
    }
    return shallowTransfer
  }

  const getLegalInformationProps = (data) => {
    const shallowLegal = { ...data }
    if (shallowLegal) {
      const { in_out, after_change } = shallowLegal
      if (in_out?.length) {
        in_out.map((item) => {
          const { birth_day, doc_time_provide } = item
          if (birth_day) item.birth_day = dayjs(birth_day, 'YYYY-MM-DD')
          if (doc_time_provide) item.doc_time_provide = dayjs(doc_time_provide, 'YYYY-MM-DD')
          return item
        })
      }

      if (after_change?.length) {
        after_change.map((item) => {
          const { birth_day, doc_time_provide, doc_outdate } = item
          if (birth_day) item.birth_day = dayjs(birth_day, 'YYYY-MM-DD')
          if (doc_time_provide) item.doc_time_provide = dayjs(doc_time_provide, 'YYYY-MM-DD')
          if (doc_outdate) item.doc_outdate = dayjs(doc_outdate, 'YYYY-MM-DD')
          return item
        })
      }
      shallowLegal.in_out = in_out
      shallowLegal.after_change = after_change
    }
    return shallowLegal
  }

  const getInformationProps = (update_info) => {
    const shallowUpdate = { ...update_info }
    if (shallowUpdate) {
      const { information } = shallowUpdate

      if (information) {
        const { birth_day, doc_time_provide } = information
        if (birth_day) information.birth_day = dayjs(new Date(birth_day))
        if (doc_time_provide) information.doc_time_provide = dayjs(new Date(doc_time_provide))
      }
      shallowUpdate.information = information
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
    const data = [
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
    onSetFieldsWithInstance([pathName], { type, name, value }, form)
  }

  const filterSelect = productData?.data?.filter((item) => {
    if (item.type == 5 && selectType.some((opt) => opt.type == 4)) return
    if (item.type == 4 && selectType.some((opt) => opt.type == 5)) return
    return item
  })

  const selectProps = {
    showSearch: true,
    mode: 'multiple',
    allowClear: true,
    style: { width: '100%' },
    listHeight: 300,
    placeholder: 'Bấm vào đây',
    optionFilterProp: 'children',
    onChange: handleUpdateProgressAndComponent,
    filterOption: (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  }
  return (
    <Form ref={ref} layout="vertical" name="change_info" validateMessages={VALIDATE_MESSAGE} form={form}>
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
        <Select {...selectProps} disabled={!productSelect}>
          {filterSelect?.map((item) => (
            <Select.Option key={item._id} value={item._id} type={item.type}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {selectType?.map((item, i) => checkType(item.type, i, ref))}

      <BaseInformation index={1} ref={ref} type={productSelect?.type} />
    </Form>
  )
})

export default ChangeInforForm
