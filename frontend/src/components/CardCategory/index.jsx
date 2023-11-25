import React from 'react'
import { Skeleton, Typography, Tag, Button, notification } from 'antd'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { number_format } from '../../helper/Common'
import { Link, useNavigate } from 'react-router-dom'
const CardCategory = ({ data, clickable, className, customStyles }) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    if (clickable) {
      navigate(`/user/san-pham/${data?.slug}`)
    } else {
      notification.warning({ message: 'Sản phẩm đang được hoàn thiện' })
    }
  }
  return (
    <a onClick={handleNavigate}>
      <div className={clsx([styles.card, className, { [styles.blurry]: !clickable }])} style={{ ...customStyles }}>
        <div className={styles.cardIcon}>
          <Skeleton.Avatar size="large" active />
        </div>
        <div className={clsx(styles.contentBody)}>
          <Typography.Title className={styles.bodyTitle} level={3}>
            {data?.name}
          </Typography.Title>
          <div className={styles.bodyContent}>
            <p>
              {data?.desc ||
                `Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s`}
            </p>

            <div className={styles.tags}>
              <Tag color="#87d068">
                <span style={{ color: '#333', fontWeight: 'bold' }}>Giá Tiền: {number_format(data?.price)}</span>
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default CardCategory
