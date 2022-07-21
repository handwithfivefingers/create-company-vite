import { Form } from "antd";
import clsx from "clsx";
import React, { forwardRef } from "react";
import CCInput from "@/components/CCInput";
import styles from "../DaiDienPhapLuat/styles.module.scss";
const TenDoanhNghiep = forwardRef((props, ref) => {
  const base_type = [
    {
      name: "Đăng ký thay đổi trên cơ sở tách doanh nghiệp",
      value: "Đăng ký thay đổi trên cơ sở tách doanh nghiệp",
    },
    {
      name: "Đăng ký thay đổi trên cơ sở sáp nhập doanh nghiệp",
      value: "Đăng ký thay đổi trên cơ sở sáp nhập doanh nghiệp",
    },
  ];

  return (
    <Form.Item
      label={<h4>Đăng ký thay đổi tên doanh nghiệp</h4>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >

      {/* <CCInput label="Tên doanh nghiệp" name={["change_info", "name", "company_name"]} />

      <CCInput label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "name", "mst"]} /> */}

      <CCInput
        type="select"
        label="Doanh nghiệp đăng ký thay đổi tên cơ sở"
        name={["change_info", "name", "base_type"]}
        options={base_type}
      />

      <Form.Item label={"Thay đổi tên công ty thành"}>
        <CCInput label="Tên công ty bằng tiếng Việt" name={["change_info", "name", "name_vi"]} />

        <CCInput label="Tên công ty bằng tiếng nước ngoài" name={["change_info", "name", "name_en"]} />

        <CCInput label="Tên công ty viết tắt" name={["change_info", "name", "name_etc"]} />

        <p>Note: Validating Company name</p>

        <CCInput label="Tên người đại diện pháp luật" name={["change_info", "name", "legal_person"]} />
      </Form.Item>
    </Form.Item>
  );
});

export default TenDoanhNghiep;
