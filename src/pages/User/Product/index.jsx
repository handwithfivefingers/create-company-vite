import { message, Skeleton, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import CardCategory from '../../../components/CardCategory'
import CategoryService from '../../../service/UserService/CategoriesService'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { useOutletContext } from 'react-router-dom'
import { useFetch } from '../../../helper/Hook'

const UserProductPage = () => {
  const [product, setProduct] = useState([])
  const { animateClass } = useOutletContext()

  const { data, isLoading, status, refetch } = useFetch({
    cacheName: ['userOrder'],
    fn: () => CategoryService.getCategories(),
  })

  useEffect(() => {
    if (data) {
      setProduct(data)
    }
  }, [data])

  return (
    <div className={clsx([styles.cardgrid, animateClass, 'container'])}>
      <Skeleton active loading={isLoading}>
        {product?.map((item) => {
          return <CardCategory data={item} key={item._id} />
        })}
      </Skeleton>
    </div>
  )
}

export default UserProductPage
