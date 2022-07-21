import React from "react";
import { Skeleton, Typography, Tag } from "antd";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { number_format } from "../../helper/Common";
import { Link } from "react-router-dom";
const CardCategory = (props) => {
  return (
    <Link to={`/user/san-pham/${props?.data?.slug}`}>
      <div className={clsx([styles.card])}>
        <div className={styles.cardIcon}>
          <Skeleton.Avatar size="large" active />
        </div>
        <div className={clsx(styles.contentBody)}>
          <Typography.Title className={styles.bodyTitle} level={3}>
            {props?.data?.name}
          </Typography.Title>
          <div className={styles.bodyContent}>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            <div className={styles.tags}>
              <Tag color="#87d068">
                <span style={{ color: "#333" ,fontWeight:'bold'}}>Giá Tiền: {number_format(props?.data?.price)}</span>
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardCategory;
