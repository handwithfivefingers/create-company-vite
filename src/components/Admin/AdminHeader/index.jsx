import { BarsOutlined, MoreOutlined } from '@ant-design/icons'
import { PageHeader, Segmented } from 'antd'
import React, { useState } from 'react'
import styles from './styles.module.scss'
const AdminHeader = (props) => {
  const [segment, setSegment] = useState(1)

  const display = {
    display: segment === 2 ? 'block' : 'none',
  }

  const Extra = React.Children.map(props?.extra, (child) => {
    return React.cloneElement(child, { style: display })
  })

  return (
    <div className={styles.header}>
      {segment === 1 && (
        <PageHeader
          title={props?.title}
          style={{
            padding: '16px 0',
          }}
        />
      )}

      {Extra}

      {Extra && (
        <Segmented
          options={[
            {
              value: 1,
              icon: <BarsOutlined />,
            },
            {
              value: 2,
              icon: <MoreOutlined />,
            },
          ]}
          defaultValue={segment}
          onChange={(value) => setSegment(value)}
        />
      )}
    </div>
  )
}

export default AdminHeader
