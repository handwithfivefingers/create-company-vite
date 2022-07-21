import React from "react";
import { Skeleton, Typography, Tag } from "antd";
import styles from "./ProductCard.module.scss";
import clsx from "clsx";
import { number_format } from "@/helper/Common";
import { Link } from "react-router-dom";
// import Link from 'next/link'
const ProductCard = (props) => {
  // console.log(props);
  return (
    <Link href={`/san-pham/${props?.data?.slug}`} passHref>
      <div className={clsx([styles.serviceItem])}>
        <div className={styles.serviceIcon}>
          <Skeleton.Avatar size="large" active />
        </div>
        <Typography.Title className={styles.serviceTitle} level={3}>
          {props?.data?.name}
        </Typography.Title>
        <div className={styles.serviceContent}>
          <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          <Tag color="#f50">Giá Tiền: {number_format(props?.data?.price)}</Tag>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
