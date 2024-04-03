import { Skeleton, Tag, Typography } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { number_format } from '../../helper/Common'
import styles from './styles.module.scss'
const CardCategory = ({ data, clickable, className, customStyles, onClick }) => {
  return (
    <a onClick={() => onClick({ data, clickable })}>
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
