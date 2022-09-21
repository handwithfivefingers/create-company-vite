import { Form } from "antd";
import clsx from "clsx";
import React, { forwardRef } from "react";
import CCInput from "@/components/CCInput";
import styles from "../DaiDienPhapLuat/styles.module.scss";

const DaiDienToChuc = forwardRef((props, ref) => {
  return (
    <Form.Item
      label={<h3>Người đại diện theo ủy quyền của chủ sở hữu là tổ chức</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <CCInput label="Tên doanh nghiệp" name={["change_info", "present_change", "company_name"]} placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"/>

      <CCInput label="Mã số doanh nghiệp hoặc Mã số thuế" name={["change_info", "present_change", "mst"]} placeholder="0316184427"/>
    </Form.Item>
  );
});

export default DaiDienToChuc;
