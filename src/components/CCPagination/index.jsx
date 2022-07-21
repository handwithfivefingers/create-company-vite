import React from 'react';
import { Pagination } from 'antd';
import styles from './styles.module.scss';
export default function CCPagination(props) {
  // props : total

  //   current: data.current_page,
  //   pageSize: 10,
  //   total: data.count,
  //   onChange: (page, pageSize) => {
  //     fetchOrders(page);
  //   },
  //   showSizeChanger: false,

  return (
    <Pagination
      className={styles.pagi}
      size="small"
      total={props?.total}
      current={props?.current}
      pageSize={props?.pageSize}
      onChange={props?.onChange}
      showSizeChanger={props?.showSizeChanger}
    />
  );
}
