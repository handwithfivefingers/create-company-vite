import { Skeleton, notification } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardCategory from '../../../components/CardCategory'
import { useFetch } from '../../../helper/Hook'
import CategoryService from '../../../service/UserService/CategoriesService'
import { useOrderAction } from '../../../store/actions/order.actions'
import styles from './styles.module.scss'
import { STATE_METHOD } from '../../../constant/Common'

const UserProductPage = () => {
  const [product, setProduct] = useState([])
  const { data, isLoading, status } = useFetch({
    cacheName: ['userOrder'],
    fn: () => CategoryService.getCategories(),
  })
  const action = useOrderAction()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action.onClear())
  }, [])

  useEffect(() => {
    if (data && status === 'success') {
      let prod = (data.length && data?.sort((a, b) => a.type - b.type)) || []
      setProduct(prod)
    }
  }, [isLoading])
  const navigate = useNavigate()
  const handleNavigate = ({ data, clickable }) => {
    if (clickable) {
      dispatch(action.onClear())
      dispatch(action.onToggleMethod(STATE_METHOD['CREATE']))
      navigate(`/user/san-pham/${data?.slug}`)
    } else {
      notification.warning({ message: 'Sản phẩm sắp ra mắt' })
    }
  }
  return (
    <div className={clsx([styles.cardgrid, 'container'])}>
      {product?.map((item, index) => {
        return (
          <Skeleton
            key={item._id}
            active
            loading={isLoading}
            className="animate__animated animate__fadeInUp animate__faster"
            customStyles={{
              ['--animate-duration']: `${(index + 2) / 10}s`,
              ['--animate-delay']: `0.3s`,
            }}
          >
            <CardCategory
              key={item._id}
              data={item}
              onClick={handleNavigate}
              loading={isLoading}
              className="animate__animated animate__fadeInUp animate__faster"
              customStyles={{
                ['--animate-duration']: `${(index + 2) / 10}s`,
                ['--animate-delay']: `0.3s`,
              }}
              clickable={true}
              // clickable={item.slug === 'thanh-lap-doanh-nghiep' || item.slug === "thay-doi-thong-tin"}
            />
          </Skeleton>
        )
      })}
    </div>
  )
}

export default UserProductPage
