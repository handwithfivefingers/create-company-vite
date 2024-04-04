import { VALIDATE_MESSAGE } from '@/constant/InputValidate'
import { useQuery } from '@tanstack/react-query'
import { Form, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useStepAPI } from '../../../context/StepProgressContext'
import ProductService from '../../../service/UserService/ProductService'
import { useOrderAction } from '../../../store/actions/order.actions'
import { useCategoryOrder, useChangeInforOrder, useGetOrderMethod, useProductsOrder } from '../../../store/reducer'
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
import { STATE_METHOD } from '../../../constant/Common'

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
  const watchChangeInfoForm = Form.useWatch(['change_info'], form)
  const { onCreateStep } = useStepAPI()
  const method = useGetOrderMethod()
  const dispatch = useDispatch()
  const action = useOrderAction()
  const category = useCategoryOrder()
  const products = useProductsOrder()
  const changeInfoOrder = useChangeInforOrder()
  const watchCategories = Form.useWatch(['category'], form)
  useEffect(() => {
    window.form = form
  }, [])

  useEffect(() => {
    if (method === STATE_METHOD['UPDATE']) {
      const productSelected = products.map((item) => ({ ...item, value: item._id, children: [item.name] }))
      form.setFieldsValue({
        change_info: {
          ...changeInfoOrder,
          base_inform: {
            ...changeInfoOrder.base_inform,
            mst_provide: changeInfoOrder?.base_inform?.mst_provide
              ? dayjs(changeInfoOrder?.base_inform?.mst_provide)
              : undefined,
          },
        },
        products: productSelected,
        category: category._id,
      })
      handleUpdateProgressAndComponent(null, productSelected)
    }
  }, [method])
  useEffect(() => {
    let timeout
    if (watchChangeInfoForm) {
      timeout = setTimeout(() => {
        const values = form.getFieldsValue(true)
        console.log('values', values)
        dispatch(action.onUpdateChangeInfo(values.change_info))
      }, 500)
    }
    return () => clearTimeout(timeout)
  }, [watchChangeInfoForm])

  const productData = useQuery({
    queryKey: ['product_data', props.data.parentId, category?.value],
    queryFn: async () =>
      (await ProductService.getProduct({ _id: props.data.parentId, _pId: watchCategories })).data.data,
    enabled: !!watchCategories,
  })

  const subComponent = useCallback(
    ({ i }) => ({
      2: <DaiDienPhapLuat index={i + 2} type={category?.type} key={'DaiDienPhapLuat'} />,
      3: <TenDoanhNghiep index={i + 2} type={category?.type} key={'TenDoanhNghiep'} />,
      4: <GiamVonDieuLe index={i + 2} type={category?.type} key={'GiamVonDieuLe'} />,
      5: <TangVonDieuLe index={i + 2} type={category?.type} key={'TangVonDieuLe'} />,
      7: <NganhNgheKinhDoanh index={i + 2} type={category?.type} key={'NganhNgheKinhDoanh'} />,
      1: <DiaChiTruSoChinh index={i + 2} type={category?.type} key={'DiaChiTruSoChinh'} />,
      6: <HopDongChuyenNhuong index={i + 2} key={'HopDongChuyenNhuong'} />,
      10: <CapNhatThongTinDangKy index={i + 2} type={category?.type} key={'CapNhatThongTinDangKy'} />,
    }),
    [category],
  )

  const handleUpdateProgressAndComponent = (val, opt) => {
    dispatch(action.onUpdateProducts(opt))
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
    dispatch(
      action.onUpdateCategory({
        type,
        name,
        value,
      }),
    )
  }

  const filterSelect = productData?.data?.filter((item) => {
    if (item.type == 5 && products?.some((opt) => opt.type == 4)) return
    if (item.type == 4 && products?.some((opt) => opt.type == 5)) return
    return item
  })

  const getComponentByProducts = useMemo(() => {
    return products?.map(({ type }, i) => subComponent({ i })[type])
  }, [products])

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
        <Select {...selectProps} disabled={!watchCategories}>
          {filterSelect?.map((item) => (
            <Select.Option key={item._id} value={item._id} type={item.type}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {getComponentByProducts}

      <BaseInformation index={1} ref={ref} />
    </Form>
  )
})

export default ChangeInforForm
