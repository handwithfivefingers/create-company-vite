import { Form } from "antd";
import clsx from "clsx";
import React from "react";
import CCInput from "@/components/CCInput";
import styles from "../styles.module.scss";

const HuyBoGiaiThe = (props) => {
  return (
    <Form.Item
      label="Hủy bỏ giải thể"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <CCInput name={["dissolution", "cancel", "company_name"]} label="Tên doanh nghiệp (ghi bằng chữ in hoa)" />
      <CCInput name={["dissolution", "cancel", "mst"]} label="Mã số doanh nghiệp/Mã số thuế" />
    </Form.Item>
  );
};

export default HuyBoGiaiThe;
