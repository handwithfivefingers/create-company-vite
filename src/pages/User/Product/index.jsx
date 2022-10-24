import { Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import CardCategory from '../../../components/CardCategory'
import CategoryService from '../../../service/UserService/CategoriesService'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { useLocation, useOutletContext } from 'react-router-dom'
import { useFetch } from '../../../helper/Hook'
import { m } from 'framer-motion'
const UserProductPage = (props) => {
  const [product, setProduct] = useState([])

  const { data, isLoading, status } = useFetch({
    cacheName: ['userOrder'],
    fn: () => CategoryService.getCategories(),
  })

  useEffect(() => {
    if (data) {
      let prod = data.sort((a, b) => a.type - b.type)
      setProduct(prod)
    }
  }, [data])

  return (
    <m.div className={clsx([styles.cardgrid, 'container'])} initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
            />
          </Skeleton>
        )
      })}
    </m.div>
  )
}

export default UserProductPage
