import { Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import CardCategory from '../../../components/CardCategory'
import CategoryService from '../../../service/UserService/CategoriesService'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { useOutletContext } from 'react-router-dom'
import { useFetch } from '../../../helper/Hook'

const UserProductPage = () => {
  const [product, setProduct] = useState([])
  const { data, isLoading, status } = useFetch({
    cacheName: ['userOrder'],
    fn: () => CategoryService.getCategories(),
  })

  useEffect(() => {
    if (data) {
      setProduct(data)
    }
  }, [data])

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
              className="animate__animated animate__fadeInUp animate__faster"
              customStyles={{
                ['--animate-duration']: `${(index + 2) / 10}s`,
                ['--animate-delay']: `0.3s`,
              }}
            />{' '}
          </Skeleton>
        )
      })}
    </div>
  )
}

export default UserProductPage
