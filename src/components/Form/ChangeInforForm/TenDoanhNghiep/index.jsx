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
      label={<h3>Đăng ký thay đổi tên doanh nghiệp</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >

      {/* <CCInput label="Tên doanh nghiệp" name={["change_info", "name", "company_name"]} />

      <CCInput label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "name", "mst"]} /> */}

      {/* <CCInput
        type="select"
        label="Doanh nghiệp đăng ký thay đổi tên cơ sở"
        name={["change_info", "name", "base_type"]}
        options={base_type}
        placeholder="Bấm vào đây"
      /> */}

      <Form.Item 
      // label={"Thay đổi tên công ty thành"}
      label={
        <div
          dangerouslySetInnerHTML={{
            __html: '<b>Thay đổi tên công ty thành</b>',
          }}
        />
      }
      >
        <CCInput label="Tên công ty bằng tiếng Việt" name={["change_info", "name", "name_vi"]} />

        <CCInput 
        // label="Tên công ty bằng tiếng nước ngoài" 
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: 'Tên công ty bằng tiếng nước ngoài <i>(chỉ điền nếu có thay đổi)</i>',
            }}
          />
        }
        name={["change_info", "name", "name_en"]} />

        <CCInput 
        // label="Tên công ty viết tắt" 
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: 'Tên công ty viết tắt <i>(chỉ điền nếu có thay đổi)</i>',
            }}
          />
        }
        name={["change_info", "name", "name_etc"]} />

        <p>Note: Validating Company name</p>

        
      </Form.Item>
    </Form.Item>
  );
});

export default TenDoanhNghiep;
