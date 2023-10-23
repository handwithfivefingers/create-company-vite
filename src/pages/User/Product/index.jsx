import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import CardCategory from '../../../components/CardCategory'
import CategoryService from '../../../service/UserService/CategoriesService'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { useFetch } from '../../../helper/Hook'
import { StepProgressProvider } from '@/context/StepProgressContext'
import { useFormAPI } from '../../../context/FormProviderContext'

const UserProductPage = (props) => {
  const [product, setProduct] = useState([])
  const { data, isLoading, status } = useFetch({
    cacheName: ['userOrder'],
    fn: () => CategoryService.getCategories(),
  })

  const { resetDefault } = useFormAPI()

  useEffect(() => {
    resetDefault()
  }, [])

  useEffect(() => {
    if (data && status === 'success') {
      let prod = (data.length && data?.sort((a, b) => a.type - b.type)) || []
      setProduct(prod)
    }
  }, [isLoading])

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
              loading={isLoading}
              className="animate__animated animate__fadeInUp animate__faster"
              customStyles={{
                ['--animate-duration']: `${(index + 2) / 10}s`,
                ['--animate-delay']: `0.3s`,
              }}
              clickable={item.slug === 'thanh-lap-doanh-nghiep'}
            />
          </Skeleton>
        )
      })}
    </div>
  )
}

export default UserProductPage
